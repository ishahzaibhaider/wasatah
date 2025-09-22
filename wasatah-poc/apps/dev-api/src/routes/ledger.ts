import { Router } from 'express';
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import crypto from 'crypto-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

// Paths
const DATA_DIR = join(__dirname, '../../data');
const LEDGER_FILE = join(DATA_DIR, 'ledger.json');
const SEED_FILE = join(DATA_DIR, 'ledger.seed.json');

// Ensure data directory exists
const ensureDataDir = () => {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
};

// Initialize ledger from seed data
const initializeLedger = () => {
  ensureDataDir();
  
  if (!existsSync(LEDGER_FILE)) {
    if (existsSync(SEED_FILE)) {
      // Copy seed data to ledger.json
      copyFileSync(SEED_FILE, LEDGER_FILE);
      console.log('📋 Initialized ledger from seed data');
    } else {
      // Create empty ledger if no seed file
      const emptyLedger = { events: [] };
      writeFileSync(LEDGER_FILE, JSON.stringify(emptyLedger, null, 2));
      console.log('📋 Created empty ledger');
    }
  }
};

// Validate ledger event structure
const validateLedgerEvent = (event: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!event.type || typeof event.type !== 'string') {
    errors.push('Event type is required and must be a string');
  }
  
  if (!event.actorId || typeof event.actorId !== 'string') {
    errors.push('Actor ID is required and must be a string');
  }
  
  if (!event.actorName || typeof event.actorName !== 'string') {
    errors.push('Actor name is required and must be a string');
  }
  
  if (!event.details || typeof event.details !== 'object') {
    errors.push('Event details are required and must be an object');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Generate SHA256 hash for event
const generateEventHash = (event: any): string => {
  const eventString = JSON.stringify({
    type: event.type,
    actorId: event.actorId,
    actorName: event.actorName,
    details: event.details,
    timestamp: event.timestamp
  });
  return '0x' + crypto.SHA256(eventString).toString();
};

// Generate unique ID
const generateEventId = (): string => {
  return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate signature
const generateSignature = (): string => {
  return `sig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// GET /api/ledger - Get all ledger events
router.get('/', (req, res) => {
  try {
    initializeLedger();
    const ledgerData = JSON.parse(readFileSync(LEDGER_FILE, 'utf8'));
    res.json(ledgerData);
  } catch (error) {
    console.error('Error reading ledger:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to read ledger',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/ledger/append - Add new ledger event with validation and atomic write
router.post('/append', (req, res) => {
  try {
    initializeLedger();
    
    // Validate event structure
    const validation = validateLedgerEvent(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid event data',
        details: validation.errors
      });
    }
    
    // Read current ledger
    const ledgerData = JSON.parse(readFileSync(LEDGER_FILE, 'utf8'));
    
    // Create new event with proper structure
    const timestamp = new Date().toISOString();
    const newEvent = {
      id: generateEventId(),
      type: req.body.type,
      timestamp,
      hash: '', // Will be set after creating the event
      actorId: req.body.actorId,
      actorName: req.body.actorName,
      details: req.body.details,
      signature: generateSignature(),
      blockNumber: 1000 + ledgerData.events.length,
      transactionIndex: 0
    };
    
    // Generate hash for the event
    newEvent.hash = generateEventHash(newEvent);
    
    // Atomically append to ledger
    ledgerData.events.unshift(newEvent); // Add to beginning for chronological order
    
    // Write back to file atomically
    writeFileSync(LEDGER_FILE, JSON.stringify(ledgerData, null, 2));
    
    console.log(`📝 Added ledger event: ${newEvent.type} by ${newEvent.actorName}`);
    
    res.status(201).json({
      success: true,
      data: newEvent,
      message: 'Event added successfully'
    });
    
  } catch (error) {
    console.error('Error appending to ledger:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to append event to ledger',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/ledger/reset - Reset ledger to seed data
router.post('/reset', (req, res) => {
  try {
    ensureDataDir();
    
    if (!existsSync(SEED_FILE)) {
      return res.status(404).json({
        success: false,
        error: 'Seed file not found',
        message: 'ledger.seed.json not found in data directory'
      });
    }
    
    // Copy seed data to ledger.json
    copyFileSync(SEED_FILE, LEDGER_FILE);
    
    // Read the reset ledger to return in response
    const ledgerData = JSON.parse(readFileSync(LEDGER_FILE, 'utf8'));
    
    console.log('🔄 Ledger reset to seed data');
    
    res.json({
      success: true,
      message: 'Ledger reset successfully',
      data: {
        events: ledgerData.events,
        count: ledgerData.events.length
      }
    });
    
  } catch (error) {
    console.error('Error resetting ledger:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset ledger',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { router as ledgerRoutes };