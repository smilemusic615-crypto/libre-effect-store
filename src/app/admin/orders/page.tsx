'use client';

import { useState } from 'react';
import { MOCK_ORDERS, AdminOrder, OrderStatus, STATUS_LABEL } from '@/data/adminData';
import { yen } from '@/data/products';

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'proc', label: '製作準備中' },
  { value: 'made', label: '製作中'     },
  { value: 'ship', label: '発送済み'   },
  { value: 'done', label: '完了'       },
];

const STATUS_CLASS: Record<OrderStatus, string> = {
  proc: 'proc', made: 'made', ship: 'ship', done: 'done',
};

type FilterStatus = 'all' | OrderStatus;

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');

  function updateStatus(no: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => o.no === no ? { ...o, status } : o));
  }

  const displayed = orders.filter((o) => {
    if (filter !== 'all' && o.status !== filter) return false;
    if (search) {
      const kw = search.toLowerCase();
      return o.no.toLowerCase().includes(kw) || o.customerName.includes(kw) || o.productName.includes(kw);
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
        {/* filter toolbar */}
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
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, fontFamily: 'var(--dot)', color: 'var(--ink-mut)' }}>該当する注文がありません</td></tr>
              ) : displayed.map((o) => (
                <tr key={o.no}>
                  <td>
                    <div style={{ fontFamily: 'var(--dot)', fontSize: 11.5, letterSpacing: '.1em', fontWeight: 700 }}>{o.no}</div>
                    <div className="adm-td-sub">{o.date}</div>
                  </td>
                  <td>
                    <div className="adm-td-name">{o.customerName}</div>
                    <div className="adm-td-sub">{o.email}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{o.productName}</div>
                    <div className="adm-td-sub">{o.material} / {o.size} × {o.qty}点</div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--blk)', fontSize: 16, color: 'var(--red)' }}>{yen(o.amount)}</span>
                  </td>
                  <td>
                    <select
                      className="adm-status-select"
                      value={o.status}
                      onChange={(e) => updateStatus(o.no, e.target.value as OrderStatus)}
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
        </div>
      </div>
    </>
  );
}
