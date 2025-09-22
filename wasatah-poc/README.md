# Wasatah.app - Blockchain + AI Real Estate PoC

A monorepo containing the Wasatah.app proof-of-concept demonstrating NAFTA-style identity verification, digital ID issuance, buyer-seller-broker roles, impersonation detection, ZKP-like proof tags, and a JSON-backed blockchain explorer.

## 🏗️ Project Structure

```
wasatah-poc/
├── apps/
│   ├── web/          # React 18 + Vite + TypeScript + Tailwind + React Router + Zustand
│   └── dev-api/      # Node 20 + Express 4 API server
├── package.json      # Root package.json with npm workspaces
└── README.md
```

## 🚀 Quick Start


### Prerequisites
- Node.js 20+
- npm 9+

### Installation
```bash
# Install all dependencies
npm install

# Start both development servers
npm run dev

# Or start individually
npm run dev:web    # Frontend on http://localhost:5173
npm run dev:api    # API on http://localhost:3001
```

## 📱 Web Application (apps/web)

**Tech Stack:**
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Zustand for state management

**Routes:**
- `/` - Login page
- `/login` - Login page
- `/role` - Role selection (Buyer/Seller/Broker)
- `/seller` - Seller dashboard
- `/broker` - Broker dashboard
- `/buyer` - Buyer dashboard
- `/explorer` - Blockchain explorer
- `/about-zk` - About Zero-Knowledge Proofs

**Features:**
- Top bar with logo and navigation
- Reset functionality for demo
- Role-based dashboards
- Property listings with verification badges
- Offer submission system
- Blockchain transaction explorer

## 🔧 Development API (apps/dev-api)

**Tech Stack:**
- Node.js 20 with TypeScript
- Express 4 for web framework
- JSON file-based ledger storage

**Endpoints:**
- `GET /api/ledger` - Get all ledger events
- `POST /api/ledger` - Add new ledger event
- `POST /api/ledger/reset` - Reset ledger to initial state
- `GET /health` - Health check

**Features:**
- CORS enabled for frontend integration
- Helmet for security headers
- Morgan for request logging
- JSON-based blockchain ledger simulation

## 🎯 Demo Flow

1. **Login** - Use demo credentials (demo@wasatah.app / demo123)
2. **Select Role** - Choose between Buyer, Seller, or Broker
3. **Explore Dashboard** - View role-specific functionality
4. **Make Transactions** - Submit offers, view properties, connect parties
5. **View Explorer** - See all blockchain transactions
6. **Reset Demo** - Clear all demo data

## 🛠️ Development Commands

```bash
# Root level commands
npm run dev          # Start both web and API
npm run build        # Build web application
npm run lint         # Lint all workspaces
npm run format       # Format code with Prettier

# Web app commands
npm run dev:web      # Start web dev server
npm run build:web    # Build web app
npm run lint --workspace=apps/web

# API commands
npm run dev:api      # Start API server
npm run build:api    # Build API
npm run lint --workspace=apps/dev-api
```

## 📋 Key Features

### Identity Verification (Simulated)
- NAFTA-style verification simulation
- Digital ID issuance
- ZKP-like proof tags (visual simulation)

### Role-Based System
- **Buyer**: Browse properties, make offers, track transactions
- **Seller**: Manage listings, view offers, ownership history
- **Broker**: Connect parties, facilitate transactions

### Blockchain Explorer
- JSON-backed transaction ledger
- Real-time transaction viewing
- Cryptographic hash simulation
- Transaction type categorization

### Impersonation Detection
- Alert-style risk assessment
- Simulated fraud detection
- Risk indicator banners

## 🔒 Security Notes

- This is a **Proof of Concept** - no real authentication or blockchain
- All data is synthetic and stored locally
- No sensitive information is processed
- ZKP features are visual simulations only

## 📅 Timeline

**Target**: Ship by September 28, 2024

**Current Phase**: Bootstrap & Core Setup (Phase 0.1)

## 🎨 Design System

- **Primary Colors**: Blue palette (primary-50 to primary-900)
- **Secondary Colors**: Gray palette (secondary-50 to secondary-900)
- **Typography**: System fonts with TailwindCSS
- **Layout**: Desktop-first responsive design
- **Components**: Reusable TailwindCSS components

## 📚 Documentation

- [Project Brief](../PROJECT_BRIEF.md) - Complete project requirements
- [Implementation Plan](../IMPLEMENTATION_PLAN.md) - 18-phase development plan

---

**Status**: ✅ Phase 0.1 Complete - Monorepo & Web App Bootstraped
