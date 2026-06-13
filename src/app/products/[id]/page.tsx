'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES, yen, badgeEn } from '@/data/products';
import { useCartStore } from '@/store/cart';

const THUMBS = ['FRONT', 'ANGLE', 'DETAIL', 'SCALE'];

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
  const related  = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  const category = CATEGORIES.find((c) => c.id === product.cat);

  const [matIdx,    setMatIdx]    = useState(0);
  const [sizeIdx,   setSizeIdx]   = useState(0);
  const [qty,       setQty]       = useState(1);
  const [thumb,     setThumb]     = useState(0);
  const [added,     setAdded]     = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
    addItem({
      productId:    product.id,
      productName:  product.name,
      productLatin: product.latin,
      price:        product.price,
      material:     product.materials[matIdx]?.name ?? '',
      size:         product.sizes[sizeIdx] ?? '',
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main className="wrap page">
      <nav className="crumb">
        <Link href="/">HOME</Link>
        <span className="sep">/</span>
        <Link href="/catalog">CATALOG</Link>
        <span className="sep">/</span>
        <span className="here">{product.name}</span>
      </nav>

      <div className="pd">
        {/* gallery */}
        <div className="pd-gallery">
          <div className="pd-main">
            {product.badge && <span className="pd-badge">{badgeEn(product.badge)}</span>}
            <div className="ph"><span className="ph-label">{product.latin.toUpperCase()}</span></div>
          </div>
          <div className="pd-thumbs">
            {THUMBS.map((t, i) => (
              <div key={t} className={`pd-thumb${thumb === i ? ' on' : ''}`} onClick={() => setThumb(i)}>
                <span className="mini" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <div className="pd-latin">{product.latin.toUpperCase()}</div>
          <h1 className="pd-title">{product.name}</h1>
          <p className="pd-blurb">{product.blurb}</p>

          <div className="pd-pricebar">
            <span className="pd-price">
              {product.from ? 'FROM ' : ''}{yen(product.price)}<small>税込</small>
            </span>
            <span className="pd-lead-pill">納期目安 {product.lead}日</span>
            {product.from && <span className="pd-lead-pill">小ロット対応</span>}
          </div>

          {/* material */}
          <div className="pd-opt">
            <div className="pd-opt-lbl">
              MATERIAL
              <span className="pick">{product.materials[matIdx]?.name}</span>
            </div>
            <div className="swatches">
              {product.materials.map((m, i) => (
                <div key={m.id} className={`swatch${matIdx === i ? ' on' : ''}`} onClick={() => setMatIdx(i)}>
                  <span className={`chipimg sw-${m.swatch}`} />
                  <span className="sname">{m.name}</span>
                  <span className="snote">{m.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* size */}
          <div className="pd-opt">
            <div className="pd-opt-lbl">
              SIZE
              <span className="pick">{product.sizes[sizeIdx]}</span>
            </div>
            <div className="size-opts">
              {product.sizes.map((s, i) => (
                <span
                  key={s}
                  className={`size-opt${sizeIdx === i ? ' on' : ''}`}
                  onClick={() => setSizeIdx(i)}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* qty + buy */}
          <div className="pd-buy">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <input
                type="number"
                value={qty}
                min={1}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className={`btn-buy${added ? ' added' : ''}`} onClick={handleAdd}>
              {added ? 'ADDED ✓' : 'ADD TO CART →'}
            </button>
          </div>

          <div className="pd-sub-actions">
            <a href="#">♡ WISHLIST</a>
            <a href="#">✎ デザインを相談する</a>
            <a href="#">⤓ 見積りPDF</a>
          </div>

          <div className="pd-trust">
            <div><div className="te">DATA OK</div><div className="tj">ai / pdf 入稿可</div></div>
            <div><div className="te">DESIGN OK</div><div className="tj">デザインから依頼可</div></div>
            <div><div className="te">FUKUOKA MADE</div><div className="tj">自社工房で製作</div></div>
          </div>

          <div className="pd-spec">
            <div className="pd-spec-h">SPECIFICATION / 仕様</div>
            <table>
              <tbody>
                {product.spec.map(([k, v]) => (
                  <tr key={k}>
                    <th>{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="sec" style={{ paddingTop: 'clamp(48px,6vw,80px)' }}>
          <div className="sec-head">
            <span className="sec-idx">REL</span>
            <h2 className="sec-h">YOU MAY <span className="red">ALSO LIKE</span></h2>
            <span className="sec-jp">同じカテゴリの商品</span>
          </div>
          <div className="prods">
            {related.map((p) => (
              <Link key={p.id} className="prod" href={`/products/${p.id}`}>
                <div className="prod-img">
                  {p.badge && <span className="prod-badge">{badgeEn(p.badge)}</span>}
                  <span className="tagchip">{p.latin.toUpperCase()}</span>
                </div>
                <div className="prod-body">
                  <div className="prod-name">{p.name}</div>
                  <div className="prod-cap">
                    <span className="prod-price">{p.from ? 'FROM ' : ''}{yen(p.price)}<small>税込〜</small></span>
                    <span className="prod-lead">LEAD {p.lead}D</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
