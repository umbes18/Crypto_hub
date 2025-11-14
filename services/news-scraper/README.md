# Crypto News Scraper Microservice

Microservizio Python FastAPI per lo scraping di notizie crypto da fonti multiple.

## Fonti News
- CoinDesk
- CoinTelegraph
- The Block
- Decrypt

## Installazione

```bash
pip install -r requirements.txt
```

## Avvio

```bash
python main.py
# oppure
uvicorn main:app --reload --port 8001
```

## Docker

```bash
docker build -t crypto-news-scraper .
docker run -p 8001:8001 crypto-news-scraper
```

## API Endpoints

- `GET /` - Info API
- `GET /news` - Tutte le news (limit=20)
- `GET /news/{source}` - News da fonte specifica
- `GET /sources` - Lista fonti disponibili

## Esempi

```bash
curl http://localhost:8001/news
curl http://localhost:8001/news/coindesk
curl http://localhost:8001/sources
```
