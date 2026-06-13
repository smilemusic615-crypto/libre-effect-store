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

interface FormValues {
  lastName: string; firstName: string; zip: string; address: string;
  building: string; tel: string; email: string; note: string;
}
const EMPTY_FORM: FormValues = {
  lastName: '', firstName: '', zip: '', address: '',
  building: '', tel: '', email: '', note: '',
};
function validate(v: FormValues): Partial<Record<keyof FormValues, string>> {
  const e: Partial<Record<keyof FormValues, string>> = {};
  if (!v.lastName.trim())  e.lastName  = '姓を入力してください';
  if (!v.firstName.trim()) e.firstName = '名を入力してください';
  if (!v.zip.trim())       e.zip       = '郵便番号を入力してください';
  if (!v.address.trim())   e.address   = '住所を入力してください';
  if (!v.tel.trim())       e.tel       = '電話番号を入力してください';
  if (!v.email.trim())     e.email     = 'メールアドレスを入力してください';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'メールアドレスの形式が正しくありません';
  return e;
}

export default function CartPage() {
  const { items, updateQty, removeItem } = useCartStore();
  const { subtotal, shipping, tax, total, shipProgress } = calcTotals(items);
  const [form, setForm]     = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const router = useRouter();

  function setField(k: keyof FormValues) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [k]: e.target.value }));
      setErrors((prev) => ({ ...prev, [k]: undefined }));
    };
  }

  async function handleSubmit() {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form, items, subtotal, shipping, tax, total }),
    });
    router.push('/done');
  }

  const errStyle = { color: 'var(--red)' } as const;

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
        <div>
          <div className="cart-list">
            {items.length === 0 ? (
              <div className="cart-empty">
                カートに商品がありません。<br />
                <Link href="/catalog" style={{ color: 'var(--red)', borderBottom: '2px solid var(--red)', marginTop: 12, display: 'inline-block' }}>
                  商品を選ぶ &rarr;
                </Link>
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
                      <button onClick={() => updateQty(item.productId, item.material, item.size, item.qty - 1)}>&minus;</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.productId, item.material, item.size, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart-remove" onClick={() => removeItem(item.productId, item.material, item.size)}>削除</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="form-card" style={{ marginTop: 30 }}>
            <h2 className="form-card-h"><span className="fn">01</span> SHIPPING / お届け先</h2>
            <p className="form-card-jp">看板・パネルは大型便でのお届けとなる場合があります。</p>
            <div className="fgrid">
              <div className="field" id="field-lastName">
                <label>姓 <span className="req">*</span></label>
                <input type="text" placeholder="山田" value={form.lastName} onChange={setField('lastName')} />
                {errors.lastName && <span className="hint" style={errStyle}>{errors.lastName}</span>}
              </div>
              <div className="field" id="field-firstName">
                <label>名 <span className="req">*</span></label>
                <input type="text" placeholder="花子" value={form.firstName} onChange={setField('firstName')} />
                {errors.firstName && <span className="hint" style={errStyle}>{errors.firstName}</span>}
              </div>
              <div className="field full" id="field-zip">
                <label>郵便番号 <span className="req">*</span></label>
                <input type="text" placeholder="810-0001" value={form.zip} onChange={setField('zip')} />
                <span className="hint">ハイフンありで入力</span>
                {errors.zip && <span className="hint" style={errStyle}>{errors.zip}</span>}
              </div>
              <div className="field full" id="field-address">
                <label>住所 <span className="req">*</span></label>
                <input type="text" placeholder="福岡県福岡市中央区天神 0-0-0" value={form.address} onChange={setField('address')} />
                {errors.address && <span className="hint" style={errStyle}>{errors.address}</span>}
              </div>
              <div className="field full">
                <label>建物名・部屋番号</label>
                <input type="text" placeholder="リブレビル 3F" value={form.building} onChange={setField('building')} />
              </div>
              <div className="field" id="field-tel">
                <label>電話番号 <span className="req">*</span></label>
                <input type="tel" placeholder="090-0000-0000" value={form.tel} onChange={setField('tel')} />
                {errors.tel && <span className="hint" style={errStyle}>{errors.tel}</span>}
              </div>
              <div className="field" id="field-email">
                <label>メールアドレス <span className="req">*</span></label>
                <input type="email" placeholder="hello@example.com" value={form.email} onChange={setField('email')} />
                {errors.email && <span className="hint" style={errStyle}>{errors.email}</span>}
              </div>
              <div className="field full">
                <label>備考・データ入稿メモ</label>
                <textarea placeholder="入稿データの希望や設置場所など" value={form.note} onChange={setField('note')} />
              </div>
            </div>
          </div>

          <div className="form-card">
            <h2 className="form-card-h"><span className="fn">02</span> PAYMENT / お支払い</h2>
            <p className="form-card-jp">注文確定後、振込先情報をメールにてお送りします。お振込み確認後に製作を開始します。</p>
            <div className="pay-opts">
              <div className="pay-opt on" style={{ pointerEvents: 'none' as const }}>
                <input type="radio" name="pay" value="bank" defaultChecked readOnly />
                <div>
                  <div className="pe">BANK TRANSFER</div>
                  <div className="pj">銀行振込（前払い）</div>
                </div>
                <span className="pico">振込手数料お客様負担</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="summary">
          <div className="summary-h">
            <span>ORDER SUMMARY</span>
            <span>{items.reduce((n, i) => n + i.qty, 0)} 点</span>
          </div>
          <div className="summary-body">
            {items.map((item) => (
              <div key={`sum-${item.productId}-${item.material}`} className="sum-row">
                <span className="lbl">{item.productName} &times;{item.qty}</span>
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
              {subtotal >= 11000 ? '✓ 送料無料！' : `あと${yen(11000 - subtotal)}で送料無料`}
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
            <button className="btn-checkout" onClick={handleSubmit} disabled={items.length === 0}>
              注文を確定する &rarr;
            </button>
            <div className="summary-perks">
              <div><span className="pk">&#10003;</span> &yen;11,000以上のご注文で送料無料</div>
              <div><span className="pk">&#10003;</span> 入稿データの無料チェック</div>
              <div><span className="pk">&#10003;</span> 製作前に仕上がりイメージを確認</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
