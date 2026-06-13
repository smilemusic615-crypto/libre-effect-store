'use client';

import Link from 'next/link';
import { useCartStore, calcTotals } from '@/store/cart';
import { yen } from '@/data/products';
import { useEffect, useState } from 'react';

const BANK_INFO = [
  { k: '金融機関', v: '福岡銀行' },
  { k: '支店名',   v: '天神支店（000）' },
  { k: '口座種別', v: '普通' },
  { k: '口座番号', v: '0000000' },
  { k: '口座名義', v: '（カ）リブレエフェクト' },
];

export default function DonePage() {
  const { items, clearCart } = useCartStore();
  const { total, shipping } = calcTotals(items);
  const [orderNo, setOrderNo] = useState('');

  useEffect(() => {
    const ts = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const rand = Math.floor(Math.random() * 90 + 10);
    setOrderNo(`LE-${ts}${rand}`);
    clearCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summaryItems = items.length > 0
    ? items.map((i) => ({ name: `${i.productName} x${i.qty}`, amount: i.price * i.qty }))
    : [
        { name: 'クリアアクリル ウェルカムボード x1', amount: 12800 },
        { name: 'ダイカットステッカー x30',            amount: 54000 },
        { name: 'ロゴ カッティングシート x1',          amount:  4500 },
      ];
  const displayTotal    = items.length > 0 ? total    : 71300;
  const displayShipping = items.length > 0 ? shipping : 0;

  return (
    <main className="wrap page">
      <div className="done-wrap">
        <div className="done-stamp">&#10003;</div>
        <h1 className="done-h">THANK <span className="red">YOU!</span></h1>
        <p className="done-sub">
          ご注文ありがとうございます。確認メールをお送りしました。<br />
          受注製作品は、仕上がりイメージの確認後に製作を開始します。
        </p>

        <div className="done-order">
          <span className="lbl">ORDER NO.</span>
          <span className="no">{orderNo || '...'}</span>
        </div>

        {/* order summary */}
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
              <span className="v" style={{ color: 'var(--green)' }}>
                {displayShipping === 0 ? '無料' : yen(displayShipping)}
              </span>
            </div>
            <div className="done-line">
              <span className="k" style={{ fontFamily: 'var(--en)', fontWeight: 700, letterSpacing: '.12em', color: 'var(--ink)' }}>
                TOTAL（税込）
              </span>
              <span className="v" style={{ fontFamily: 'var(--blk)', fontSize: 20, color: 'var(--red)' }}>
                {yen(displayTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* bank transfer */}
        <div className="done-card" style={{ marginTop: 22, textAlign: 'left' }}>
          <div className="done-card-h" style={{ background: 'var(--blue)', color: '#fff' }}>
            BANK TRANSFER / 振込先のご案内
          </div>
          <div className="done-card-body">
            <p style={{ fontFamily: 'var(--dot)', fontSize: 11, color: 'var(--ink-mut)', marginBottom: 16, lineHeight: 1.8 }}>
              注文確定後、振込先情報を記載したメールをお送りします。<br />
              <strong style={{ color: 'var(--red)', fontFamily: 'var(--en)', letterSpacing: '.06em' }}>
                7日以内
              </strong>
              にお振込みをお願いします。入金確認後に製作を開始します。
            </p>
            {BANK_INFO.map((row) => (
              <div key={row.k} className="done-line">
                <span className="k">{row.k}</span>
                <span className="v" style={{ fontFamily: 'var(--en)', fontWeight: 700 }}>{row.v}</span>
              </div>
            ))}
            <div className="done-line">
              <span className="k">振込金額</span>
              <span className="v" style={{ fontFamily: 'var(--blk)', fontSize: 18, color: 'var(--red)' }}>
                {yen(displayTotal)}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--dot)', fontSize: 10.5, color: 'var(--ink-mut)', marginTop: 16, lineHeight: 1.8 }}>
              ※ 振込手数料はお客様のご負担となります。<br />
              ※ 振込人名義は注文者氏名でお振込みください。<br />
              ※ ご不明な点はお問い合わせフォームよりご連絡ください。
            </p>
          </div>
        </div>

        {/* flow steps */}
        <div className="done-steps">
          {[
            { n: 'STEP 01', e: 'BANK TRANSFER', j: '7日以内にご入金をお願いします。入金確認後に製作を開始します。' },
            { n: 'STEP 02', e: 'PROOF',          j: '仕上がりイメージをメールでご確認いただきます。'               },
            { n: 'STEP 03', e: 'MAKE & SHIP',    j: '福岡の自社工房で製作し、順次発送します。'                      },
          ].map((s) => (
            <div key={s.n} className="done-step">
              <div className="ds-n">{s.n}</div>
              <div className="ds-e">{s.e}</div>
              <div className="ds-j">{s.j}</div>
            </div>
          ))}
        </div>

        <div className="done-cta">
          <Link className="btn-ink" href="/account">注文状況をみる &rarr;</Link>
          <Link className="btn-ink ghost" href="/catalog">買い物を続ける</Link>
        </div>
      </div>
    </main>
  );
}
