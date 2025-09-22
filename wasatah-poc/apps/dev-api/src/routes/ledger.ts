import { Router } from 'express';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

// Path to the ledger JSON file
const LEDGER_FILE = join(__dirname, '../../data/ledger.json');

// Ensure data directory exists
const dataDir = join(__dirname, '../../data');
if (!existsSync(dataDir)) {
  // This will be handled by the seed data setup
}

// Initialize ledger if it doesn't exist
const initializeLedger = () => {
  const defaultLedger = {
    events: [
      {
        id: 'tx_001',
        type: 'Property Listed',
        timestamp: '2024-09-22T10:30:00Z',
        hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        details: {
          property: 'Luxury Villa - Riyadh',
          owner: 'Ahmed Al-Rashid',
          price: 'SAR 2,800,000'
        }
      },
      {
        id: 'tx_002',
        type: 'Identity Verification',
        timestamp: '2024-09-22T09:45:00Z',
        hash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        details: {
          user: 'Sarah Al-Mansouri',
          status: 'Verified',
          method: 'NAFTA-SIM'
        }
      },
      {
        id: 'tx_003',
        type: 'Deed Verification',
        timestamp: '2024-09-22T08:20:00Z',
        hash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        details: {
          property: 'Luxury Villa - Riyadh',
          status: 'Verified',
          authority: 'Saudi Land Registry'
        }
      }
    ]
  };

  if (!existsSync(LEDGER_FILE)) {
    writeFileSync(LEDGER_FILE, JSON.stringify(defaultLedger, null, 2));
  }
};

// GET /api/ledger - Get all ledger events
router.get('/', (req, res) => {
  try {
    initializeLedger();
    const ledgerData = JSON.parse(readFileSync(LEDGER_FILE, 'utf8'));
    res.json(ledgerData);
  } catch (error) {
    console.error('Error reading ledger:', error);
    res.status(500).json({ error: 'Failed to read ledger' });
  }
});

// POST /api/ledger - Add new ledger event
router.post('/', (req, res) => {
  try {
    initializeLedger();
    const ledgerData = JSON.parse(readFileSync(LEDGER_FILE, 'utf8'));
    
    const newEvent = {
      id: `tx_${Date.now()}`,
      timestamp: new Date().toISOString(),
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      ...req.body
    };

    ledgerData.events.unshift(newEvent); // Add to beginning
    writeFileSync(LEDGER_FILE, JSON.stringify(ledgerData, null, 2));
    
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error writing to ledger:', error);
    res.status(500).json({ error: 'Failed to write to ledger' });
  }
});

// POST /api/ledger/reset - Reset ledger to initial state
router.post('/reset', (req, res) => {
  try {
    initializeLedger();
    const defaultLedger = {
      events: [
        {
          id: 'tx_001',
          type: 'Property Listed',
          timestamp: '2024-09-22T10:30:00Z',
          hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
          details: {
            property: 'Luxury Villa - Riyadh',
            owner: 'Ahmed Al-Rashid',
            price: 'SAR 2,800,000'
          }
        },
        {
          id: 'tx_002',
          type: 'Identity Verification',
          timestamp: '2024-09-22T09:45:00Z',
          hash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
          details: {
            user: 'Sarah Al-Mansouri',
            status: 'Verified',
            method: 'NAFTA-SIM'
          }
        },
        {
          id: 'tx_003',
          type: 'Deed Verification',
          timestamp: '2024-09-22T08:20:00Z',
          hash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          details: {
            property: 'Luxury Villa - Riyadh',
            status: 'Verified',
            authority: 'Saudi Land Registry'
          }
        }
      ]
    };

    writeFileSync(LEDGER_FILE, JSON.stringify(defaultLedger, null, 2));
    res.json({ message: 'Ledger reset successfully', events: defaultLedger.events });
  } catch (error) {
    console.error('Error resetting ledger:', error);
    res.status(500).json({ error: 'Failed to reset ledger' });
  }
});

export { router as ledgerRoutes };
