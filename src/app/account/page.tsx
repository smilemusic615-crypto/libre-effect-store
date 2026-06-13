'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS, yen } from '@/data/products';

type MenuItem = 'dashboard' | 'orders' | 'wishlist' | 'address' | 'settings';

const ORDERS = [
  { id: 'w-clear',  no: 'LE-26061309', date: '2026.06.13', status: 'proc' as const, stxt: '製作準備中', amount: 12800 },
  { id: 'k-diecut', no: 'LE-26060218', date: '2026.06.02', status: 'made' as const, stxt: '製作中',     amount: 54000 },
  { id: 's-astand', no: 'LE-26052711', date: '2026.05.27', status: 'ship' as const, stxt: '発送済み',   amount: 28000 },
  { id: 'c-logo',   no: 'LE-26051403', date: '2026.05.14', status: 'ship' as const, stxt: '発送済み',   amount: 4500  },
];

const MENU: { key: MenuItem; ico: string; label: string }[] = [
  { key: 'dashboard', ico: '▣', label: 'ダッシュボード' },
  { key: 'orders',    ico: '▤', label: '注文履歴'       },
  { key: 'wishlist',  ico: '♡', label: 'お気に入り'     },
  { key: 'address',   ico: '⌂', label: 'お届け先'       },
  { key: 'settings',  ico: '⚙', label: 'アカウント設定' },
];

export default function AccountPage() {
  const [active, setActive] = useState<MenuItem>('dashboard');
  const router = useRouter();

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
        <span className="page-jp">山田 花子 さんのアカウント</span>
      </div>

      <div className="acct-layout">
        {/* sidebar */}
        <aside className="acct-aside">
          <div className="acct-card">
            <div className="acct-user">
              <div className="acct-avatar">花</div>
              <div>
                <div className="nm">山田 花子</div>
                <div className="em">hello@example.com</div>
              </div>
            </div>
            <nav className="acct-menu">
              {MENU.map((m) => (
                <a
                  key={m.key}
                  href="#"
                  className={active === m.key ? 'on' : ''}
                  onClick={(e) => { e.preventDefault(); setActive(m.key); }}
                >
                  <span className="mi">{m.ico}</span> {m.label}
                </a>
              ))}
            </nav>
            <button className="acct-logout" onClick={() => router.push('/login')}>LOGOUT</button>
          </div>
        </aside>

        {/* main */}
        <div>
          {/* stats */}
          <div className="acct-stats">
            <div className="acct-stat"><div className="sn">12</div><div className="sl">Total Orders / 注文</div></div>
            <div className="acct-stat"><div className="sn">2</div><div className="sl">In Progress / 製作中</div></div>
            <div className="acct-stat"><div className="sn">5</div><div className="sl">Wishlist / お気に入り</div></div>
          </div>

          {/* recent orders */}
          <div className="acct-block">
            <div className="acct-block-h">
              <span>RECENT ORDERS / 注文履歴</span>
              <a href="#">VIEW ALL →</a>
            </div>
            <div className="acct-block-body">
              {ORDERS.map((o) => {
                const p = PRODUCTS.find((pr) => pr.id === o.id)!;
                return (
                  <div key={o.no} className="order-row">
                    <Link className="order-thumb" href={`/products/${p.id}`}>
                      <span className="ph" />
                    </Link>
                    <div className="order-meta">
                      <div className="on-no">{o.no}</div>
                      <div className="on-name">{p.name}</div>
                      <div className="on-date">{o.date} 注文</div>
                    </div>
                    <span className={`order-status ${o.status}`}>{o.stxt}</span>
                    <span className="order-amount">{yen(o.amount)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* addresses */}
          <div className="acct-block">
            <div className="acct-block-h">
              <span>ADDRESS BOOK / お届け先</span>
              <a href="#">+ 追加</a>
            </div>
            <div className="acct-block-body">
              <div className="addr-grid">
                <div className="addr primary">
                  <div className="atag">★ DEFAULT</div>
                  <div className="aname">山田 花子</div>
                  <div className="atext">〒810-0001<br />福岡県福岡市中央区天神 0-0-0<br />リブレビル 3F / 090-0000-0000</div>
                  <div className="addr-actions">
                    <span>編集</span><span>削除</span>
                  </div>
                </div>
                <div className="addr">
                  <div className="atag">OFFICE</div>
                  <div className="aname">株式会社リブレ 物販部</div>
                  <div className="atext">〒812-0011<br />福岡県福岡市博多区博多駅前 0-0-0<br />博多スクエア 5F / 092-000-0000</div>
                  <div className="addr-actions">
                    <span>編集</span><span>削除</span><span>既定にする</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
