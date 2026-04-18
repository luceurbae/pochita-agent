# Pochita — BTC 15m Trader

Autonomous BTC trading agent that analyzes markets every 15 minutes and executes paper trades based on conviction filtering and rule-based risk management.

## Quick Start

```bash
# Install dependencies
npm install

# Development server (port 8081)
npm run dev

# Production build
npm run build
```

## URL

- **Splash/Entry:** http://localhost:8081/
- **Dashboard:** http://localhost:8081/main.html

## Features

- Multi-timeframe analysis (1m, 5m, 15m)
- AI conviction filtering (80%+ required)
- Price entry filter (< 50¢ trigger)
- Rule engine with hard skip conditions
- Paper trading simulation
- Real-time P&L tracking

## Strategy

Every 15 minutes on market open:
1. Wait 60 seconds for price stabilization
2. Analyze RSI, trend, buy pressure via Binance + Polymarket
3. Get AI verdict via OpenRouter
4. If conviction ≥ 80% and rules pass → enter trade
5. Monitor and take profit at 2×

## Risk Filters

- RSI: Skip if 45-55 (neutral) or >70
- Trend conflict: Skip if 15m and 5m disagree
- Buy pressure: UP requires ≥55%, DOWN requires ≤45%
- Price delta: Skip if < $5 movement

## Files

```
src/
├── index.html      # Main app (nav + dashboard)
├── index.mjs     # App logic
├── style.css    # Styles
├── homepage.html # Splash screen
└── homepage.mjs # Splash logic
```

## License

MIT — Not financial advice