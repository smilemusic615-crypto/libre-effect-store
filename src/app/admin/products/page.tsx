'use client';

import { useState } from 'react';
import { PRODUCTS, CATEGORIES, yen, badgeEn } from '@/data/products';

type ProductRow = {
  id: string;
  cat: string;
  name: string;
  latin: string;
  price: number;
  from: boolean;
  badge: string;
  lead: number;
  available: boolean;
};

const BADGE_OPTIONS = ['', '人気', '受注製作', 'オーダー', '小ロット可'];

export default function ProductsPage() {
  const [rows, setRows] = useState<ProductRow[]>(
    PRODUCTS.map((p) => ({
      id: p.id, cat: p.cat, name: p.name, latin: p.latin,
      price: p.price, from: p.from ?? false, badge: p.badge ?? '',
      lead: p.lead, available: true,
    }))
  );
  const [filterCat, setFilterCat] = useState('all');
  const [search, setSearch] = useState('');

  function toggle(id: string) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, available: !r.available } : r));
  }
  function setBadge(id: string, badge: string) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, badge } : r));
  }

  const displayed = rows.filter((r) => {
    if (filterCat !== 'all' && r.cat !== filterCat) return false;
    if (search && !r.name.includes(search) && !r.latin.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="adm-topbar">
        <div className="adm-topbar-title">PRODUCT <span className="red">MANAGEMENT</span></div>
        <div className="adm-topbar-meta">{PRODUCTS.length} 商品</div>
      </div>
      <div className="adm-body">
        {/* toolbar */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
          <div className="chips">
            {([{ id: 'all', label: 'ALL' }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.latin.split(' ')[0] }))] as { id: string; label: string }[]).map((c) => (
              <span
                key={c.id}
                className={`chip${filterCat === c.id ? ' on' : ''}`}
                onClick={() => setFilterCat(c.id)}
              >
                {c.label}
              </span>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <div className="faq-search" style={{ marginBottom: 0 }}>
              <span className="si" style={{ top: '50%' }}>🔍</span>
              <input
                type="text"
                placeholder="商品名で検索"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: 220, padding: '10px 14px 10px 40px', boxShadow: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="adm-block">
          <div className="adm-block-h">
            <span>PRODUCTS</span>
            <span className="count">{displayed.length} 件</span>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>商品</th>
                <th>カテゴリ</th>
                <th>価格</th>
                <th>納期</th>
                <th>バッジ</th>
                <th>公開</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((r) => (
                <tr key={r.id} style={{ opacity: r.available ? 1 : 0.45 }}>
                  <td>
                    <div className="adm-td-name">{r.name}</div>
                    <div className="adm-td-sub">{r.latin.toUpperCase()}</div>
                  </td>
                  <td>
                    <span className="ci-tag" style={{ textTransform: 'uppercase', letterSpacing: '.08em' }}>
                      {CATEGORIES.find((c) => c.id === r.cat)?.name ?? r.cat}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--blk)', fontSize: 14, color: 'var(--red)' }}>
                      {r.from ? 'FROM ' : ''}{yen(r.price)}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--dot)', fontSize: 11 }}>{r.lead}日</span>
                  </td>
                  <td>
                    <select
                      className="adm-badge-select"
                      value={r.badge}
                      onChange={(e) => setBadge(r.id, e.target.value)}
                    >
                      {BADGE_OPTIONS.map((b) => (
                        <option key={b} value={b}>{b || '—'}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span
                      className={`adm-toggle${r.available ? ' on' : ' off'}`}
                      onClick={() => toggle(r.id)}
                    >
                      {r.available ? '公開中' : '非公開'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
