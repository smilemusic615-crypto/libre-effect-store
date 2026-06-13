'use client';

import { useState } from 'react';
import Link from 'next/link';

type InqType = 'quote' | 'data' | 'other';

const INQ_OPTIONS: { value: InqType; ico: string; en: string; ja: string }[] = [
  { value: 'quote', ico: '✎', en: 'QUOTE', ja: 'お見積り・価格の相談' },
  { value: 'data',  ico: '▤', en: 'DATA',  ja: '入稿データの確認'     },
  { value: 'other', ico: '✉', en: 'OTHER', ja: 'その他のご質問'       },
];

export default function ContactPage() {
  const [inqType, setInqType] = useState<InqType>('quote');
  const [sent, setSent] = useState(false);

  return (
    <main className="wrap page">
      <nav className="crumb">
        <Link href="/">HOME</Link>
        <span className="sep">/</span>
        <span className="here">CONTACT</span>
      </nav>

      <div className="page-head">
        <span className="page-idx">CONTACT</span>
        <h1 className="page-h">GET IN <span className="red">TOUCH</span></h1>
        <span className="page-jp">お問い合わせ・お見積り</span>
      </div>

      <div className="contact-layout">
        {/* form */}
        <div>
          <p className="contact-intro">
            看板・ステッカーのご相談、お見積り、データ入稿のご質問など、お気軽にお問い合わせください。デザインからのご依頼も歓迎しています。<b>2営業日以内</b>に担当者よりご返信します。
          </p>

          <div className="form-card">
            <h2 className="form-card-h"><span className="fn">01</span> お問い合わせ種別</h2>
            <p className="form-card-jp">ご用件に近いものをお選びください。</p>
            <div className="inq-types">
              {INQ_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`inq-type${inqType === opt.value ? ' on' : ''}`}
                  onClick={() => setInqType(opt.value)}
                >
                  <input type="radio" name="inq" readOnly checked={inqType === opt.value} />
                  <div className="ico">{opt.ico}</div>
                  <div className="ie">{opt.en}</div>
                  <div className="ij">{opt.ja}</div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-card">
            <h2 className="form-card-h"><span className="fn">02</span> ご連絡先・内容</h2>
            <div className="fgrid">
              <div className="field"><label>お名前 <span className="req">*</span></label><input type="text" placeholder="山田 花子" /></div>
              <div className="field"><label>会社名・店舗名</label><input type="text" placeholder="任意" /></div>
              <div className="field"><label>メールアドレス <span className="req">*</span></label><input type="email" placeholder="hello@example.com" /></div>
              <div className="field"><label>電話番号</label><input type="tel" placeholder="090-0000-0000" /></div>
              <div className="field full">
                <label>ご希望の商品・カテゴリ</label>
                <div className="selectbox">
                  <select>
                    <option>選択してください</option>
                    <option>ウェディングパネル</option>
                    <option>ショップサイン</option>
                    <option>カッティングシート</option>
                    <option>ステッカー</option>
                    <option>未定・相談したい</option>
                  </select>
                </div>
              </div>
              <div className="field full">
                <label>お問い合わせ内容 <span className="req">*</span></label>
                <textarea placeholder="サイズ・数量・設置場所・ご希望の納期など、わかる範囲でご記入ください。" />
              </div>
            </div>
          </div>

          <div className="form-card">
            <h2 className="form-card-h"><span className="fn">03</span> データ添付（任意）</h2>
            <p className="form-card-jp">ai / pdf / jpg / png に対応。1ファイル20MBまで。</p>
            <label className="filedrop">
              <input type="file" hidden />
              <div className="fd-ico">⤓</div>
              <div className="fd-main">ファイルをドラッグ＆ドロップ</div>
              <div className="fd-sub">またはクリックして選択</div>
            </label>
            <label className="fopt" style={{ width: 'auto', fontSize: 12, marginTop: 18 }}>
              <input type="checkbox" />
              <span>プライバシーポリシーに同意します</span>
            </label>
            <div style={{ marginTop: 18 }}>
              <button
                className="btn-buy"
                style={{
                  flex: '0 0 auto',
                  minWidth: 240,
                  height: 56,
                  background: sent ? 'var(--green)' : undefined,
                }}
                onClick={async () => { await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: inqType }) }); setSent(true); }}
              >
                {sent ? '送信しました ✓' : '送信する →'}
              </button>
            </div>
          </div>
        </div>

        {/* side info */}
        <aside>
          <div className="info-card">
            <div className="info-card-h">STUDIO / 工房</div>
            <div className="info-card-body">
              <div className="info-line">
                <span className="il-k">住所</span>
                <span className="il-v">〒810-0001<br />福岡県福岡市中央区天神 0-0-0<br />リブレビル 1F</span>
              </div>
              <div className="info-line"><span className="il-k">TEL</span><span className="il-v">092-000-0000</span></div>
              <div className="info-line"><span className="il-k">MAIL</span><span className="il-v">hello@libre-effect.jp</span></div>
              <div className="hours-now"><span className="dot" />ただいま営業中（〜18:00）</div>
            </div>
            <div className="info-map">
              <span className="pin">📍</span>
              <span className="maplabel">FUKUOKA / TENJIN</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-h">HOURS / 営業時間</div>
            <div className="info-card-body">
              <div className="info-line"><span className="il-k">平日</span><span className="il-v">10:00 – 18:00</span></div>
              <div className="info-line"><span className="il-k">土曜</span><span className="il-v">11:00 – 17:00（要予約）</span></div>
              <div className="info-line"><span className="il-k">定休</span><span className="il-v">日曜・祝日</span></div>
            </div>
          </div>

          <div className="info-card dark">
            <div className="info-card-h">FAQ</div>
            <div className="info-card-body">
              <p style={{ fontSize: 13, color: 'oklch(0.75 0.015 90)', lineHeight: 1.8 }}>
                よくある質問はFAQページでご確認いただけます。
              </p>
              <div style={{ marginTop: 16 }}>
                <Link
                  className="btn-ink ghost"
                  href="/faq"
                  style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'oklch(0.4 0.015 60)', fontSize: 12 }}
                >
                  FAQ を見る →
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
