import { NextResponse } from 'next/server';
import { fetchTopCryptos } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    const cryptos = await fetchTopCryptos(limit);
    return NextResponse.json(cryptos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cryptocurrency data' },
      { status: 500 }
    );
  }
}
