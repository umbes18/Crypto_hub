'use client';

import dynamic from 'next/dynamic';
import { CryptoAsset } from '@/types';
import { formatPrice, formatPercentage } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

// Import dinamico del MiniChart solo client-side
const MiniChart = dynamic(() => import('./MiniChart').then(mod => ({ default: mod.MiniChart })), {
  ssr: false,
  loading: () => <div className="h-16 w-full bg-rh-surface/20 rounded animate-pulse" />
});

interface CryptoCardProps {
  crypto: CryptoAsset;
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <Link
      href={`/crypto/${crypto.id}`}
      className="block bg-rh-surface rounded-lg p-5 hover:bg-rh-border transition-colors cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={crypto.image}
              alt={crypto.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h3 className="font-semibold text-base text-white">{crypto.name}</h3>
            <p className="text-sm text-rh-text-secondary uppercase">{crypto.symbol}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      {crypto.sparkline_in_7d && crypto.sparkline_in_7d.price.length > 0 && (
        <div className="h-16 mb-4 -mx-2">
          <MiniChart
            data={crypto.sparkline_in_7d.price}
            isPositive={isPositive}
          />
        </div>
      )}

      {/* Price and Change */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-white">
            {formatPrice(crypto.current_price)}
          </p>
        </div>
        <div>
          <p
            className={`text-sm font-semibold ${
              isPositive ? 'text-rh-green' : 'text-rh-red'
            }`}
          >
            {formatPercentage(crypto.price_change_percentage_24h)}
          </p>
        </div>
      </div>
    </Link>
  );
}
