import { create } from 'zustand';
import type { LedgerEvent, EventType } from '../types/models';

interface LedgerState {
  // State
  events: LedgerEvent[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadEvents: () => Promise<void>;
  addEvent: (type: EventType, actorId: string, actorName: string, details: Record<string, any>) => Promise<LedgerEvent>;
  getEventsByType: (type: EventType) => LedgerEvent[];
  getEventsByActor: (actorId: string) => LedgerEvent[];
  getRecentEvents: (limit?: number) => LedgerEvent[];
  clearEvents: () => void;
  clearError: () => void;
}

export const useLedgerStore = create<LedgerState>((set, get) => ({
  // Initial state
  events: [],
  isLoading: false,
  error: null,

  // Actions
  loadEvents: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Implement API call to load ledger events
      console.log('Loading ledger events...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock ledger events data
      const mockEvents: LedgerEvent[] = [
        {
          id: 'tx_001',
          type: 'property_listed',
          timestamp: '2024-09-22T10:30:00Z',
          hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
          actorId: 'user_002',
          actorName: 'Ahmed Al-Rashid',
          details: {
            property: 'Luxury Villa - Riyadh',
            price: 'SAR 2,800,000',
            propertyId: 'prop_001',
          },
          signature: 'sig_001',
          blockNumber: 1001,
          transactionIndex: 0,
        },
        {
          id: 'tx_002',
          type: 'offer_made',
          timestamp: '2024-09-22T14:15:00Z',
          hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
          actorId: 'user_001',
          actorName: 'Sarah Al-Mansouri',
          details: {
            propertyId: 'prop_001',
            amount: 'SAR 2,500,000',
            offerId: 'offer_001',
          },
          signature: 'sig_002',
          blockNumber: 1002,
          transactionIndex: 0,
        },
        {
          id: 'tx_003',
          type: 'identity_verification',
          timestamp: '2024-09-22T09:45:00Z',
          hash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
          actorId: 'user_001',
          actorName: 'Sarah Al-Mansouri',
          details: {
            method: 'NAFTA_SIM',
            status: 'verified',
            riskScore: 15,
          },
          signature: 'sig_003',
          blockNumber: 1000,
          transactionIndex: 1,
        },
        {
          id: 'tx_004',
          type: 'deed_verification',
          timestamp: '2024-09-22T08:20:00Z',
          hash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          actorId: 'system',
          actorName: 'Saudi Land Registry',
          details: {
            propertyId: 'prop_001',
            status: 'verified',
            authority: 'Saudi Land Registry',
          },
          signature: 'sig_004',
          blockNumber: 999,
          transactionIndex: 0,
        },
      ];
      
      set({
        events: mockEvents,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load ledger events',
      });
    }
  },

  addEvent: async (type: EventType, actorId: string, actorName: string, details: Record<string, any>) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Implement API call to add ledger event
      console.log('Adding ledger event:', type, actorId, actorName, details);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newEvent: LedgerEvent = {
        id: `tx_${Date.now()}`,
        type,
        timestamp: new Date().toISOString(),
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        actorId,
        actorName,
        details,
        signature: `sig_${Date.now()}`,
        blockNumber: 1000 + get().events.length,
        transactionIndex: 0,
      };
      
      const events = get().events;
      set({
        events: [newEvent, ...events], // Add to beginning for chronological order
        isLoading: false,
      });
      
      return newEvent;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to add ledger event',
      });
      throw error;
    }
  },

  getEventsByType: (type: EventType) => {
    return get().events.filter(e => e.type === type);
  },

  getEventsByActor: (actorId: string) => {
    return get().events.filter(e => e.actorId === actorId);
  },

  getRecentEvents: (limit: number = 10) => {
    return get().events.slice(0, limit);
  },

  clearEvents: () => {
    set({ events: [] });
  },

  clearError: () => {
    set({ error: null });
  },
}));
