'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/admin';
import BrandLogo from '@/components/BrandLogo';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAdminStore((s) => s.login);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      router.push('/admin/dashboard');
    } else {
      setError('パスワードが正しくありません。');
      setPassword('');
    }
  }

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div style={{ marginBottom: 24 }}>
          <BrandLogo />
        </div>
        <div className="adm-login-eyebrow">Administration</div>
        <h1 className="adm-login-h">ADMIN LOGIN</h1>
        <p className="adm-login-sub">管理者専用エリアです。パスワードを入力してください。</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label>パスワード</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              autoFocus
            />
          </div>
          {error && <div className="adm-login-err">{error}</div>}
          <button type="submit" className="btn-auth">管理画面へ →</button>
        </form>
      </div>
    </div>
  );
}
