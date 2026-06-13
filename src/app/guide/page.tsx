import Link from 'next/link';

const COLORS = [
  { name: 'Paper',    varName: '--paper',   val: '#F4F1E8', bg: 'var(--paper)'   },
  { name: 'Paper-2',  varName: '--paper-2', val: '#E8E3D5', bg: 'var(--paper-2)' },
  { name: 'Ink',      varName: '--ink',     val: '#2E2A24', bg: 'var(--ink)'     },
  { name: 'Ink-Muted',varName: '--ink-mut', val: '#6E665A', bg: 'var(--ink-mut)' },
  { name: 'Red',      varName: '--red',     val: '#C8341B', bg: 'var(--red)'     },
  { name: 'Blue',     varName: '--blue',    val: '#3A5BC8', bg: 'var(--blue)'    },
  { name: 'Green',    varName: '--green',   val: '#1F9D55', bg: 'var(--green)'   },
  { name: 'Line',     varName: '--line',    val: '#D2CCBD', bg: 'var(--line)'    },
];

const TYPE_SCALE = [
  { spec: 'blk 48px · italic · uppercase',  cls: 't-display', sample: 'DISPLAY'   },
  { spec: 'blk clamp(30–54px) · uppercase', cls: 't-h1',      sample: 'HEADING 1' },
  { spec: 'blk 24px · uppercase',           cls: 't-h2',      sample: 'HEADING 2' },
  { spec: 'en 700 16px · .1em · uppercase', cls: 't-en',      sample: 'LABEL TEXT'},
  { spec: 'jp 500 15px · lh 1.8',           cls: 't-body',    sample: '本文テキスト'  },
  { spec: 'dot 14px · .1em',                cls: 't-dot',     sample: 'CAPTION 01'},
];

