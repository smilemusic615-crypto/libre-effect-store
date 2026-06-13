'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_ORDERS, STATUS_LABEL } from '@/data/adminData';
import { yen } from '@/data/products';

type Section = 'dashboard' | 'orders' | 'addresses';

const MOCK_USER = { name: '山田 花子', email: 'hanako@example.com' };

const MOCK_ADDRESSES = [
  {
    id: 'addr-1',
    primary: true,
    tag: 'HOME',
    name: '山田 花子',
    zip: '810-0001',
    addr: '福岡県福岡市中央区天神1-1-1',
    bldg: 'サンプルマンション 202',
    tel: '090-1234-5678',
  },
  {
    id: 'addr-2',
    primary: false,
    tag: 'OFFICE',
    name: '山田 花子',
    zip: '810-0042',
    addr: '福岡県福岡市中央区赤坂2-3-10',
    bldg: '赤坂ビル 5F',
    tel: '092-000-0000',
  },
];

// 自分の注文（デモ用に管理データから流用）
const MY_ORDERS = MOCK_ORDERS.slice(0, 4);

const STATUS_CLASS: Record<string, string> = {
  proc: 'proc',
  made: 'made',
  ship: 'ship',
  done: '',
};

const MENU = [
  { id: 'dashboard' as Section, icon: '◈', label: 'ダッシュボード' },
  { id: 'orders'    as Section, icon: '◻', label: '注文履歴' },
  { id: 'addresses' as Section, icon: '◎', label: 'お届け先' },
];

export default function AccountPage() {
  const [section, setSection] = useState<Section>('dashboard');

  return (
    <main className="wrap page">
      <nav className="crumb">
        <Link href="/">HOME</Link>
        <span className="sep">/</span>
        <span className="here">MY PAGE</span>
      </nav>

      <div className="page-head">
        <span className="page-idx">ACCOUNT</span>
        <h1 className="page-h">MY <span className="red">PAGE</span></h1>
      </div>

      <div className="acct-layout">
        {/* sidebar */}
        <aside className="acct-aside">
          <div className="acct-card">
            <div className="acct-user">
              <div className="acct-avatar">{MOCK_USER.name[0]}</div>
              <div>
                <div className="nm">{MOCK_USER.name}</div>
                <div className="em">{MOCK_USER.email}</div>
              </div>
            </div>
            <nav className="acct-menu">
              {MENU.map((m) => (
                <a
                  key={m.id}
                  className={section === m.id ? 'on' : ''}
                  onClick={(e) => { e.preventDefault(); setSection(m.id); }}
                  href="#"
                >
                  <span className="mi">{m.icon}</span>
                  {m.label}
                </a>
              ))}
            </nav>
            <Link href="/login">
              <button className="acct-logout">LOGOUT</button>
            </Link>
          </div>
        </aside>

        {/* main content */}
        <div>
          {section === 'dashboard' && <Dashboard setSection={setSection} />}
          {section === 'orders'    && <Orders />}
          {section === 'addresses' && <Addresses />}
        </div>
      </div>
    </main>
  );
}

/* ── Dashboard ── */
function Dashboard({ setSection }: { setSection: (s: Section) => void }) {
  const procCount = MY_ORDERS.filter((o) => o.status === 'proc' || o.status === 'made').length;

  return (
    <>
      <div className="acct-stats">
        <div className="acct-stat">
          <div className="sn">{MY_ORDERS.length}</div>
          <div className="sl">TOTAL ORDERS</div>
        </div>
        <div className="acct-stat">
          <div className="sn">{procCount}</div>
          <div className="sl">IN PROGRESS</div>
        </div>
        <div className="acct-stat">
          <div className="sn">{MOCK_ADDRESSES.length}</div>
          <div className="sl">ADDRESSES</div>
        </div>
      </div>

      <div className="acct-block">
        <div className="acct-block-h">
          <span>RECENT ORDERS / 最近の注文</span>
          <a onClick={(e) => { e.preventDefault(); setSection('orders'); }} href="#">すべて見る →</a>
        </div>
        <div className="acct-block-body">
          {MY_ORDERS.slice(0, 3).map((o) => (
            <OrderRow key={o.no} order={o} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Orders ── */
function Orders() {
  return (
    <div className="acct-block">
      <div className="acct-block-h">
        <span>ORDER HISTORY / 注文履歴</span>
      </div>
      <div className="acct-block-body">
        {MY_ORDERS.map((o) => (
          <OrderRow key={o.no} order={o} />
        ))}
      </div>
    </div>
  );
}

/* ── Order row shared ── */
function OrderRow({ order: o }: { order: (typeof MOCK_ORDERS)[0] }) {
  return (
    <div className="order-row">
      <div className="order-thumb"><div className="ph" /></div>
      <div>
        <div style={{ fontFamily: 'var(--dot)', fontSize: 10.5, color: 'var(--ink-mut)', marginBottom: 3 }}>{o.no}</div>
        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{o.productName}</div>
        <div style={{ fontFamily: 'var(--dot)', fontSize: 10.5, color: 'var(--ink-mut)' }}>{o.date}</div>
      </div>
      <span className={`order-status ${STATUS_CLASS[o.status]}`}>
        {STATUS_LABEL[o.status]}
      </span>
      <span className="order-amount">{yen(o.amount)}</span>
    </div>
  );
}

/* ── Addresses ── */
function Addresses() {
  return (
    <div className="acct-block">
      <div className="acct-block-h">
        <span>ADDRESSES / お届け先</span>
      </div>
      <div className="acct-block-body" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <div className="addr-grid">
          {MOCK_ADDRESSES.map((a) => (
            <div key={a.id} className={`addr${a.primary ? ' primary' : ''}`}>
              <div className="atag">{a.tag}{a.primary && ' — DEFAULT'}</div>
              <div className="aname">{a.name}</div>
              <div className="atext">
                〒{a.zip}<br />
                {a.addr}<br />
                {a.bldg && <>{a.bldg}<br /></>}
                {a.tel}
              </div>
              <div className="addr-actions">
                <span>編集</span>
                <span>削除</span>
                {!a.primary && <span>既定に設定</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
