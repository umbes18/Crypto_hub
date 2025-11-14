'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CryptoDetail, ChartData, CandleData } from '@/types';
import { formatPrice, formatMarketCap, formatPercentage } from '@/lib/utils';
import AreaChart from '@/components/charts/AreaChart';
import CandlestickChart from '@/components/charts/CandlestickChart';

interface CryptoDetailClientProps {
  crypto: CryptoDetail;
  chartData: ChartData[];
  ohlcData: CandleData[];
}

type ChartType = 'area' | 'candle';

export default function CryptoDetailClient({
  crypto,
  chartData,
  ohlcData,
}: CryptoDetailClientProps) {
  const [chartType, setChartType] = useState<ChartType>('area');
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-rh-text-secondary hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={crypto.image}
                alt={crypto.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{crypto.name}</h1>
              <p className="text-rh-text-secondary uppercase text-sm">{crypto.symbol}</p>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <p className="text-5xl font-bold">{formatPrice(crypto.current_price)}</p>
            <p
              className={`text-xl font-semibold ${
                isPositive ? 'text-rh-green' : 'text-rh-red'
              }`}
            >
              {formatPercentage(crypto.price_change_percentage_24h)}
            </p>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="mb-6">
          <div className="inline-flex gap-1 bg-rh-surface rounded-lg p-1">
            <button
              onClick={() => setChartType('area')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                chartType === 'area'
                  ? 'bg-rh-green text-black'
                  : 'text-rh-text-secondary hover:text-white'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('candle')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                chartType === 'candle'
                  ? 'bg-rh-green text-black'
                  : 'text-rh-text-secondary hover:text-white'
              }`}
            >
              Candles
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8 bg-rh-surface rounded-lg p-6">
          <div className="h-[400px]">
            {chartType === 'area' && chartData.length > 0 && (
              <AreaChart data={chartData} isPositive={isPositive} />
            )}
            {chartType === 'candle' && ohlcData.length > 0 && (
              <CandlestickChart data={ohlcData} />
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Market Cap" value={formatMarketCap(crypto.market_cap)} />
          <StatCard label="24h Volume" value={formatMarketCap(crypto.total_volume)} />
          <StatCard label="24h High" value={formatPrice(crypto.high_24h)} />
          <StatCard label="24h Low" value={formatPrice(crypto.low_24h)} />
          <StatCard
            label="Circulating Supply"
            value={formatMarketCap(crypto.circulating_supply)}
          />
          <StatCard
            label="Total Supply"
            value={crypto.total_supply ? formatMarketCap(crypto.total_supply) : 'N/A'}
          />
          <StatCard
            label="Max Supply"
            value={crypto.max_supply ? formatMarketCap(crypto.max_supply) : '∞'}
          />
          <StatCard label="Rank" value={`#${crypto.market_cap_rank}`} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-rh-surface rounded-lg p-4">
      <p className="text-xs font-semibold text-rh-text-secondary uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