export default function GuidePage() {
  return (
    <main>
      {/* sub-nav */}
      <nav className="ds-nav">
        {['COLORS','TYPOGRAPHY','SPACING','BUTTONS','FORMS','BADGES','CARDS'].map((s) => (
          <a key={s} href={`#${s.toLowerCase()}`}>{s}</a>
        ))}
      </nav>

      <div className="wrap page">
        <nav className="crumb">
          <Link href="/">HOME</Link>
          <span className="sep">/</span>
          <span className="here">DESIGN GUIDE</span>
        </nav>

        <div className="page-head">
          <span className="page-idx">DEV</span>
          <h1 className="page-h">DESIGN <span className="red">SYSTEM</span></h1>
          <span className="page-jp">デザイントークン＆コンポーネント</span>
        </div>

        {/* COLORS */}
        <section id="colors" className="ds-sec">
          <div className="ds-sec-head">
            <span className="ds-num">01</span>
            <h2 className="ds-sec-h">COLORS</h2>
            <span className="ds-sec-jp">カラートークン</span>
          </div>
          <div className="ds-block">
            <div className="tokens">
              {COLORS.map((c) => (
                <div key={c.varName} className="token">
                  <div className="chip" style={{ background: c.bg }} />
                  <div className="tk-name">{c.name}</div>
                  <div className="tk-var">{c.varName}</div>
                  <div className="tk-val">{c.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TYPOGRAPHY */}
        <section id="typography" className="ds-sec">
          <div className="ds-sec-head">
            <span className="ds-num">02</span>
            <h2 className="ds-sec-h">TYPOGRAPHY</h2>
            <span className="ds-sec-jp">書体スケール</span>
          </div>
          <div className="ds-block">
            {TYPE_SCALE.map((t) => (
              <div key={t.cls} className="type-row">
                <div className="type-spec">{t.spec}</div>
                <div className={`type-eg ${t.cls}`}>{t.sample}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SPACING & ELEVATION */}
        <section id="spacing" className="ds-sec">
          <div className="ds-sec-head">
            <span className="ds-num">03</span>
            <h2 className="ds-sec-h">SPACING & ELEVATION</h2>
            <span className="ds-sec-jp">余白・境界・影</span>
          </div>
          <div className="ds-block">
            <div className="ds-block-lbl">Spacing Scale</div>
            <div className="ds-row" style={{ alignItems: 'flex-end' }}>
              {[8,14,22,36,60,100].map((n) => (
                <div key={n} style={{ textAlign: 'center' }}>
                  <div style={{ width: 48, height: n, background: 'var(--red)', border: '2px solid var(--ink)' }} />
                  <div style={{ fontFamily: 'var(--dot)', fontSize: 10, color: 'var(--ink-mut)', marginTop: 7 }}>{n}px</div>
                </div>
              ))}
            </div>
          </div>
          <div className="ds-block">
            <div className="ds-block-lbl">Shadows</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { label: '--hard',      shadow: '5px 5px 0 var(--ink)' },
                { label: 'red accent',  shadow: '5px 5px 0 var(--red)' },
                { label: 'blue accent', shadow: '5px 5px 0 var(--blue)' },
                { label: 'hover (8px)', shadow: '8px 8px 0 var(--ink)' },
              ].map((s) => (
                <div key={s.label} style={{ width: 120, height: 80, border: '2px solid var(--ink)', background: '#fff', display: 'grid', placeContent: 'center', boxShadow: s.shadow, fontFamily: 'var(--dot)', fontSize: 10, color: 'var(--ink-mut)', textAlign: 'center' }}>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BUTTONS */}
        <section id="buttons" className="ds-sec">
          <div className="ds-sec-head">
            <span className="ds-num">04</span>
            <h2 className="ds-sec-h">BUTTONS</h2>
            <span className="ds-sec-jp">ボタン</span>
          </div>
          <div className="ds-block">
            <div className="ds-block-lbl">Primary</div>
            <div className="ds-row">
              <a className="btn-ink" href="#">SHOP NOW →</a>
              <a className="btn-ink ghost" href="#">GET A QUOTE</a>
            </div>
          </div>
          <div className="ds-block">
            <div className="ds-block-lbl">Buy / Auth</div>
            <div className="ds-row">
              <button className="btn-buy" style={{ flex: '0 0 auto', minWidth: 200, height: 52 }}>ADD TO CART →</button>
              <button className="btn-auth" style={{ flex: '0 0 auto', minWidth: 160 }}>ログイン →</button>
            </div>
          </div>
          <div className="ds-block">
            <div className="ds-block-lbl">Chips &amp; Pills</div>
            <div className="ds-row">
              <span className="chip on">WEDDING</span>
              <span className="chip">SIGN</span>
              <span className="chip">CUTTING</span>
              <span className="stk red round" style={{ position: 'static' }}>MIN LOT 10</span>
              <span className="stk ink" style={{ position: 'static' }}>MADE TO ORDER</span>
              <span className="stk blue round" style={{ position: 'static' }}>B2B</span>
            </div>
          </div>
        </section>

        {/* FORMS */}
        <section id="forms" className="ds-sec">
          <div className="ds-sec-head">
            <span className="ds-num">05</span>
            <h2 className="ds-sec-h">FORM ELEMENTS</h2>
            <span className="ds-sec-jp">フォーム部品</span>
          </div>
          <div className="ds-block">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', maxWidth: 560 }}>
              <div className="field">
                <label>テキスト入力 <span className="req">*</span></label>
                <input type="text" placeholder="例: 山田 花子" />
              </div>
              <div className="field">
                <label>セレクト</label>
                <div className="selectbox">
                  <select><option>カテゴリを選ぶ</option><option>WEDDING</option><option>SIGN</option></select>
                </div>
              </div>
              <div className="field" style={{ gridColumn: '1/-1' }}>
                <label>テキストエリア</label>
                <textarea placeholder="ご要望・ご質問をご記入ください" />
              </div>
            </div>
            <div className="ds-row" style={{ marginTop: 18 }}>
              <label className="fopt"><input type="checkbox" defaultChecked /> チェックボックス（ON）</label>
              <label className="fopt"><input type="checkbox" /> チェックボックス（OFF）</label>
              <label className="fopt"><input type="radio" name="demo" defaultChecked /> ラジオ（ON）</label>
              <label className="fopt"><input type="radio" name="demo" /> ラジオ（OFF）</label>
            </div>
            <div className="qty" style={{ marginTop: 18, display: 'inline-flex' }}>
              <button>−</button>
              <input type="number" defaultValue={1} />
              <button>+</button>
            </div>
          </div>
        </section>

        {/* BADGES */}
        <section id="badges" className="ds-sec">
          <div className="ds-sec-head">
            <span className="ds-num">06</span>
            <h2 className="ds-sec-h">BADGES & TAGS</h2>
            <span className="ds-sec-jp">バッジ・タグ</span>
          </div>
          <div className="ds-block">
            <div className="ds-row">
              <span className="prod-badge" style={{ position: 'static', transform: 'rotate(-5deg)' }}>BEST</span>
              <span className="prod-badge" style={{ position: 'static', transform: 'rotate(-5deg)' }}>CUSTOM</span>
              <span className="prod-badge" style={{ position: 'static', transform: 'rotate(-5deg)' }}>SMALL LOT</span>
              <span className="order-status proc">製作準備中</span>
              <span className="order-status made">製作中</span>
              <span className="order-status ship">発送済み</span>
              <span className="pd-lead-pill">納期目安 10日</span>
              <span className="ci-tag">クリアアクリル</span>
            </div>
          </div>
        </section>

        {/* CARDS */}
        <section id="cards" className="ds-sec">
          <div className="ds-sec-head">
            <span className="ds-num">07</span>
            <h2 className="ds-sec-h">CARDS</h2>
            <span className="ds-sec-jp">カードコンポーネント</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {/* product card */}
            <div className="prod">
              <div className="prod-img">
                <span className="prod-badge">BEST</span>
                <span className="tagchip">CLEAR WELCOME BOARD</span>
              </div>
              <div className="prod-body">
                <div className="prod-name">クリアアクリル ウェルカムボード</div>
                <div className="prod-cap">
                  <span className="prod-price">¥12,800<small>税込〜</small></span>
                  <span className="prod-lead">LEAD 10D</span>
                </div>
              </div>
            </div>

            {/* category card */}
            <div className="cat">
              <div className="cat-no">01</div>
              <div className="cat-en">WEDDING PANEL</div>
              <div className="cat-ja">ウェディングパネル</div>
              <div className="cat-line" />
              <div className="cat-lead">一日限りの空間に、長く残る一枚を。</div>
              <div className="cat-go">EXPLORE <span className="arr">→</span></div>
            </div>

            {/* memo card */}
            <div className="memo">
              <div className="memo-bar">
                <span className="mdot f" /><span className="mdot" />
                <span className="mtitle">INFO_001</span>
                <span className="mx">×</span>
              </div>
              <div className="memo-body">
                <div className="memo-date">2026.06.10</div>
                <p className="memo-text">蓄光ステッカーの受注を開始しました。</p>
                <div className="memo-actions">
                  <span className="memo-btn yes">CHECK</span>
                  <span className="memo-btn">LATER</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
