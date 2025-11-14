import { fetchTopCryptos, fetchCryptoNews } from '@/lib/api';
import CryptoCard from '@/components/ui/CryptoCard';
import NewsCard from '@/components/ui/NewsCard';
import { TrendingUp, Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
  const [topCryptos, news] = await Promise.all([
    fetchTopCryptos(12),
    fetchCryptoNews(),
  ]);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Investing
          </h1>
          <p className="text-lg text-rh-text-secondary max-w-2xl">
            Build your crypto portfolio and track real-time prices
          </p>
        </section>

        {/* Popular Cryptocurrencies */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-rh-green" strokeWidth={2.5} />
              <h2 className="text-xl font-semibold">Popular</h2>
            </div>
            <Link
              href="/prices"
              className="flex items-center gap-1 text-sm font-medium text-rh-green hover:text-green-400 transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topCryptos.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))}
          </div>
        </section>

        {/* News Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-rh-green" strokeWidth={2.5} />
              <h2 className="text-xl font-semibold">Latest News</h2>
            </div>
            <Link
              href="/news"
              className="flex items-center gap-1 text-sm font-medium text-rh-green hover:text-green-400 transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.slice(0, 6).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
