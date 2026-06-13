'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES, yen, badgeEn } from '@/data/products';

const PRICE_RANGES = [
  { value: 'all', label: '指定なし' },
  { value: 'lo',  label: '〜¥5,000' },
  { value: 'mid', label: '¥5,000〜¥20,000' },
  { value: 'hi',  label: '¥20,000〜' },
];

const SORT_OPTIONS = [
  { value: 'rec',  label: 'おすすめ順' },
  { value: 'low',  label: '価格が安い順' },
  { value: 'high', label: '価格が高い順' },
];

function filterPrice(price: number, range: string) {
  if (range === 'lo')  return price < 5000;
  if (range === 'mid') return price >= 5000 && price <= 20000;
  if (range === 'hi')  return price > 20000;
  return true;
}

interface Props {
  searchParams: Promise<{ cat?: string }>;
}

export default function CatalogPage({ searchParams }: Props) {
  const sp = use(searchParams);
  const initCat = sp.cat || 'all';

  const [activeCat, setActiveCat]   = useState(initCat);
  const [priceRange, setPriceRange] = useState('all');
  const [onlyBadge, setOnlyBadge]   = useState(false);
  const [onlyFrom, setOnlyFrom]     = useState(false);
  const [sort, setSort]             = useState('rec');

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      if (activeCat !== 'all' && p.cat !== activeCat) return false;
      if (!filterPrice(p.price, priceRange)) return false;
      if (onlyBadge && !p.badge) return false;
      if (onlyFrom && !p.from) return false;
      return true;
    });
    if (sort === 'low')  result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [activeCat, priceRange, onlyBadge, onlyFrom, sort]);

  const countByCat = (cat: string) =>
    PRODUCTS.filter((p) => cat === 'all' ? true : p.cat === cat).length;

  const catLabel = activeCat === 'all'
    ? 'つくるもの、ぜんぶ。'
    : CATEGORIES.find((c) => c.id === activeCat)?.lead ?? '';

  function reset() {
    setActiveCat('all');
    setPriceRange('all');
    setOnlyBadge(false);
    setOnlyFrom(false);
    setSort('rec');
  }

  return (
    <main className="wrap page">
      <nav className="crumb">
        <Link href="/">HOME</Link>
        <span className="sep">/</span>
        <span className="here">CATALOG</span>
      </nav>

      <div className="page-head">
        <span className="page-idx">CATALOG</span>
        <h1 className="page-h">ALL <span className="red">PRODUCTS</span></h1>
        <span className="page-jp">{catLabel}</span>
        <span className="page-count"><b>{filtered.length}</b> ITEMS</span>
      </div>

      <div className="cat-layout">
        {/* filter rail */}
        <aside className="filter">
          <div className="filter-group">
            <div className="filter-lbl">Category</div>
            {[{ value: 'all', label: 'すべて' }, ...CATEGORIES.map((c) => ({ value: c.id, label: c.name }))].map((opt) => (
              <label key={opt.value} className="fopt">
                <input
                  type="radio"
                  name="cat"
                  value={opt.value}
                  checked={activeCat === opt.value}
                  onChange={() => setActiveCat(opt.value)}
                />
                {opt.label}
                <span className="ct">{countByCat(opt.value)}</span>
              </label>
            ))}
          </div>
          <div className="filter-group">
            <div className="filter-lbl">Price</div>
            {PRICE_RANGES.map((opt) => (
              <label key={opt.value} className="fopt">
                <input
                  type="radio"
                  name="price"
                  value={opt.value}
                  checked={priceRange === opt.value}
                  onChange={() => setPriceRange(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <div className="filter-lbl">Tag</div>
            <label className="fopt">
              <input type="checkbox" checked={onlyBadge} onChange={(e) => setOnlyBadge(e.target.checked)} />
              注目商品のみ
            </label>
            <label className="fopt">
              <input type="checkbox" checked={onlyFrom} onChange={(e) => setOnlyFrom(e.target.checked)} />
              小ロット・FROM価格
            </label>
          </div>
          <button className="filter-reset" onClick={reset}>RESET FILTERS</button>
        </aside>

        {/* grid column */}
        <div>
          <div className="toolbar">
            <div className="chips">
              {[{ value: 'all', label: 'ALL' }, ...CATEGORIES.map((c) => ({ value: c.id, label: c.latin.split(' ')[0] }))].map((chip) => (
                <span
                  key={chip.value}
                  className={`chip${activeCat === chip.value ? ' on' : ''}`}
                  onClick={() => setActiveCat(chip.value)}
                >
                  {chip.label}
                </span>
              ))}
            </div>
            <div className="sort">
              <label htmlFor="sort-sel">SORT</label>
              <div className="selectbox">
                <select id="sort-sel" value={sort} onChange={(e) => setSort(e.target.value)}>
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '48px 0', textAlign: 'center', fontFamily: 'var(--dot)', color: 'var(--ink-mut)' }}>
              該当する商品が見つかりませんでした。
            </div>
          ) : (
            <div className="catalog-grid">
              {filtered.map((p) => (
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
          )}
        </div>
      </div>
    </main>
  );
}
