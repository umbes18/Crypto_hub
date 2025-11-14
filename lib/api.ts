import { CryptoAsset, NewsArticle, ChartData, CandleData } from '@/types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function fetchTopCryptos(limit: number = 50): Promise<CryptoAsset[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=7d`,
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );
    if (!response.ok) throw new Error('Failed to fetch crypto data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching top cryptos:', error);
    return [];
  }
}

export async function fetchCryptoDetail(id: string) {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) throw new Error('Failed to fetch crypto detail');
    const data = await response.json();

    return {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image.large,
      current_price: data.market_data.current_price.usd,
      market_cap: data.market_data.market_cap.usd,
      market_cap_rank: data.market_cap_rank,
      total_volume: data.market_data.total_volume.usd,
      high_24h: data.market_data.high_24h.usd,
      low_24h: data.market_data.low_24h.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      price_change_percentage_7d: data.market_data.price_change_percentage_7d,
      circulating_supply: data.market_data.circulating_supply,
      total_supply: data.market_data.total_supply,
      max_supply: data.market_data.max_supply,
      ath: data.market_data.ath.usd,
      ath_date: data.market_data.ath_date.usd,
      atl: data.market_data.atl.usd,
      atl_date: data.market_data.atl_date.usd,
    };
  } catch (error) {
    console.error('Error fetching crypto detail:', error);
    return null;
  }
}

export async function fetchChartData(
  id: string,
  days: number = 7
): Promise<ChartData[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) throw new Error('Failed to fetch chart data');
    const data = await response.json();

    return data.prices.map(([timestamp, price]: [number, number]) => ({
      timestamp,
      price,
    }));
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return [];
  }
}

export async function fetchOHLCData(
  id: string,
  days: number = 7
): Promise<CandleData[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${id}/ohlc?vs_currency=usd&days=${days}`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) throw new Error('Failed to fetch OHLC data');
    const data = await response.json();

    return data.map(([time, open, high, low, close]: number[]) => ({
      time,
      open,
      high,
      low,
      close,
    }));
  } catch (error) {
    console.error('Error fetching OHLC data:', error);
    return [];
  }
}

// Mock news data - in production, this would fetch from real news APIs
export async function fetchCryptoNews(): Promise<NewsArticle[]> {
  // This is a placeholder. In production, you would integrate with:
  // - CoinDesk API
  // - The Block API
  // - CoinMarketCap news
  // - RSS feeds

  const mockNews: NewsArticle[] = [
    {
      id: '1',
      title: 'Bitcoin Reaches New All-Time High as Institutional Adoption Grows',
      description: 'Bitcoin surged past previous records as major institutions increase their crypto holdings.',
      url: '#',
      source: 'CoinDesk',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      category: 'Bitcoin',
    },
    {
      id: '2',
      title: 'Ethereum 2.0 Upgrade Shows Promising Results',
      description: 'The latest Ethereum upgrade demonstrates significant improvements in transaction speed and energy efficiency.',
      url: '#',
      source: 'The Block',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      category: 'Ethereum',
    },
    {
      id: '3',
      title: 'DeFi Protocol Achieves $10B in Total Value Locked',
      description: 'Leading decentralized finance protocol reaches major milestone in user adoption and liquidity.',
      url: '#',
      source: 'Messari',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      category: 'DeFi',
    },
    {
      id: '4',
      title: 'Market Analysis: Crypto Derivatives Show Bullish Sentiment',
      description: 'Options data from Deribit indicates increasing confidence among professional traders.',
      url: '#',
      source: 'Deribit Insights',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      category: 'Analysis',
    },
    {
      id: '5',
      title: 'Stablecoin Market Cap Exceeds $150 Billion',
      description: 'Growth in stablecoin usage signals increasing real-world adoption of crypto payments.',
      url: '#',
      source: 'CoinGlass',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      category: 'Market',
    },
  ];

  return mockNews;
}
