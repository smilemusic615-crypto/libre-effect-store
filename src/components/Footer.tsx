import Link from 'next/link';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="hexbg" style={{ opacity: 0.6 }} />
      <div className="wrap ft-in">
        <div className="ft-top">
          <div className="brand2">
            <BrandLogo />
          </div>
          <svg className="ymark" width="170" height="112" viewBox="0 0 170 112" aria-label="Sign / Paint / Sticker">
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M85 60 L85 86" />
              <path d="M85 60 L56 34" />
              <path d="M85 60 L114 34" />
            </g>
            <circle cx="85" cy="60" r="3.5" fill="currentColor" />
            <text x="46" y="24" textAnchor="middle">Sign</text>
            <text x="124" y="24" textAnchor="middle">Paint</text>
            <text x="85" y="104" textAnchor="middle">Sticker</text>
          </svg>
          <nav>
            <Link href="/catalog">PRODUCTS</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">CONTACT</Link>
            <Link href="/guide">GUIDE</Link>
            <Link href="/">HOME</Link>
          </nav>
        </div>
        <div className="ft-note">
          <span>© LIBRE EFFECT — FUKUOKA, JAPAN</span>
          <span>STICK IT. SHOW IT. SELL IT.</span>
        </div>
      </div>
    </footer>
  );
}
