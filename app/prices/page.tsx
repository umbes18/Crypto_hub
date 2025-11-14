import { fetchTopCryptos } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatMarketCap, formatPercentage, cn } from '@/lib/utils';

export const revalidate = 60;

export default async function PricesPage() {
  const cryptos = await fetchTopCryptos(100);

  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">
          Cryptocurrency <span className="text-gradient">Prices</span>
        </h1>
        <p className="text-muted-foreground">
          Track real-time prices for the top 100 cryptocurrencies by market cap
        </p>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-robinhood-gray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-robinhood-light-gray">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                  #
                </th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                  Name
                </th>
                <th className="text-right p-4 text-sm font-semibold text-muted-foreground">
                  Price
                </th>
                <th className="text-right p-4 text-sm font-semibold text-muted-foreground">
                  24h %
                </th>
                <th className="text-right p-4 text-sm font-semibold text-muted-foreground hidden md:table-cell">
                  7d %
                </th>
                <th className="text-right p-4 text-sm font-semibold text-muted-foreground hidden lg:table-cell">
                  Market Cap
                </th>
                <th className="text-right p-4 text-sm font-semibold text-muted-foreground hidden xl:table-cell">
                  Volume (24h)
                </th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((crypto, index) => {
                const isPositive24h = crypto.price_change_percentage_24h >= 0;
                const isPositive7d =
                  (crypto.price_change_percentage_7d ?? 0) >= 0;

                return (
                  <tr
                    key={crypto.id}
                    className="border-b border-robinhood-light-gray hover:bg-robinhood-light-gray transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 20}ms` }}
                  >
                    <td className="p-4 text-muted-foreground">{index + 1}</td>
                    <td className="p-4">
                      <Link
                        href={`/crypto/${crypto.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="relative h-8 w-8 rounded-full overflow-hidden bg-robinhood-light-gray">
                          <Image
                            src={crypto.image}
                            alt={crypto.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-semibold group-hover:text-robinhood-green transition-colors">
                            {crypto.name}
                          </p>
                          <p className="text-sm text-muted-foreground uppercase">
                            {crypto.symbol}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {formatPrice(crypto.current_price)}
                    </td>
                    <td className="p-4 text-right">
                      <div
                        className={cn(
                          'inline-flex items-center gap-1',
                          isPositive24h ? 'text-green-500' : 'text-red-500'
                        )}
                      >
                        {isPositive24h ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span className="font-medium">
                          {formatPercentage(crypto.price_change_percentage_24h)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right hidden md:table-cell">
                      {crypto.price_change_percentage_7d !== undefined ? (
                        <div
                          className={cn(
                            'inline-flex items-center gap-1',
                            isPositive7d ? 'text-green-500' : 'text-red-500'
                          )}
                        >
                          {isPositive7d ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span className="font-medium">
                            {formatPercentage(crypto.price_change_percentage_7d)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right hidden lg:table-cell">
                      <span className="font-medium">
                        {formatMarketCap(crypto.market_cap)}
                      </span>
                    </td>
                    <td className="p-4 text-right hidden xl:table-cell">
                      <span className="text-muted-foreground">
                        {formatMarketCap(crypto.total_volume)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
