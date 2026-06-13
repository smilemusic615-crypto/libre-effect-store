'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [keep, setKeep]         = useState(false);
  const [error, setError]       = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }
    // デモ: そのままアカウントページへ
    window.location.href = '/account';
  }

  return (
    <main className="wrap page">
      <nav className="crumb">
        <Link href="/">HOME</Link>
        <span className="sep">/</span>
        <span className="here">LOGIN</span>
      </nav>

      <div className="auth-wrap">
        <div className="auth-card">
          <h1 className="auth-head">LOG<span className="red">IN</span></h1>
          <p className="auth-jp">メールアドレスでログイン</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label>
                EMAIL <span className="req">*</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label>
                PASSWORD <span className="req">*</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <div className="auth-row">
              <label className="fopt">
                <input
                  type="checkbox"
                  checked={keep}
                  onChange={(e) => setKeep(e.target.checked)}
                />
                ログイン状態を保持する
              </label>
              <a href="#">パスワードを忘れた方</a>
            </div>

            {error && (
              <p style={{ fontFamily: 'var(--dot)', fontSize: 11, color: 'var(--red)', letterSpacing: '.04em' }}>
                {error}
              </p>
            )}

            <button type="submit" className="btn-auth">
              LOGIN →
            </button>
          </form>

          <div className="auth-or">OR</div>

          <div className="auth-social">
            <button type="button" className="btn-social">
              <span className="ic" style={{ fontWeight: 900 }}>G</span>
              Googleでログイン
            </button>
            <button type="button" className="btn-social">
              <span className="ic" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>𝕏</span>
              X（Twitter）でログイン
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
