'use client';

import Link from 'next/link';
import { MOCK_ORDERS, MOCK_INQUIRIES, STATUS_LABEL } from '@/data/adminData';
import { yen } from '@/data/products';

const totalRevenue = MOCK_ORDERS.reduce((s, o) => s + o.amount, 0);
const procOrders = MOCK_ORDERS.filter((o) => o.status === 'proc').length;
const madeOrders = MOCK_ORDERS.filter((o) => o.status === 'made').length;
const unread = MOCK_INQUIRIES.filter((i) => i.status === 'unread').length;

const STATS = [
  { n: MOCK_ORDERS.length, l: 'Total Orders',    d: '今月',  color: 'var(--red)'   },
  { n: procOrders,         l: 'In Progress',      d: '製作準備中', color: 'var(--ink)'  },
  { n: madeOrders,         l: 'In Production',    d: '製作中',     color: 'var(--blue)' },
  { n: unread,             l: 'Unread Inquiries', d: '未対応',     color: 'var(--red)'  },
];

const STATUS_CLASS: Record<string, string> = {
  proc: 'proc', made: 'made', ship: 'ship', done: 'done',
};
const INQ_CLASS: Record<string, string> = {
  unread: 'unread', read: 'read', replied: 'replied',
};
const INQ_LABEL: Record<string, string> = {
  unread: '未読', read: '確認済み', replied: '返信済み',
};

export default function DashboardPage() {
  return (
    <>
      <div className="adm-topbar">
        <div className="adm-topbar-title">DASH<span className="red">BOARD</span></div>
        <div className="adm-topbar-meta">2026.06.13 — LIBRE EFFECT 管理</div>
      </div>
      <div className="adm-body">
        {/* stats */}
        <div className="adm-stats">
          {STATS.map((s) => (
            <div key={s.l} className="adm-stat">
              <div className="sn" style={{ color: s.color }}>{s.n}</div>
              <div className="sl">{s.l}</div>
              <div className="sd">{s.d}</div>
            </div>
          ))}
        </div>

        {/* revenue */}
        <div className="adm-block" style={{ marginBottom: 22 }}>
          <div className="adm-block-h">
            <span>REVENUE / 売上合計（今月）</span>
          </div>
          <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: 'var(--blk)', fontSize: 40, color: 'var(--red)' }}>{yen(totalRevenue)}</span>
            <span style={{ fontFamily: 'var(--dot)', fontSize: 11, color: 'var(--ink-mut)' }}>税込・送料除く</span>
          </div>
        </div>

        {/* recent orders */}
        <div className="adm-block" style={{ marginBottom: 22 }}>
          <div className="adm-block-h">
            <span>RECENT ORDERS</span>
            <Link href="/admin/orders" style={{ fontFamily: 'var(--dot)', fontSize: 11, color: 'oklch(0.7 0.015 90)', letterSpacing: '.1em' }}>
              VIEW ALL →
            </Link>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>注文番号</th>
                <th>顧客</th>
                <th>商品</th>
                <th>金額</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.slice(0, 5).map((o) => (
                <tr key={o.no}>
                  <td>
                    <div style={{ fontFamily: 'var(--dot)', fontSize: 11, letterSpacing: '.08em' }}>{o.no}</div>
                    <div className="adm-td-sub">{o.date}</div>
                  </td>
                  <td>
                    <div className="adm-td-name">{o.customerName}</div>
                    <div className="adm-td-sub">{o.email}</div>
                  </td>
                  <td>
                    <div>{o.productName}</div>
                    <div className="adm-td-sub">{o.material} / {o.size} × {o.qty}</div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--blk)', fontSize: 15, color: 'var(--red)' }}>{yen(o.amount)}</span>
                  </td>
                  <td>
                    <span className={`adm-status ${STATUS_CLASS[o.status]}`}>
                      {STATUS_LABEL[o.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* recent inquiries */}
        <div className="adm-block">
          <div className="adm-block-h">
            <span>RECENT INQUIRIES</span>
            <Link href="/admin/inquiries" style={{ fontFamily: 'var(--dot)', fontSize: 11, color: 'oklch(0.7 0.015 90)', letterSpacing: '.1em' }}>
              VIEW ALL →
            </Link>
          </div>
          <table className="adm-table">
            <thead>
              <tr><th>日付</th><th>氏名</th><th>種別</th><th>件名</th><th>ステータス</th></tr>
            </thead>
            <tbody>
              {MOCK_INQUIRIES.slice(0, 4).map((inq) => (
                <tr key={inq.id}>
                  <td><span style={{ fontFamily: 'var(--dot)', fontSize: 11 }}>{inq.date}</span></td>
                  <td>
                    <div className="adm-td-name">{inq.name}</div>
                    <div className="adm-td-sub">{inq.company || inq.email}</div>
                  </td>
                  <td><span className="ci-tag">{inq.type === 'quote' ? 'お見積り' : inq.type === 'data' ? 'データ入稿' : 'その他'}</span></td>
                  <td style={{ maxWidth: 280 }}>
                    <div style={{ fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inq.body}</div>
                  </td>
                  <td><span className={`adm-inq-status ${INQ_CLASS[inq.status]}`}>{INQ_LABEL[inq.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
