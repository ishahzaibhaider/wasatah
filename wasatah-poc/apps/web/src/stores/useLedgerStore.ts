import { create } from 'zustand';
import type { LedgerEvent, EventType } from '../types/models';
import { cloneSeedLedgerEvents, createLedgerEvent } from '../utils/data';

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load seed ledger events
      const seedEvents = cloneSeedLedgerEvents();
      
      set({
        events: seedEvents,
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new ledger event using utility function
      const newEvent = createLedgerEvent(type, actorId, actorName, details);
      
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
