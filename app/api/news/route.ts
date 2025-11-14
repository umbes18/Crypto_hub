import { NextResponse } from 'next/server';

const NEWS_SERVICE_URL = process.env.NEWS_SERVICE_URL || 'http://localhost:8001';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source');
  const limit = searchParams.get('limit') || '20';

  try {
    let url = `${NEWS_SERVICE_URL}/news`;
    if (source) {
      url = `${NEWS_SERVICE_URL}/news/${source}`;
    }
    url += `?limit=${limit}`;

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    // Fallback to mock data if service is not available
    return NextResponse.json([
      {
        id: '1',
        title: 'Bitcoin Reaches New All-Time High',
        description: 'Bitcoin surged past previous records as institutional adoption grows.',
        url: '#',
        source: 'CoinDesk',
        publishedAt: new Date().toISOString(),
        category: 'Bitcoin',
      },
    ]);
  }
}
