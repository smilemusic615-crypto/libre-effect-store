import Link from 'next/link';
import { CATEGORIES, PRODUCTS, yen, badgeEn } from '@/data/products';

const HOT_ITEMS = PRODUCTS.filter((p) => p.badge).slice(0, 4);

const NEWS = [
  { id: 'INFO_001', date: '2026.06.10', text: '蓄光ステッカーの受注を開始。暗所で約30分発光する特殊素材です。' },
  { id: 'INFO_002', date: '2026.06.05', text: '夏のサインフェア 6/15 START。対象サインが15%OFFになります。' },
  { id: 'INFO_003', date: '2026.05.20', text: '夏挙式のウェディングパネル、納期に余裕をもってご相談ください。' },
];

export default function HomePage() {
  return (
    <main>
      {/* hero */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="hero-kicker">
              <span className="rdot" />
              SIGN / PAINT / STICKER — FUKUOKA
            </span>
            <h1 className="hero-h">
              <span className="row">STICK IT.</span>
              <span className="row out">SHOW IT.</span>
              <span className="row"><span className="red tilt">SELL IT.</span></span>
            </h1>
            <p className="hero-jp">看板・ステッカーの工房 LIBRE EFFECT。ウェディングボードから店頭サイン、ダイカットステッカーまで——1点から、10枚から、商売が動き出す一枚をつくります。</p>
            <div className="hero-cta-row">
              <Link className="btn-ink" href="/catalog">SHOP NOW →</Link>
              <Link className="btn-ink ghost" href="/contact">GET A QUOTE</Link>
            </div>
          </div>
          <div className="collage">
            <Link className="cgcard" href="/products/w-clear" style={{ width: '50%', height: '62%', top: 0, left: '2%', transform: 'rotate(-3deg)' }}>
              <span className="cg-tape" style={{ top: '-12px', left: '34%', transform: 'rotate(-4deg)' }} />
              <div className="cgimg"><span className="cglabel">WELCOME BOARD</span></div>
              <div className="cgcap"><span className="cgname">クリアアクリル</span><span className="cgprice">¥12,800</span></div>
            </Link>
            <Link className="cgcard" href="/products/k-diecut" style={{ width: '46%', height: '50%', top: '24%', right: 0, transform: 'rotate(2.4deg)', zIndex: 3 }}>
              <span className="cg-tape" style={{ top: '-11px', right: '18%', transform: 'rotate(6deg)' }} />
              <div className="cgimg"><span className="cglabel">DIE-CUT STICKER</span></div>
              <div className="cgcap"><span className="cgname">ダイカット</span><span className="cgprice">¥1,800〜</span></div>
            </Link>
            <Link className="cgcard" href="/products/s-astand" style={{ width: '40%', height: '44%', bottom: 0, left: '16%', transform: 'rotate(-1.6deg)', zIndex: 2 }}>
              <div className="cgimg"><span className="cglabel">A-STAND SIGN</span></div>
              <div className="cgcap"><span className="cgname">A型看板</span><span className="cgprice">¥28,000</span></div>
            </Link>
            <span className="stk red round" style={{ top: '-4%', right: '14%', transform: 'rotate(7deg)' }}>MIN LOT 10</span>
            <span className="stk ink" style={{ top: '58%', left: '-2%', transform: 'rotate(-5deg)', zIndex: 6 }}>MADE TO ORDER</span>
            <span className="stk blue round" style={{ bottom: '-3%', right: '8%', transform: 'rotate(-3deg)' }}>B2B WELCOME</span>
          </div>
        </div>
      </section>

      {/* categories */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-idx">01</span>
            <h2 className="sec-h">CATE<span className="red">GORY</span></h2>
            <span className="sec-jp">つくるものから選ぶ</span>
            <span className="sec-tail"><Link href="/catalog">VIEW ALL →</Link></span>
          </div>
          <div className="cats">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.id} className="cat" href={`/catalog?cat=${cat.id}`}>
                <div className="cat-no">0{i + 1}</div>
                <div className="cat-en">{cat.latin}</div>
                <div className="cat-ja">{cat.name}</div>
                <div className="cat-line" />
                <div className="cat-lead">{cat.lead}</div>
                <div className="cat-go">EXPLORE <span className="arr">→</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* hot items */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-idx">02</span>
            <h2 className="sec-h">HOT <span className="red">ITEMS</span></h2>
            <span className="sec-jp">いま動いている商品</span>
            <span className="sec-tail"><Link href="/catalog">ALL PRODUCTS →</Link></span>
          </div>
          <div className="prods">
            {HOT_ITEMS.map((p) => (
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
        </div>
      </section>

      {/* feature strip */}
      <section className="feat">
        <div className="hexbg" />
        <div className="wrap feat-in">
          <div>
            <h2 className="feat-h">HIGH QUALITY,<br /><span className="red">HIGH SPEED.</span></h2>
            <p className="feat-jp">高品質×ハイスピード。急ぎにも、こだわりにも。素材選びから断ち切りの一辺まで目を配り、必要なときに必要なものを届けます。</p>
          </div>
          <div className="feat-list">
            {[
              { no: '01', en: 'FROM 1 PIECE',    ja: 'パネル・看板は1点から、ステッカーは10枚から' },
              { no: '02', en: 'BRING YOUR DATA', ja: 'ai / pdf 入稿OK。デザインからの依頼も歓迎' },
              { no: '03', en: 'REAL MATERIALS',  ja: 'アクリル・真鍮・木。質感で選べるラインナップ' },
            ].map((item) => (
              <div key={item.no} className="feat-item">
                <span className="fi-no">{item.no}</span>
                <div>
                  <div className="fi-en">{item.en}</div>
                  <div className="fi-ja">{item.ja}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* news */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-idx">03</span>
            <h2 className="sec-h">NEWS</h2>
            <span className="sec-jp">最新情報</span>
          </div>
          <div className="news-grid">
            {NEWS.map((n) => (
              <div key={n.id} className="memo">
                <div className="memo-bar">
                  <span className="mdot f" /><span className="mdot" />
                  <span className="mtitle">{n.id}</span>
                  <span className="mx">×</span>
                </div>
                <div className="memo-body">
                  <div className="memo-date">{n.date}</div>
                  <p className="memo-text">{n.text}</p>
                  <div className="memo-actions">
                    <span className="memo-btn yes">CHECK</span>
                    <span className="memo-btn">LATER</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
