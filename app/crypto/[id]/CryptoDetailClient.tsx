'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { CryptoDetail, ChartData, CandleData } from '@/types';
import { formatPrice, formatMarketCap, formatPercentage, cn } from '@/lib/utils';
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
    <div className="container px-4 py-8 md:px-6">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden bg-robinhood-light-gray">
            <Image
              src={crypto.image}
              alt={crypto.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{crypto.name}</h1>
            <p className="text-muted-foreground uppercase">{crypto.symbol}</p>
          </div>
        </div>

        <div className="flex items-baseline gap-4 mb-2">
          <p className="text-5xl font-bold">{formatPrice(crypto.current_price)}</p>
          <div
            className={cn(
              'flex items-center gap-1 px-3 py-1 rounded-lg',
              isPositive ? 'bg-green-500/10' : 'bg-red-500/10'
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
            <span
              className={cn(
                'text-lg font-semibold',
                isPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {formatPercentage(crypto.price_change_percentage_24h)}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex gap-2 bg-robinhood-gray rounded-lg p-1">
          <button
            onClick={() => setChartType('area')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              chartType === 'area'
                ? 'bg-robinhood-green text-white'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Area Chart
          </button>
          <button
            onClick={() => setChartType('candle')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              chartType === 'candle'
                ? 'bg-robinhood-green text-white'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Candlestick
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-8 rounded-xl bg-robinhood-gray p-6 animate-fade-in">
        <div className="h-[400px]">
          {chartType === 'area' && chartData.length > 0 && (
            <AreaChart data={chartData} isPositive={isPositive} />
          )}
          {chartType === 'candle' && ohlcData.length > 0 && (
            <CandlestickChart data={ohlcData} />
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Market Cap"
          value={formatMarketCap(crypto.market_cap)}
          icon={<BarChart3 className="h-5 w-5 text-robinhood-green" />}
        />
        <StatCard
          label="24h Volume"
          value={formatMarketCap(crypto.total_volume)}
          icon={<BarChart3 className="h-5 w-5 text-robinhood-green" />}
        />
        <StatCard label="24h High" value={formatPrice(crypto.high_24h)} />
        <StatCard label="24h Low" value={formatPrice(crypto.low_24h)} />
        <StatCard
          label="Circulating Supply"
          value={formatMarketCap(crypto.circulating_supply)}
        />
        <StatCard
          label="Total Supply"
          value={
            crypto.total_supply
              ? formatMarketCap(crypto.total_supply)
              : 'N/A'
          }
        />
        <StatCard
          label="Max Supply"
          value={
            crypto.max_supply ? formatMarketCap(crypto.max_supply) : 'N/A'
          }
        />
        <StatCard
          label="Market Cap Rank"
          value={`#${crypto.market_cap_rank}`}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-robinhood-gray p-4 animate-slide-up">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
