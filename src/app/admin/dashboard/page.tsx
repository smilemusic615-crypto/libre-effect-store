'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { yen } from '@/data/products';

type OrderStatus = 'proc' | 'made' | 'ship' | 'done';
interface Order {
  id: string; created_at: string; last_name: string; first_name: string;
  email: string; total: number; status: OrderStatus;
  order_items: { product_name: string; qty: number }[];
}
interface Inquiry {
  id: number; created_at: string; name: string; email: string;
  type: string; body: string; status: string;
}

const STATUS_CLASS: Record<OrderStatus, string> = { proc: 'proc', made: 'made', ship: 'ship', done: 'done' };
const STATUS_LABEL: Record<OrderStatus, string> = { proc: '製作準備中', made: '製作中', ship: '発送済み', done: '完了' };
const INQ_CLASS: Record<string, string> = { unread: 'unread', read: 'read', replied: 'replied' };
const INQ_LABEL: Record<string, string> = { unread: '未読', read: '確認済み', replied: '返信済み' };
const TYPE_LABEL: Record<string, string> = { quote: '見積もり', data: 'データ入稿', other: 'その他' };

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/orders').then((r) => r.json()),
      fetch('/api/admin/inquiries').then((r) => r.json()),
    ]).then(([o, i]) => {
      setOrders(Array.isArray(o) ? o : []);
      setInquiries(Array.isArray(i) ? i : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const totalRevenue  = orders.reduce((s, o) => s + o.total, 0);
  const procOrders    = orders.filter((o) => o.status === 'proc').length;
  const madeOrders    = orders.filter((o) => o.status === 'made').length;
  const unreadInquiry = inquiries.filter((i) => i.status === 'unread').length;

  const STATS = [
    { n: orders.length, l: 'Total Orders',    d: '累計注文数', color: 'var(--red)'   },
    { n: procOrders,    l: 'In Progress',      d: '製作準備中', color: 'var(--ink)'  },
    { n: madeOrders,    l: 'In Production',    d: '製作中',     color: 'var(--blue)' },
    { n: unreadInquiry, l: 'Unread Inquiries', d: '未対応',     color: 'var(--red)'  },
  ];

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: 'center', fontFamily: 'var(--dot)', color: 'var(--ink-mut)' }}>
        読み込み中...
      </div>
    );
  }

  return (
    <div className="adm-body">
      <div className="adm-stats">
        {STATS.map((s) => (
          <div key={s.l} className="adm-stat">
            <div className="adm-stat-n" style={{ color: s.color }}>{s.n}</div>
            <div className="adm-stat-l">{s.l}</div>
            <div className="adm-stat-d">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="adm-stat-rev">
        <span className="lbl">TOTAL REVENUE</span>
        <span className="val">{yen(totalRevenue)}</span>
      </div>

      <div className="adm-dash-grid">
        <div className="adm-block">
          <div className="adm-block-h">
            <span>RECENT ORDERS</span>
            <Link href="/admin/orders" className="adm-block-more">全件表示 →</Link>
          </div>
          <table className="adm-table">
            <thead>
              <tr><th>注文番号</th><th>顧客</th><th>商品</th><th>金額</th><th>状態</th></tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 30, color: 'var(--ink-mut)' }}>注文なし</td></tr>
              ) : orders.slice(0, 5).map((o) => (
                <tr key={o.id}>
                  <td style={{ fontFamily: 'var(--dot)', fontSize: 11 }}>{o.id}</td>
                  <td>{o.last_name} {o.first_name}</td>
                  <td style={{ fontSize: 12 }}>{o.order_items?.[0]?.product_name ?? '—'}</td>
                  <td style={{ color: 'var(--red)', fontFamily: 'var(--blk)' }}>{yen(o.total)}</td>
                  <td><span className={`adm-badge ${STATUS_CLASS[o.status]}`}>{STATUS_LABEL[o.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="adm-block">
          <div className="adm-block-h">
            <span>RECENT INQUIRIES</span>
            <Link href="/admin/inquiries" className="adm-block-more">全件表示 →</Link>
          </div>
          <table className="adm-table">
            <thead>
              <tr><th>種別</th><th>送信者</th><th>内容（冒頭）</th><th>状態</th></tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: 30, color: 'var(--ink-mut)' }}>問い合わせなし</td></tr>
              ) : inquiries.slice(0, 5).map((i) => (
                <tr key={i.id}>
                  <td><span className="ci-tag" style={{ fontSize: 11 }}>{TYPE_LABEL[i.type] ?? i.type}</span></td>
                  <td>{i.name}</td>
                  <td style={{ fontSize: 12, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i.body}</td>
                  <td><span className={`adm-badge ${INQ_CLASS[i.status]}`}>{INQ_LABEL[i.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
