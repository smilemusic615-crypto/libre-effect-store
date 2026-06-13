import type { Metadata } from 'next';
import './globals.css';
import Marquee from '@/components/Marquee';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LIBRE EFFECT — SIGN & STICKER STORE',
  description: '福岡発、看板・ステッカー工房 LIBRE EFFECT のオンラインストア。ウェディングパネル・ショップサイン・カッティングシート・ステッカーを小ロットから。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Marquee />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
