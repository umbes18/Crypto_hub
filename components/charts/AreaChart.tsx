'use client';

import { useMemo } from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ChartData } from '@/types';
import { formatPrice } from '@/lib/utils';

interface AreaChartProps {
  data: ChartData[];
  isPositive: boolean;
}

export default function AreaChart({ data, isPositive }: AreaChartProps) {
  const chartData = useMemo(
    () =>
      data.map((item) => ({
        time: new Date(item.timestamp).toLocaleDateString(),
        price: item.price,
      })),
    [data]
  );

  const color = isPositive ? '#00C805' : '#FF5000';

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
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
            tickFormatter={(value) => formatPrice(value)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1e1e',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value: number) => [formatPrice(value), 'Price']}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorPrice)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
