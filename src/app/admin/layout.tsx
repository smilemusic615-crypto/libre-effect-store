'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/admin';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAdminStore((s) => s.isLoggedIn);
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isLoggedIn && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [isLoggedIn, pathname, router, mounted]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Before hydration or if not logged in: show nothing to avoid flash
  if (!mounted || !isLoggedIn) return null;

  return (
    <div className="adm-wrap">
      <AdminSidebar />
      <div className="adm-main">{children}</div>
    </div>
  );
}
