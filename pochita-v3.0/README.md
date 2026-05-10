# Porchita v3.0

Porchita is an AI-powered trading agent for Polymarket BTC prediction markets. This version is a sanitized and refactored evolution from Pochita v2.6/v5 for further development.

## ✨ New Feature: Binance Chart Vision Trading ⭐ RECOMMENDED

Porchita v3.0 uses **AI Vision** to analyze BTC charts from **Binance candlestick charts**, then enters trades on **Polymarket**!

### Why Binance Chart?
- ✅ Real candlestick chart (not line chart)
- ✅ Complete data (OHLCV, volume)
- ✅ Better for technical analysis
- ✅ 15m timeframe available

### Flow

1. **Slot Opens** → Wait 3 minutes
2. **Capture Binance Chart** → Screenshot BTC/USDT 15m candlestick
3. **AI Vision Analysis** → AI analyzes patterns & trend
4. **Enter on Polymarket** → If odds < $0.50

### Available Modes

| Mode | Chart Source | Command |
|------|--------------|---------|
| **Binance Vision** ⭐ | Binance candlestick | `npm run start:binance` |
| Data-Based | Numerical data | `npm start` |
| Polymarket Vision | Polymarket line chart | `npm run start:vision` |

## Core Concept

Porchita uses a **sniper trading** strategy with strict filters:

- **AI Vision Analysis** - Chart analysis from images (NEW!)
- **Multi-timeframe analysis** (15m trend, 5m momentum, 1m timing)
- **AI Conviction scoring** via OpenRouter
- **Expected Value (EV) calculation**
- **Hard skip rules** to avoid low-quality setups
- **Automated position management** with take profit target

## Philosophy

> **Quality over quantity. Skipping is also a position.**

## Entry Rules (Vision Mode)

| Filter | Value | Description |
|--------|-------|-------------|
| Wait Time | 3 minutes | Let the chart develop first |
| Chart Analysis | AI Vision | Candlestick image analysis |
| Conviction | ≥ 70% | Minimum AI confidence |
| Odds | < $0.50 | Value filter - look for low odds |
| EV | > 0 | Expected value must be positive |

## Project Structure

```
pochita-v3.0/
├── scripts/
│   ├── pochita-vision-trader.js   # 🆕 Main vision trading (RECOMMENDED)
│   ├── chart-capture.js            # 🆕 Chart screenshot capture
│   ├── vision-analyze.js           # 🆕 AI vision analysis
│   ├── pochita-auto.js             # Legacy auto-trading (data-based)
│   ├── ai-analyze.js               # Legacy AI prediction
│   ├── binance-analyzer.js         # BTC technical analysis
│   ├── polymarket-fetcher.js       # Polymarket data fetcher
│   ├── smart-finalize.js           # Position finalization
│   ├── test-vision.js              # 🆕 Test vision analysis
│   └── inspect-polymarket.js       # 🆕 Debug page structure
├── logs/                           # Data & activity logs
├── references/                     # Documentation
│   ├── STRATEGY_v3.0.md
│   └── VISION_STRATEGY.md          # 🆕 Vision trading docs
├── .env                            # API keys (git-ignored)
├── .env.example                    # Environment template
├── package.json
└── README.md
```

## Installation

```bash
cd pochita-v3.0
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in API keys:
```bash
# Required
OPENROUTER_API_KEY=your_key_here

# Optional (for live trading)
POLY_BUILDER_API_KEY=your_key_here
POLY_RELAYER_API_KEY=your_key_here

# Optional (for notifications)
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## Usage

### 🆕 Binance Chart Vision (RECOMMENDED)

```bash
# Start Binance chart vision trader
npm run start:binance

# Or directly:
node scripts/pochita-binance-trader.js
```

### Test Binance Chart + Vision

```bash
# Test chart capture + AI analysis
node scripts/test-binance-vision.js
```

### Data-Based Mode (elephant-alpha)

```bash
# Data-based auto-trading
npm start

# Manual analysis
node scripts/ai-analyze.js <market-url>
```

### Legacy Vision Mode (Polymarket line chart)

```bash
# Polymarket chart vision (line chart only)
npm run start:vision
```

### Check Position Status

```bash
# Vision mode
ls -la logs/chart-*.png
cat logs/vision-trades.json
cat logs/vision-trader-state.json

# Legacy mode
cat logs/paper-trading.json
```

## Vision Trading Flow Diagram

```
Slot Opens
    │
    ▼
Wait 3 Minutes
    │
    ▼
Capture Chart
    │
    ▼
AI Vision Analysis ──Conviction < 70%──► SKIP
    │
    ▼
Monitor Odds < $0.50
    │
    ├─ Odds < $0.50 ──► ENTRY
    │
    └─ Timeout (11 min) ──► SKIP (Price Too High)
```

## Data Sources

- **Binance Chart** - Candlestick images for AI vision analysis 🆕
- **Polymarket API** - Market odds, token IDs, end times
- **Binance API** - BTC price, OHLCV, RSI (legacy mode)
- **OpenRouter AI** - Vision model for image analysis

## AI Vision Model

Default: `google/gemini-2.0-flash-exp:free`

Can be changed in `.env`:
```env
VISION_MODEL=openrouter/anthropic/claude-3-opus-20240229
```

## State Files (Vision Mode)

| File | Description |
|------|-------------|
| `logs/vision-trader-state.json` | Current state (slot, position, status) |
| `logs/vision-trades.json` | Trade history |
| `logs/chart-{slot}.png` | Captured chart images |

## Disclaimer

This project is experimental for research and testing purposes. Do your own validation before using in live trading.

---
*Refactored from Pochita by Reze Agent*
