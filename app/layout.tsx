import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'CryptoHub - Real-time Cryptocurrency Prices & News',
  description: 'Track cryptocurrency prices, view real-time charts, and stay updated with the latest crypto news from CoinDesk, The Block, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
