# 🚀 CryptoHub - Real-time Cryptocurrency News & Analysis Platform

Un hub completo per notizie, analisi e grafici real-time sul mondo delle criptovalute, ispirato al design di Robinhood.

![CryptoHub](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 📊 Dashboard
- **Real-time Prices**: Top 100+ criptovalute con aggiornamenti in tempo reale
- **Interactive Charts**: Grafici a montagna e candlestick professionali
- **Market Overview**: Visualizzazione market cap, volume, variazioni 24h/7d

### 📈 Grafici Avanzati
- **Area Charts**: Grafici a montagna stile Robinhood con Recharts
- **Candlestick Charts**: Grafici a candele professionali con TradingView Lightweight Charts
- **Sparklines**: Mini-grafici per overview rapido

### 📰 News Aggregator
Notizie aggregate da fonti autorevoli:
- **CoinDesk** - Breaking news e analisi
- **The Block** - News istituzionali
- **Messari** - Research e insights
- **Deribit Insights** - Analisi derivati
- **CoinGlass** - Dati on-chain
- **CoinMarketCap** - Market updates

### 🎨 Design
- UI/UX ispirato a **Robinhood**
- Dark theme moderno
- Responsive design (mobile-first)
- Animazioni fluide e transizioni smooth

## 🏗️ Architettura

### Frontend (Next.js 14 + TypeScript)
```
app/
├── page.tsx              # Dashboard principale
├── prices/               # Listino prezzi completo
├── news/                 # Feed notizie
├── crypto/[id]/          # Dettaglio crypto con grafici
└── api/                  # API routes (proxy)
```

### Microservizio Python (FastAPI)
```
services/news-scraper/
├── main.py              # API per scraping news
├── requirements.txt     # Dipendenze Python
└── Dockerfile          # Container Docker
```

## 🚀 Quick Start

### Prerequisiti
- Node.js 18+
- Python 3.11+ (opzionale, per news scraper)
- npm o yarn

### Installazione

1. **Clone repository**
```bash
git clone <repository-url>
cd Crypto_hub
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Configure Environment**
```bash
cp .env.local.example .env.local
```

4. **Start Development Server**
```bash
npm run dev
```

L'app sarà disponibile su `http://localhost:3000`

### Avvio Microservizio News (Opzionale)

```bash
cd services/news-scraper
pip install -r requirements.txt
python main.py
```

Il servizio sarà disponibile su `http://localhost:8001`

**Con Docker:**
```bash
cd services/news-scraper
docker build -t crypto-news-scraper .
docker run -p 8001:8001 crypto-news-scraper
```

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts, TradingView Lightweight Charts
- **Icons**: Lucide React
- **HTTP Client**: Native fetch con caching

### Backend/Services
- **News Scraper**: Python FastAPI
- **RSS Parsing**: feedparser
- **Web Scraping**: BeautifulSoup4, httpx

### APIs
- **Crypto Data**: CoinGecko API (free tier)
- **News Sources**: RSS feeds da CoinDesk, The Block, etc.

## 🎯 API Endpoints

### Frontend API Routes
```
GET /api/crypto?limit=50        # Lista crypto
GET /api/news?limit=20          # Tutte le news
GET /api/news?source=coindesk   # News da fonte specifica
```

### News Scraper Service
```
GET /news                       # Tutte le news aggregate
GET /news/coindesk             # News da CoinDesk
GET /news/theblock             # News da The Block
GET /sources                   # Lista fonti disponibili
```

## 🔧 Configuration

### Environment Variables

`.env.local`:
```env
NEWS_SERVICE_URL=http://localhost:8001
```

## 📱 Features Dettagliate

### Dashboard Home
- Grid responsive con top 12 crypto
- Mini sparkline charts per trend 7 giorni
- News feed con ultime 6 notizie
- Call-to-action per pagine complete

### Pagina Prezzi
- Tabella completa top 100 crypto
- Sorting e filtering
- Link diretti a pagine dettaglio
- Dati real-time: prezzo, market cap, volume, variazioni

### Pagina Dettaglio Crypto
- Header con info crypto
- Toggle tra Area Chart e Candlestick
- Stats dettagliate (ATH, supply, rank, etc.)
- Animazioni smooth al cambio grafico

### Pagina News
- Grid layout responsive
- Categorizzazione articoli
- Links esterni a fonti originali
- Timestamp relativo (2h ago, 1d ago, etc.)

## 🎨 Design System

### Colori
- **Primary Green**: `#00C805` (Robinhood green)
- **Background**: `#0F0F0F` (Dark)
- **Card**: `#1E1E1E` (Gray)
- **Accent**: `#2A2A2A` (Light gray)

### Typography
- Font: Inter (Google Fonts)
- Scale: Responsive typography

### Components
- Smooth transitions (0.3s ease)
- Hover effects
- Skeleton loading states
- Toast notifications ready

## 🚀 Deployment

### Vercel (Consigliato)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t cryptohub .
docker run -p 3000:3000 cryptohub
```

## 🔮 Future Enhancements

- [ ] WebSocket per aggiornamenti real-time
- [ ] Portfolio tracking utente
- [ ] Price alerts personalizzati
- [ ] Social sentiment analysis
- [ ] Mobile app (React Native)
- [ ] Advanced technical indicators
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## 📄 License

MIT License - feel free to use this project for learning and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

Per domande o supporto, apri una issue su GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and Python**
