'use client';

import Link from 'next/link';
import { useCartStore, calcTotals } from '@/store/cart';
import { yen } from '@/data/products';
import { useEffect, useState } from 'react';

export default function DonePage() {
  const { items, clearCart } = useCartStore();
  const { total, shipping } = calcTotals(items);
  const [orderNo, setOrderNo] = useState('');

  useEffect(() => {
    const ts = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const rand = Math.floor(Math.random() * 90 + 10);
    setOrderNo(`LE-${ts}${rand}`);
  }, []);

  const summaryItems = items.length > 0
    ? items.map((i) => ({ name: `${i.productName} ×${i.qty}`, amount: i.price * i.qty }))
    : [
        { name: 'クリアアクリル ウェルカムボード ×1', amount: 12800 },
        { name: 'ダイカットステッカー ×30', amount: 54000 },
        { name: 'ロゴ カッティングシート ×1', amount: 4500 },
      ];
  const displayTotal = items.length > 0 ? total : 71300;
  const displayShipping = items.length > 0 ? shipping : 0;

  return (
    <main className="wrap page">
      <div className="done-wrap">
        <div className="done-stamp">✓</div>
        <h1 className="done-h">THANK <span className="red">YOU!</span></h1>
        <p className="done-sub">
          ご注文ありがとうございます。確認メールをお送りしました。<br />
          受注製作品は、仕上がりイメージの確認後に製作を開始します。
        </p>

        <div className="done-order">
          <span className="lbl">ORDER NO.</span>
          <span className="no">{orderNo || '...'}</span>
        </div>

        <div className="done-card">
          <div className="done-card-h">ORDER SUMMARY / ご注文内容</div>
          <div className="done-card-body">
            {summaryItems.map((item, i) => (
              <div key={i} className="done-line">
                <span className="k">{item.name}</span>
                <span className="v">{yen(item.amount)}</span>
              </div>
            ))}
            <div className="done-line">
              <span className="k">送料</span>
              <span className="v" style={{ color: 'var(--green)' }}>{displayShipping === 0 ? '無料' : yen(displayShipping)}</span>
            </div>
            <div className="done-line">
              <span className="k" style={{ fontFamily: 'var(--en)', fontWeight: 700, letterSpacing: '.12em', color: 'var(--ink)' }}>TOTAL（税込）</span>
              <span className="v" style={{ fontFamily: 'var(--blk)', fontSize: 20, color: 'var(--red)' }}>{yen(displayTotal)}</span>
            </div>
          </div>
        </div>

        <div className="done-steps">
          {[
            { n: 'STEP 01', e: 'DATA CHECK', j: '入稿データを確認し、必要に応じてご連絡します。'     },
            { n: 'STEP 02', e: 'PROOF',      j: '仕上がりイメージをメールでご確認いただきます。'     },
            { n: 'STEP 03', e: 'MAKE & SHIP', j: '福岡の自社工房で製作し、順次発送します。'          },
          ].map((s) => (
            <div key={s.n} className="done-step">
              <div className="ds-n">{s.n}</div>
              <div className="ds-e">{s.e}</div>
              <div className="ds-j">{s.j}</div>
            </div>
          ))}
        </div>

        <div className="done-cta">
          <Link className="btn-ink" href="/account">注文状況をみる →</Link>
          <Link className="btn-ink ghost" href="/catalog">買い物を続ける</Link>
        </div>
      </div>
    </main>
  );
}
