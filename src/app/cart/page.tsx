'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, calcTotals } from '@/store/cart';
import { yen } from '@/data/products';

const STEPS = [
  { label: 'CART',    state: 'done' },
  { label: 'INFO',    state: 'on'   },
  { label: 'PAYMENT', state: 'off'  },
  { label: 'DONE',    state: 'off'  },
];

const PAY_OPTIONS = [
  { value: 'credit',  en: 'CREDIT CARD',   ja: 'クレジットカード（一括）', note: 'VISA / MASTER / JCB' },
  { value: 'bank',    en: 'BANK TRANSFER', ja: '銀行振込（前払い）',       note: '手数料お客様負担'     },
  { value: 'conv',    en: 'CONVENIENCE',   ja: 'コンビニ後払い',           note: '上限 ¥55,000'        },
];

export default function CartPage() {
  const { items, updateQty, removeItem } = useCartStore();
  const { subtotal, shipping, tax, total, shipProgress } = calcTotals(items);
  const [payMethod, setPayMethod] = useState('credit');
  const router = useRouter();

  return (
    <main className="wrap page">
      <nav className="crumb">
        <Link href="/">HOME</Link>
        <span className="sep">/</span>
        <span className="here">CART &amp; CHECKOUT</span>
      </nav>

      <div className="page-head">
        <span className="page-idx">CHECKOUT</span>
        <h1 className="page-h">YOUR <span className="red">CART</span></h1>
        <span className="page-jp">ご注文内容の確認</span>
      </div>

      {/* steps */}
      <div className="steps">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && <span className="step-bar" />}
            <div className={`step ${s.state}`}>
              <span className="num">{i + 1}</span>
              <span className="stxt">{s.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="cart-layout">
        {/* left */}
        <div>
          <div className="cart-list">
            {items.length === 0 ? (
              <div className="cart-empty">
                カートに商品がありません。<br />
                <Link href="/catalog" style={{ color: 'var(--red)', borderBottom: '2px solid var(--red)', marginTop: 12, display: 'inline-block' }}>商品を選ぶ →</Link>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.productId}-${item.material}-${item.size}`} className="cart-row" style={idx === 0 ? { borderTop: 'none' } : {}}>
                  <div className="cart-thumb"><div className="ph" /></div>
                  <div className="cart-info">
                    <div className="ci-latin">{item.productLatin}</div>
                    <div className="ci-name">{item.productName}</div>
                    <div className="ci-opts">
                      <span className="ci-tag">{item.material}</span>
                      <span className="ci-tag">{item.size}</span>
                    </div>
                  </div>
                  <div className="cart-right">
                    <span className="cart-price">{yen(item.price * item.qty)}</span>
                    <div className="cart-qty">
                      <button onClick={() => updateQty(item.productId, item.material, item.size, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.productId, item.material, item.size, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart-remove" onClick={() => removeItem(item.productId, item.material, item.size)}>削除</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* shipping form */}
          <div className="form-card" style={{ marginTop: 30 }}>
            <h2 className="form-card-h"><span className="fn">01</span> SHIPPING / お届け先</h2>
            <p className="form-card-jp">看板・パネルは大型便でのお届けとなる場合があります。</p>
            <div className="fgrid">
              <div className="field"><label>姓 <span className="req">*</span></label><input type="text" placeholder="山田" /></div>
              <div className="field"><label>名 <span className="req">*</span></label><input type="text" placeholder="花子" /></div>
              <div className="field full"><label>郵便番号 <span className="req">*</span></label><input type="text" placeholder="810-0001" /><span className="hint">ハイフンありで入力</span></div>
              <div className="field full"><label>住所 <span className="req">*</span></label><input type="text" placeholder="福岡県福岡市中央区天神 0-0-0" /></div>
              <div className="field full"><label>建物名・部屋番号</label><input type="text" placeholder="リブレビル 3F" /></div>
              <div className="field"><label>電話番号 <span className="req">*</span></label><input type="tel" placeholder="090-0000-0000" /></div>
              <div className="field"><label>メールアドレス <span className="req">*</span></label><input type="email" placeholder="hello@example.com" /></div>
              <div className="field full"><label>備考・データ入稿メモ</label><textarea placeholder="入稿データの希望や設置場所など" /></div>
            </div>
          </div>

          {/* payment */}
          <div className="form-card">
            <h2 className="form-card-h"><span className="fn">02</span> PAYMENT / お支払い</h2>
            <p className="form-card-jp">受注製作品は内容確定後の請求となります。</p>
            <div className="pay-opts">
              {PAY_OPTIONS.map((opt) => (
                <label key={opt.value} className={`pay-opt${payMethod === opt.value ? ' on' : ''}`}>
                  <input
                    type="radio"
                    name="pay"
                    value={opt.value}
                    checked={payMethod === opt.value}
                    onChange={() => setPayMethod(opt.value)}
                  />
                  <div>
                    <div className="pe">{opt.en}</div>
                    <div className="pj">{opt.ja}</div>
                  </div>
                  <span className="pico">{opt.note}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* summary */}
        <aside className="summary">
          <div className="summary-h">
            <span>ORDER SUMMARY</span>
            <span>{items.reduce((n, i) => n + i.qty, 0)} 点</span>
          </div>
          <div className="summary-body">
            {items.map((item) => (
              <div key={`sum-${item.productId}-${item.material}`} className="sum-row">
                <span className="lbl">{item.productName} ×{item.qty}</span>
                <span className="val">{yen(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="sum-div" />
            <div className="sum-row"><span className="lbl">小計</span><span className="val">{yen(subtotal)}</span></div>
            <div className={`sum-row${shipping === 0 ? ' free' : ''}`}>
              <span className="lbl">送料</span>
              <span className="val">{shipping === 0 ? '無料' : yen(shipping)}</span>
            </div>
            <div className="sum-row"><span className="lbl">消費税（内税）</span><span className="val">{yen(tax)}</span></div>

            <div className="ship-bar"><i style={{ width: `${shipProgress}%` }} /></div>
            <p className="ship-note">
              {subtotal >= 11000
                ? '✓ 送料無料！'
                : `あと${yen(11000 - subtotal)}で送料無料`}
            </p>

            <div className="coupon">
              <input type="text" placeholder="クーポンコード" />
              <button>APPLY</button>
            </div>

            <div className="sum-div" />
            <div className="sum-total">
              <span className="lbl">TOTAL</span>
              <span className="val">{yen(total)}<small>税込</small></span>
            </div>

            <button
              className="btn-checkout"
              onClick={() => router.push('/done')}
              disabled={items.length === 0}
            >
              注文を確定する →
            </button>

            <div className="summary-perks">
              <div><span className="pk">✓</span> ¥11,000以上のご注文で送料無料</div>
              <div><span className="pk">✓</span> 入稿データの無料チェック</div>
              <div><span className="pk">✓</span> 製作前に仕上がりイメージを確認</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
