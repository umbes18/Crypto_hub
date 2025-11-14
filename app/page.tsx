import { fetchTopCryptos, fetchCryptoNews } from '@/lib/api';
import CryptoCard from '@/components/ui/CryptoCard';
import NewsCard from '@/components/ui/NewsCard';
import { TrendingUp, Newspaper } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [topCryptos, news] = await Promise.all([
    fetchTopCryptos(12),
    fetchCryptoNews(),
  ]);

  return (
    <div className="container px-4 py-8 md:px-6">
      {/* Hero Section */}
      <section className="mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Track <span className="text-gradient">Crypto Markets</span> in Real-time
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Stay updated with live cryptocurrency prices, interactive charts, and the latest news
          from top sources like CoinDesk, The Block, Messari, and more.
        </p>
      </section>

      {/* Market Overview */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-robinhood-green" />
          <h2 className="text-2xl font-bold">Top Cryptocurrencies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {topCryptos.map((crypto, index) => (
            <div
              key={crypto.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-slide-up"
            >
              <CryptoCard crypto={crypto} />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/prices"
            className="inline-flex items-center gap-2 px-6 py-3 bg-robinhood-green text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            View All Cryptocurrencies
          </a>
        </div>
      </section>

      {/* News Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Newspaper className="h-6 w-6 text-robinhood-green" />
          <h2 className="text-2xl font-bold">Latest Crypto News</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.slice(0, 6).map((article, index) => (
            <div
              key={article.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-slide-up"
            >
              <NewsCard article={article} />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-robinhood-gray text-foreground font-semibold rounded-lg hover:bg-robinhood-light-gray transition-colors"
          >
            View All News
          </a>
        </div>
      </section>
    </div>
  );
}
