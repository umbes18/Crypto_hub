import { fetchCryptoNews } from '@/lib/api';
import NewsCard from '@/components/ui/NewsCard';
import { Newspaper } from 'lucide-react';

export const revalidate = 300; // Revalidate every 5 minutes

export default async function NewsPage() {
  const news = await fetchCryptoNews();

  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Newspaper className="h-8 w-8 text-robinhood-green" />
          <h1 className="text-4xl font-bold">
            Crypto <span className="text-gradient">News</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Stay informed with the latest cryptocurrency news from top sources including
          CoinDesk, The Block, Messari, Deribit Insights, and more.
        </p>
      </div>

      {/* News Sources Info */}
      <div className="mb-8 rounded-xl bg-robinhood-gray p-6 animate-fade-in">
        <h2 className="text-lg font-semibold mb-3">News Sources</h2>
        <div className="flex flex-wrap gap-3">
          {['CoinDesk', 'The Block', 'Messari', 'Deribit Insights', 'CoinGlass', 'CoinMarketCap'].map(
            (source) => (
              <span
                key={source}
                className="px-3 py-1 bg-robinhood-light-gray text-robinhood-green rounded-full text-sm font-medium"
              >
                {source}
              </span>
            )
          )}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div
            key={article.id}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-slide-up"
          >
            <NewsCard article={article} />
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center animate-fade-in">
        <div className="inline-block rounded-xl bg-robinhood-gray p-6">
          <p className="text-muted-foreground mb-2">
            News updated every 5 minutes
          </p>
          <p className="text-sm text-muted-foreground">
            Data aggregated from multiple trusted cryptocurrency news sources
          </p>
        </div>
      </div>
    </div>
  );
}
