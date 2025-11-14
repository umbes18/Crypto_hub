import { fetchCryptoNews } from '@/lib/api';
import NewsCard from '@/components/ui/NewsCard';
import { Newspaper } from 'lucide-react';

export const revalidate = 300;

export default async function NewsPage() {
  const news = await fetchCryptoNews();

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="h-8 w-8 text-rh-green" strokeWidth={2.5} />
            <h1 className="text-4xl font-bold tracking-tight">News</h1>
          </div>
          <p className="text-lg text-rh-text-secondary max-w-3xl">
            Stay informed with the latest cryptocurrency news from trusted sources
          </p>
        </div>

        {/* Sources */}
        <div className="mb-8 bg-rh-surface rounded-lg p-5">
          <h2 className="text-sm font-semibold mb-3 text-rh-text-secondary uppercase tracking-wider">
            Sources
          </h2>
          <div className="flex flex-wrap gap-2">
            {['CoinDesk', 'The Block', 'Messari', 'Deribit', 'CoinGlass', 'CoinMarketCap'].map(
              (source) => (
                <span
                  key={source}
                  className="px-3 py-1 bg-black text-rh-green rounded-full text-xs font-medium border border-rh-border"
                >
                  {source}
                </span>
              )
            )}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
