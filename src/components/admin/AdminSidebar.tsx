'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/admin';
import BrandLogo from '@/components/BrandLogo';
import { MOCK_ORDERS, MOCK_INQUIRIES } from '@/data/adminData';

const unreadCount = MOCK_INQUIRIES.filter((i) => i.status === 'unread').length;
const procCount = MOCK_ORDERS.filter((o) => o.status === 'proc').length;

const NAV = [
  { href: '/admin/dashboard',  ico: '▣', label: 'DASHBOARD'  },
  { href: '/admin/orders',     ico: '▤', label: 'ORDERS',    badge: procCount > 0 ? String(procCount) : '' },
  { href: '/admin/products',   ico: '◈', label: 'PRODUCTS'   },
  { href: '/admin/inquiries',  ico: '✉', label: 'INQUIRIES', badge: unreadCount > 0 ? String(unreadCount) : '' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAdminStore((s) => s.logout);

  function handleLogout() {
    logout();
    router.push('/admin/login');
  }

  return (
    <aside className="adm-side">
      <div className="adm-brand">
        <div className="adm-brand-label">Admin Panel</div>
        <div style={{ transform: 'scale(0.7)', transformOrigin: 'left center', width: 200 }}>
          <BrandLogo />
        </div>
      </div>
      <nav className="adm-nav">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={pathname.startsWith(n.href) ? 'on' : ''}
          >
            <span className="adm-ico">{n.ico}</span>
            {n.label}
            {n.badge && <span className="badge">{n.badge}</span>}
          </Link>
        ))}
      </nav>
      <div className="adm-foot">
        <button className="adm-logout" onClick={handleLogout}>LOGOUT</button>
      </div>
    </aside>
  );
}
