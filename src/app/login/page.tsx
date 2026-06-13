'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Tab = 'login' | 'signup';

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('login');
  const router = useRouter();

  return (
    <main className="wrap page">
      <nav className="crumb">
        <Link href="/">HOME</Link>
        <span className="sep">/</span>
        <span className="here">{tab === 'login' ? 'LOGIN' : 'SIGN UP'}</span>
      </nav>

      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-tabs">
            <div className={`auth-tab${tab === 'login' ? ' on' : ''}`} onClick={() => setTab('login')}>ログイン</div>
            <div className={`auth-tab${tab === 'signup' ? ' on' : ''}`} onClick={() => setTab('signup')}>会員登録</div>
          </div>

          {tab === 'login' ? (
            <div>
              <h1 className="auth-head">WELCOME <span className="red">BACK</span></h1>
              <p className="auth-jp">アカウントにログインして、注文状況や入稿データを管理できます。</p>
              <form className="auth-form" onSubmit={(e) => { e.preventDefault(); router.push('/account'); }}>
                <div className="field">
                  <label>メールアドレス</label>
                  <input type="email" placeholder="hello@example.com" />
                </div>
                <div className="field">
                  <label>パスワード</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="auth-row">
                  <label className="fopt" style={{ width: 'auto' }}>
                    <input type="checkbox" /> ログイン状態を保持
                  </label>
                  <a href="#">パスワードを忘れた？</a>
                </div>
                <button type="submit" className="btn-auth">ログイン →</button>
              </form>
            </div>
          ) : (
            <div>
              <h1 className="auth-head">JOIN <span className="red">LIBRE</span></h1>
              <p className="auth-jp">会員登録で、リピート発注・入稿データの再利用がかんたんに。</p>
              <form className="auth-form" onSubmit={(e) => { e.preventDefault(); router.push('/account'); }}>
                <div className="field">
                  <label>お名前</label>
                  <input type="text" placeholder="山田 花子" />
                </div>
                <div className="field">
                  <label>メールアドレス</label>
                  <input type="email" placeholder="hello@example.com" />
                </div>
                <div className="field">
                  <label>パスワード</label>
                  <input type="password" placeholder="8文字以上" />
                  <span className="hint">英数字を含む8文字以上</span>
                </div>
                <label className="fopt" style={{ width: 'auto', fontSize: 12 }}>
                  <input type="checkbox" />
                  <span>利用規約とプライバシーポリシーに同意します</span>
                </label>
                <button type="submit" className="btn-auth">登録する →</button>
              </form>
            </div>
          )}

          <div className="auth-or">OR</div>
          <div className="auth-social">
            <button className="btn-social">
              <span className="ic">G</span> Googleで続ける
            </button>
            <button className="btn-social">
              <span className="ic" style={{ color: 'var(--red)' }}>✕</span> X (Twitter) で続ける
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
