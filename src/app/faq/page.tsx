'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';

type CatId = 'all' | 'order' | 'data' | 'ship' | 'pay';

interface FaqItem { q: string; a: string; }
interface FaqGroup { id: CatId; idx: string; en: string; jp: string; items: FaqItem[]; }

const GROUPS: FaqGroup[] = [
  { id: 'order', idx: '01', en: 'ORDER', jp: 'ご注文について', items: [
    { q: '1点だけでも注文できますか？', a: 'はい。パネル・看板は1点から、ステッカーは10枚から承っています。小ロットでもお気軽にご相談ください。' },
    { q: 'オリジナルデザインで作ってもらえますか？', a: '可能です。ロゴやイメージをお送りいただければ、レイアウト・素材のご提案からお手伝いします。デザインのみのご依頼も歓迎です。' },
    { q: '注文後にキャンセル・修正はできますか？', a: '受注製作品は、製作開始前（仕上がりイメージのご確認前）であればキャンセル・修正が可能です。製作開始後はお受けできない場合があります。' },
    { q: 'サンプルを確認できますか？', a: '主要素材のサンプルをお送りできます。お問い合わせフォームよりご希望の素材をお知らせください。' },
  ]},
  { id: 'data', idx: '02', en: 'DATA', jp: 'データ入稿について', items: [
    { q: 'どんなデータ形式で入稿できますか？', a: 'Adobe Illustrator（ai）・PDF を推奨しています。jpg / png でもお受けできますが、仕上がりサイズによっては作り直しをお願いする場合があります。' },
    { q: 'データがなくても依頼できますか？', a: 'はい。手書きラフや写真、参考イメージからでもデザインを起こします。文字情報だけのご相談でも大丈夫です。' },
    { q: '入稿データのチェックはしてもらえますか？', a: '全てのご注文で入稿データを無料でチェックします。問題があればご連絡し、必要に応じて修正のご提案をします。' },
  ]},
  { id: 'ship', idx: '03', en: 'SHIPPING', jp: '納期・配送について', items: [
    { q: '納期はどのくらいですか？', a: '商品により異なります。各商品ページに「納期目安」を記載しています（ステッカー約10日、真鍮プレート約21日など）。お急ぎの場合はご相談ください。' },
    { q: '送料はいくらですか？', a: '全国一律¥880、¥11,000以上のご注文で送料無料です。大型の看板・スタンドは別途見積りとなる場合があります。' },
    { q: '設置や施工もお願いできますか？', a: '福岡市内を中心に、設置・施工のご相談も承っています。エリアや内容により対応が異なりますのでお問い合わせください。' },
  ]},
  { id: 'pay', idx: '04', en: 'PAYMENT', jp: 'お支払いについて', items: [
    { q: '支払い方法を教えてください。', a: 'クレジットカード・銀行振込（前払い）・コンビニ後払いに対応しています。受注製作品は内容確定後のご請求となります。' },
    { q: '領収書は発行できますか？', a: 'はい。マイページからダウンロードいただけるほか、ご希望の宛名での発行も可能です。' },
    { q: '請求書払い（掛け払い）はできますか？', a: '法人・店舗のお客様向けに掛け払いをご用意しています。初回はお問い合わせフォームよりご相談ください。' },
  ]},
];

const CAT_LIST = [
  { id: 'all',   ico: '▣', label: 'すべて'    },
  { id: 'order', ico: '🛒', label: 'ご注文'    },
  { id: 'data',  ico: '▤', label: 'データ入稿' },
  { id: 'ship',  ico: '🚚', label: '納期・配送' },
  { id: 'pay',   ico: '¥', label: 'お支払い'   },
] as { id: CatId; ico: string; label: string }[];

function FaqItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <div className="faq-q" onClick={() => setOpen((o) => !o)}>
        <span className="qmark">Q</span>
        <span className="qtext">{item.q}</span>
        <span className="qtoggle">+</span>
      </div>
      <div
        style={{
          maxHeight: open ? (answerRef.current?.scrollHeight ?? 400) + 'px' : '0',
          overflow: 'hidden',
          transition: 'max-height .3s cubic-bezier(.3,1.4,.5,1)',
        }}
      >
        <div ref={answerRef} className="faq-a-inner">{item.a}</div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [activeCat, setActiveCat] = useState<CatId>('all');
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return GROUPS.map((g) => {
      if (activeCat !== 'all' && activeCat !== g.id) return null;
      const items = g.items.filter((it) =>
        !kw || it.q.toLowerCase().includes(kw) || it.a.toLowerCase().includes(kw)
      );
      if (!items.length) return null;
      return { ...g, items };
    }).filter(Boolean) as FaqGroup[];
  }, [activeCat, keyword]);

  return (
    <main className="wrap page">
      <nav className="crumb">
        <Link href="/">HOME</Link>
        <span className="sep">/</span>
        <span className="here">FAQ</span>
      </nav>

      <div className="page-head">
        <span className="page-idx">SUPPORT</span>
        <h1 className="page-h">FREQUENTLY <span className="red">ASKED</span></h1>
        <span className="page-jp">よくあるご質問</span>
      </div>

      <div className="faq-layout">
        {/* sidebar */}
        <aside className="faq-side">
          <div className="faq-cats">
            {CAT_LIST.map((c) => (
              <div
                key={c.id}
                className={`faq-cat${activeCat === c.id ? ' on' : ''}`}
                onClick={() => setActiveCat(c.id)}
              >
                <span className="fc-ico">{c.ico}</span> {c.label}
              </div>
            ))}
          </div>
        </aside>

        {/* list */}
        <div>
          <div className="faq-search">
            <span className="si">🔍</span>
            <input
              type="text"
              placeholder="キーワードで検索（例：納期、ai、送料）"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="faq-empty">該当する質問が見つかりませんでした。</div>
          ) : (
            filtered.map((g) => (
              <div key={g.id} className="faq-group">
                <div className="faq-group-h">
                  <span className="fg-idx">{g.idx}</span>
                  <h2>{g.en}</h2>
                  <span className="fg-jp">{g.jp}</span>
                </div>
                {g.items.map((item, i) => (
                  <FaqItem key={i} item={item} />
                ))}
              </div>
            ))
          )}

          <div className="faq-cta">
            <h3>解決しませんでしたか？<span className="red">.</span></h3>
            <p>担当者が直接お答えします。お気軽にお問い合わせください。</p>
            <Link
              className="btn-ink"
              href="/contact"
              style={{ background: '#fff', color: 'var(--ink)', borderColor: '#fff' }}
            >
              お問い合わせ →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
