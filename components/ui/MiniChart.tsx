'use client';

import { useMemo, useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: number[];
  isPositive: boolean;
}

export function MiniChart({ data, isPositive }: MiniChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = useMemo(
    () => data.map((price, index) => ({ index, price })),
    [data]
  );

  const color = isPositive ? '#00C805' : '#FF5000';

  if (!data || data.length === 0 || !mounted) return <div className="h-16 w-full bg-rh-surface/20 rounded animate-pulse" />;

  return (
    <div style={{ width: '100%', height: '64px' }}>
      <ResponsiveContainer width="100%" height={64}>
        <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`gradient-${isPositive ? 'up' : 'down'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#gradient-${isPositive ? 'up' : 'down'})`}
            isAnimationActive={false}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
