import { fetchTopCryptos } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatMarketCap, formatPercentage } from '@/lib/utils';

export const revalidate = 60;

export default async function PricesPage() {
  const cryptos = await fetchTopCryptos(100);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Prices</h1>
          <p className="text-rh-text-secondary">
            Real-time cryptocurrency prices and market data
          </p>
        </div>

        {/* Table */}
        <div className="bg-rh-surface rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-rh-border">
                  <th className="text-left p-4 text-xs font-semibold text-rh-text-secondary uppercase tracking-wider">
                    #
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-rh-text-secondary uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-right p-4 text-xs font-semibold text-rh-text-secondary uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-right p-4 text-xs font-semibold text-rh-text-secondary uppercase tracking-wider">
                    24h
                  </th>
                  <th className="text-right p-4 text-xs font-semibold text-rh-text-secondary uppercase tracking-wider hidden md:table-cell">
                    7d
                  </th>
                  <th className="text-right p-4 text-xs font-semibold text-rh-text-secondary uppercase tracking-wider hidden lg:table-cell">
                    Market Cap
                  </th>
                  <th className="text-right p-4 text-xs font-semibold text-rh-text-secondary uppercase tracking-wider hidden xl:table-cell">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {cryptos.map((crypto, index) => {
                  const isPositive24h = crypto.price_change_percentage_24h >= 0;
                  const isPositive7d = (crypto.price_change_percentage_7d ?? 0) >= 0;

                  return (
                    <tr
                      key={crypto.id}
                      className="border-b border-rh-border hover:bg-rh-border transition-colors"
                    >
                      <td className="p-4 text-sm text-rh-text-secondary">
                        {index + 1}
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/crypto/${crypto.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={crypto.image}
                              alt={crypto.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white group-hover:text-rh-green transition-colors truncate">
                              {crypto.name}
                            </p>
                            <p className="text-sm text-rh-text-secondary uppercase">
                              {crypto.symbol}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="p-4 text-right font-semibold text-white">
                        {formatPrice(crypto.current_price)}
                      </td>
                      <td className="p-4 text-right">
                        <span
                          className={`font-semibold ${
                            isPositive24h ? 'text-rh-green' : 'text-rh-red'
                          }`}
                        >
                          {formatPercentage(crypto.price_change_percentage_24h)}
                        </span>
                      </td>
                      <td className="p-4 text-right hidden md:table-cell">
                        {crypto.price_change_percentage_7d !== undefined ? (
                          <span
                            className={`font-semibold ${
                              isPositive7d ? 'text-rh-green' : 'text-rh-red'
                            }`}
                          >
                            {formatPercentage(crypto.price_change_percentage_7d)}
                          </span>
                        ) : (
                          <span className="text-rh-text-secondary">-</span>
                        )}
                      </td>
                      <td className="p-4 text-right hidden lg:table-cell">
                        <span className="text-white font-medium">
                          {formatMarketCap(crypto.market_cap)}
                        </span>
                      </td>
                      <td className="p-4 text-right hidden xl:table-cell">
                        <span className="text-rh-text-secondary">
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
    </div>
  );
}
