'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoAsset } from '@/types';
import { formatPrice, formatPercentage } from '@/lib/utils';
import { MiniChart } from './MiniChart';

interface CryptoCardProps {
  crypto: CryptoAsset;
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <Link
      href={`/crypto/${crypto.id}`}
      className="group block rounded-xl bg-robinhood-gray p-4 transition-all hover:bg-robinhood-light-gray hover:scale-[1.02] animate-fade-in"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-robinhood-light-gray">
            <Image
              src={crypto.image}
              alt={crypto.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-robinhood-green transition-colors">
              {crypto.name}
            </h3>
            <p className="text-sm text-muted-foreground uppercase">
              {crypto.symbol}
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            isPositive ? 'bg-green-500/10' : 'bg-red-500/10'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span
            className={`text-xs font-medium ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {formatPercentage(crypto.price_change_percentage_24h)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-bold text-foreground">
            {formatPrice(crypto.current_price)}
          </p>
        </div>

        {crypto.sparkline_in_7d && (
          <div className="h-16 -mx-2">
            <MiniChart
              data={crypto.sparkline_in_7d.price}
              isPositive={isPositive}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
