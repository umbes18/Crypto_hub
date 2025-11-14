'use client';

import { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: number[];
  isPositive: boolean;
}

export function MiniChart({ data, isPositive }: MiniChartProps) {
  const chartData = useMemo(
    () => data.map((price, index) => ({ index, price })),
    [data]
  );

  const color = isPositive ? '#00C805' : '#ef4444';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={`gradient-${isPositive}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fill={`url(#gradient-${isPositive})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
