'use client';

import { useMemo } from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  CartesianGrid,
} from 'recharts';
import { CandleData } from '@/types';
import { formatPrice } from '@/lib/utils';

interface CandlestickChartProps {
  data: CandleData[];
}

// Custom candlestick bar component
const CustomCandlestick = (props: any) => {
  const { x, y, width, height, fill, payload } = props;

  if (!payload) return null;

  const { open, close, high, low } = payload;
  const isPositive = close >= open;
  const color = isPositive ? '#00C805' : '#ef4444';

  const bodyTop = Math.min(open, close);
  const bodyBottom = Math.max(open, close);
  const bodyHeight = Math.abs(close - open);

  // Calculate positions
  const wickX = x + width / 2;

  return (
    <g>
      {/* High-Low wick */}
      <line
        x1={wickX}
        y1={y}
        x2={wickX}
        y2={y + height}
        stroke={color}
        strokeWidth={1}
      />
      {/* Candle body */}
      <rect
        x={x}
        y={y + (height * (1 - (bodyTop - low) / (high - low)))}
        width={width}
        height={Math.max(1, height * (bodyHeight / (high - low)))}
        fill={color}
        stroke={color}
      />
    </g>
  );
};

export default function CandlestickChart({ data }: CandlestickChartProps) {
  const chartData = useMemo(() => {
    return data.map((candle) => ({
      time: new Date(candle.time).toLocaleDateString(),
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
      range: [candle.low, candle.high],
    }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={chartData}>
        <defs>
          <linearGradient id="colorCandle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00C805" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#00C805" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
        <XAxis
          dataKey="time"
          stroke="#666"
          tick={{ fill: '#999', fontSize: 12 }}
        />
        <YAxis
          stroke="#666"
          tick={{ fill: '#999', fontSize: 12 }}
          domain={['dataMin', 'dataMax']}
          tickFormatter={(value) => formatPrice(value)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e1e1e',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            color: '#fff',
          }}
          formatter={(value: number, name: string) => {
            if (typeof value === 'number') {
              return [formatPrice(value), name.toUpperCase()];
            }
            return [value, name];
          }}
        />
        <Bar
          dataKey="high"
          fill="url(#colorCandle)"
          shape={<CustomCandlestick />}
          maxBarSize={50}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
