import { fetchCryptoDetail, fetchChartData, fetchOHLCData } from '@/lib/api';
import { notFound } from 'next/navigation';
import CryptoDetailClient from './CryptoDetailClient';

export const revalidate = 60;

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CryptoDetailPage({ params }: PageProps) {
  const cryptoDetail = await fetchCryptoDetail(params.id);

  if (!cryptoDetail) {
    notFound();
  }

  const [chartData, ohlcData] = await Promise.all([
    fetchChartData(params.id, 7),
    fetchOHLCData(params.id, 30),
  ]);

  return (
    <CryptoDetailClient
      crypto={cryptoDetail}
      chartData={chartData}
      ohlcData={ohlcData}
    />
  );
}
