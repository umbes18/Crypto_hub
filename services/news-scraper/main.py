from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import feedparser
import httpx
from bs4 import BeautifulSoup
from datetime import datetime
from pydantic import BaseModel

app = FastAPI(title="Crypto News Scraper API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsArticle(BaseModel):
    id: str
    title: str
    description: str
    url: str
    source: str
    publishedAt: str
    image: Optional[str] = None
    category: Optional[str] = None

# RSS Feed URLs
NEWS_SOURCES = {
    "coindesk": "https://www.coindesk.com/arc/outboundfeeds/rss/",
    "cointelegraph": "https://cointelegraph.com/rss",
    "theblock": "https://www.theblock.co/rss.xml",
    "decrypt": "https://decrypt.co/feed",
}

async def fetch_rss_feed(source_name: str, url: str) -> List[NewsArticle]:
    """Fetch and parse RSS feed from a news source."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=10.0)
            feed = feedparser.parse(response.text)

            articles = []
            for entry in feed.entries[:10]:  # Get latest 10 articles
                article = NewsArticle(
                    id=f"{source_name}-{hash(entry.link)}",
                    title=entry.title,
                    description=entry.get('summary', entry.get('description', ''))[:300],
                    url=entry.link,
                    source=source_name.title(),
                    publishedAt=datetime(*entry.published_parsed[:6]).isoformat() if hasattr(entry, 'published_parsed') else datetime.now().isoformat(),
                    image=entry.get('media_content', [{}])[0].get('url') if hasattr(entry, 'media_content') else None,
                    category="Cryptocurrency"
                )
                articles.append(article)

            return articles
    except Exception as e:
        print(f"Error fetching {source_name}: {e}")
        return []

@app.get("/")
async def root():
    return {"message": "Crypto News Scraper API", "version": "1.0.0"}

@app.get("/news", response_model=List[NewsArticle])
async def get_all_news(limit: int = 20):
    """Fetch latest news from all sources."""
    all_articles = []

    for source_name, url in NEWS_SOURCES.items():
        articles = await fetch_rss_feed(source_name, url)
        all_articles.extend(articles)

    # Sort by published date
    all_articles.sort(key=lambda x: x.publishedAt, reverse=True)

    return all_articles[:limit]

@app.get("/news/{source}")
async def get_news_by_source(source: str, limit: int = 10):
    """Fetch news from a specific source."""
    if source.lower() not in NEWS_SOURCES:
        raise HTTPException(status_code=404, detail=f"Source '{source}' not found")

    url = NEWS_SOURCES[source.lower()]
    articles = await fetch_rss_feed(source, url)

    return articles[:limit]

@app.get("/sources")
async def get_sources():
    """Get list of available news sources."""
    return {
        "sources": list(NEWS_SOURCES.keys()),
        "count": len(NEWS_SOURCES)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
