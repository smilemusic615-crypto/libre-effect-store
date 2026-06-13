'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BrandLogo from './BrandLogo';
import { useCartStore } from '@/store/cart';

const NAV = [
  { e: 'WEDDING', j: 'ウェディング', href: '/catalog?cat=wedding' },
  { e: 'SIGN',    j: '看板',         href: '/catalog?cat=sign'    },
  { e: 'CUTTING', j: 'シート',        href: '/catalog?cat=cutting' },
  { e: 'STICKER', j: 'ステッカー',   href: '/catalog?cat=sticker' },
  { e: 'GUIDE',   j: 'ガイド',        href: '/guide'               },
];

interface Props {
  active?: string;
}

export default function Header({ active }: Props) {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((n, i) => n + i.qty, 0);

  return (
    <header className={`hd${open ? ' menu-open' : ''}`}>
      <div className="wrap hd-in">
        <Link className="hd-logo brand2" href="/">
          <Image className="hd-mascot" src="/eagle-mascot.png" alt="LIBRE EFFECT マスコットのワシ" width={52} height={52} />
          <BrandLogo />
        </Link>
        <nav className="hd-nav">
          {NAV.map((n) => (
            <Link key={n.e} href={n.href} className={active === n.e ? 'active' : ''}>
              <span className="e">{n.e}</span>
              <span className="j">{n.j}</span>
            </Link>
          ))}
        </nav>
        <div className="hd-actions">
          <Link className="hd-cart" href="/cart">CART ({cartCount})</Link>
          <button
            className="hd-burger"
            aria-label="メニュー"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <div className="mnav">
          <nav>
            {NAV.map((n) => (
              <Link key={n.e} href={n.href} onClick={() => setOpen(false)}>
                <span className="e">{n.e}</span>
                <span className="j">{n.j}</span>
              </Link>
            ))}
          </nav>
          <div className="mnav-foot">
            <Link href="/contact" onClick={() => setOpen(false)}>CONTACT</Link>
            <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
          </div>
        </div>
      )}
    </header>
  );
}
