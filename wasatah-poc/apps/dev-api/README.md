# Dev API - Wasatah.app

Development API server for the Wasatah.app blockchain real estate PoC.

## Quick Start

```bash
# Install dependencies
npm install

# Setup seed data (first time only)
npm run setup

# Start development server
npm run dev
```

## API Endpoints

### Health Check
- **GET** `/health` - General health check
- **GET** `/api/ledger/health` - Ledger service health check

### Ledger Operations
- **GET** `/api/ledger` - Get all ledger events
- **POST** `/api/ledger/append` - Add new ledger event (with validation)
- **POST** `/api/ledger/reset` - Reset ledger to seed data

## Ledger Event Structure

```json
{
  "type": "user_registered|identity_verification|property_listed|offer_made|transaction_completed|impersonation_detected",
  "actorId": "string",
  "actorName": "string", 
  "details": {
    // Event-specific data
  }
}
```

## Features

- ✅ **CORS Enabled** - Configured for localhost:5173 (Vite dev server)
- ✅ **Event Validation** - Validates event structure before appending
- ✅ **SHA256 Signatures** - Computes cryptographic hashes for events
- ✅ **Atomic Writes** - Ensures data consistency
- ✅ **Seed Data Management** - Easy reset to initial state
- ✅ **TypeScript** - Full type safety
- ✅ **Error Handling** - Comprehensive error responses

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run setup` - Copy seed data to ledger.json (first run)
- `npm run reset` - Reset ledger via API call
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Configuration

- **Port**: 3001 (configurable via PORT env var)
- **CORS**: Enabled for localhost:5173 and 127.0.0.1:5173
- **Data Directory**: `./data/`
- **Seed File**: `./data/ledger.seed.json`
- **Ledger File**: `./data/ledger.json`

## Example Usage

```bash
# Get all events
curl http://localhost:3001/api/ledger

# Add new event
curl -X POST http://localhost:3001/api/ledger/append \
  -H "Content-Type: application/json" \
  -d '{
    "type": "user_registered",
    "actorId": "user_001",
    "actorName": "John Doe",
    "details": {"email": "john@example.com"}
  }'

# Reset ledger
curl -X POST http://localhost:3001/api/ledger/reset
```

## Development Notes

- Server automatically initializes ledger from seed data on first run
- All events are validated before being appended
- SHA256 hashes are computed for blockchain simulation
- Events are stored in chronological order (newest first)
- Comprehensive error handling with detailed messages
