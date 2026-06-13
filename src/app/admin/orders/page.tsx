'use client';

import { useState, useEffect } from 'react';
import { yen } from '@/data/products';

type OrderStatus = 'proc' | 'made' | 'ship' | 'done';
type FilterStatus = 'all' | OrderStatus;

interface OrderItem {
  product_name: string; material: string; size: string; qty: number; unit_price: number;
}
interface Order {
  id: string; created_at: string; last_name: string; first_name: string;
  email: string; tel: string; total: number; status: OrderStatus;
  order_items: OrderItem[];
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'proc', label: '製作準備中' },
  { value: 'made', label: '製作中'     },
  { value: 'ship', label: '発送済み'   },
  { value: 'done', label: '完了'       },
];

const STATUS_LABEL: Record<OrderStatus, string> = {
  proc: '製作準備中', made: '製作中', ship: '発送済み', done: '完了',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((data) => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  }

  const displayed = orders.filter((o) => {
    if (filter !== 'all' && o.status !== filter) return false;
    if (search) {
      const kw = search.toLowerCase();
      const name = `${o.last_name}${o.first_name}`;
      const itemNames = o.order_items?.map((i) => i.product_name).join(' ') ?? '';
      return o.id.toLowerCase().includes(kw) || name.includes(kw) || itemNames.toLowerCase().includes(kw);
    }
    return true;
  });

  const counts: Record<FilterStatus, number> = {
    all:  orders.length,
    proc: orders.filter((o) => o.status === 'proc').length,
    made: orders.filter((o) => o.status === 'made').length,
    ship: orders.filter((o) => o.status === 'ship').length,
    done: orders.filter((o) => o.status === 'done').length,
  };

  return (
    <>
      <div className="adm-topbar">
        <div className="adm-topbar-title">ORDER <span className="red">MANAGEMENT</span></div>
        <div className="adm-topbar-meta">{displayed.length} 件表示</div>
      </div>
      <div className="adm-body">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
          <div className="chips">
            {([
              { value: 'all',  label: 'すべて' },
              { value: 'proc', label: '製作準備中' },
              { value: 'made', label: '製作中'     },
              { value: 'ship', label: '発送済み'   },
              { value: 'done', label: '完了'       },
            ] as { value: FilterStatus; label: string }[]).map((f) => (
              <span
                key={f.value}
                className={`chip${filter === f.value ? ' on' : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label} <span style={{ fontFamily: 'var(--dot)', fontSize: 9, opacity: .7 }}>({counts[f.value]})</span>
              </span>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <div className="faq-search" style={{ marginBottom: 0 }}>
              <span className="si" style={{ top: '50%' }}>🔍</span>
              <input
                type="text"
                placeholder="注文番号・顧客名・商品名"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: 260, padding: '10px 14px 10px 40px', boxShadow: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="adm-block">
          <div className="adm-block-h">
            <span>ORDERS</span>
            <span className="count">{displayed.length} 件</span>
          </div>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', fontFamily: 'var(--dot)', color: 'var(--ink-mut)' }}>読み込み中...</div>
          ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>注文番号 / 日付</th>
                <th>顧客</th>
                <th>商品・オプション</th>
                <th>金額</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, fontFamily: 'var(--dot)', color: 'var(--ink-mut)' }}>注文がありません</td></tr>
              ) : displayed.map((o) => (
                <tr key={o.id}>
                  <td>
                    <div style={{ fontFamily: 'var(--dot)', fontSize: 11.5, letterSpacing: '.1em', fontWeight: 700 }}>{o.id}</div>
                    <div className="adm-td-sub">{new Date(o.created_at).toLocaleDateString('ja-JP')}</div>
                  </td>
                  <td>
                    <div className="adm-td-name">{o.last_name} {o.first_name}</div>
                    <div className="adm-td-sub">{o.email}</div>
                  </td>
                  <td>
                    {o.order_items?.map((item, i) => (
                      <div key={i}>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{item.product_name}</div>
                        <div className="adm-td-sub">{item.material} / {item.size} × {item.qty}点</div>
                      </div>
                    ))}
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--blk)', fontSize: 16, color: 'var(--red)' }}>{yen(o.total)}</span>
                  </td>
                  <td>
                    <select
                      className="adm-status-select"
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                      style={{
                        background: o.status === 'made' ? 'var(--green)' : o.status === 'ship' ? 'var(--blue)' : o.status === 'done' ? 'var(--ink)' : 'var(--paper-2)',
                        color: ['made', 'ship', 'done'].includes(o.status) ? '#fff' : 'var(--ink)',
                        backgroundImage: 'none',
                        paddingRight: 14,
                      }}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </>
  );
}
