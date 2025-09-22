// Data utility helpers for Wasatah.app PoC
import type { User, Property, LedgerEvent, Offer, RiskFlag } from '../types/models';

// Import seed data
import usersSeed from '../data/users.json';
import propertiesSeed from '../data/property.json';
import ledgerSeed from '../data/ledger.seed.json';

// Type definitions for seed data
type SeedData = {
  users: User[];
  properties: Property[];
  ledgerEvents: LedgerEvent[];
};

// Deep clone utility function
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}

// Load seed data at runtime
export function loadSeedData(): SeedData {
  return {
    users: deepClone(usersSeed as User[]),
    properties: deepClone(propertiesSeed as Property[]),
    ledgerEvents: deepClone(ledgerSeed as LedgerEvent[]),
  };
}

// Clone seed objects for in-memory editing
export function cloneSeedUsers(): User[] {
  return deepClone(usersSeed as User[]);
}

export function cloneSeedProperties(): Property[] {
  return deepClone(propertiesSeed as Property[]);
}

export function cloneSeedLedgerEvents(): LedgerEvent[] {
  return deepClone(ledgerSeed as LedgerEvent[]);
}

// Generate unique IDs
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Generate blockchain-like hash
export function generateHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

// Generate signature
export function generateSignature(): string {
  return `sig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create new ledger event
export function createLedgerEvent(
  type: LedgerEvent['type'],
  actorId: string,
  actorName: string,
  details: Record<string, any>
): LedgerEvent {
  return {
    id: generateId('tx'),
    type,
    timestamp: new Date().toISOString(),
    hash: generateHash(),
    actorId,
    actorName,
    details,
    signature: generateSignature(),
    blockNumber: 1000 + Math.floor(Math.random() * 1000),
    transactionIndex: Math.floor(Math.random() * 10),
  };
}

// Create new offer
export function createOffer(
  propertyId: string,
  buyerId: string,
  buyerName: string,
  amount: number,
  message?: string
): Offer {
  return {
    id: generateId('offer'),
    propertyId,
    buyerId,
    buyerName,
    amount,
    currency: 'SAR',
    message,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
  };
}

// Create new risk flag
export function createRiskFlag(
  userId: string,
  type: RiskFlag['type'],
  severity: RiskFlag['severity'],
  description: string,
  metadata: Record<string, any> = {}
): RiskFlag {
  return {
    id: generateId('risk'),
    userId,
    type,
    severity,
    description,
    detectedAt: new Date().toISOString(),
    isActive: true,
    metadata,
  };
}

// Find user by ID
export function findUserById(users: User[], userId: string): User | undefined {
  return users.find(user => user.id === userId);
}

// Find user by email
export function findUserByEmail(users: User[], email: string): User | undefined {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

// Find property by ID
export function findPropertyById(properties: Property[], propertyId: string): Property | undefined {
  return properties.find(property => property.id === propertyId);
}

// Find offers by property ID
export function findOffersByPropertyId(offers: Offer[], propertyId: string): Offer[] {
  return offers.filter(offer => offer.propertyId === propertyId);
}

// Find offers by buyer ID
export function findOffersByBuyerId(offers: Offer[], buyerId: string): Offer[] {
  return offers.filter(offer => offer.buyerId === buyerId);
}

// Find ledger events by type
export function findLedgerEventsByType(events: LedgerEvent[], type: LedgerEvent['type']): LedgerEvent[] {
  return events.filter(event => event.type === type);
}

// Find ledger events by actor ID
export function findLedgerEventsByActor(events: LedgerEvent[], actorId: string): LedgerEvent[] {
  return events.filter(event => event.actorId === actorId);
}

// Get recent ledger events
export function getRecentLedgerEvents(events: LedgerEvent[], limit: number = 10): LedgerEvent[] {
  return events
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

// Check for duplicate phone numbers
export function checkDuplicatePhone(users: User[], phone: string, excludeUserId?: string): User | null {
  return users.find(user => 
    user.phone === phone && 
    user.id !== excludeUserId
  ) || null;
}

// Check for duplicate emails
export function checkDuplicateEmail(users: User[], email: string, excludeUserId?: string): User | null {
  return users.find(user => 
    user.email.toLowerCase() === email.toLowerCase() && 
    user.id !== excludeUserId
  ) || null;
}

// Validate user data
export function validateUser(user: Partial<User>): string[] {
  const errors: string[] = [];
  
  if (!user.email || !user.email.includes('@')) {
    errors.push('Valid email is required');
  }
  
  if (!user.name || user.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!user.phone || !user.phone.startsWith('+966')) {
    errors.push('Valid Saudi phone number is required');
  }
  
  if (!user.role || !['buyer', 'seller', 'broker'].includes(user.role)) {
    errors.push('Valid role is required');
  }
  
  return errors;
}

// Validate property data
export function validateProperty(property: Partial<Property>): string[] {
  const errors: string[] = [];
  
  if (!property.title || property.title.trim().length < 5) {
    errors.push('Property title must be at least 5 characters');
  }
  
  if (!property.address || property.address.trim().length < 10) {
    errors.push('Valid address is required');
  }
  
  if (!property.price || property.price <= 0) {
    errors.push('Valid price is required');
  }
  
  if (!property.area || property.area <= 0) {
    errors.push('Valid area is required');
  }
  
  if (!property.bedrooms || property.bedrooms < 1) {
    errors.push('At least 1 bedroom is required');
  }
  
  if (!property.bathrooms || property.bathrooms < 1) {
    errors.push('At least 1 bathroom is required');
  }
  
  return errors;
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'SAR'): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

// Calculate risk score based on various factors
export function calculateRiskScore(user: User, allUsers: User[]): number {
  let riskScore = 0;
  
  // Check for duplicate phone
  if (checkDuplicatePhone(allUsers, user.phone || '', user.id)) {
    riskScore += 40;
  }
  
  // Check for duplicate email
  if (checkDuplicateEmail(allUsers, user.email, user.id)) {
    riskScore += 30;
  }
  
  // Check verification status
  if (!user.digitalId?.verified) {
    riskScore += 25;
  }
  
  // Check if user is new (less than 24 hours)
  const userAge = Date.now() - new Date(user.createdAt).getTime();
  if (userAge < 24 * 60 * 60 * 1000) {
    riskScore += 15;
  }
  
  // Check for suspicious email patterns
  if (user.email.includes('test') || user.email.includes('demo') || user.email.includes('fake')) {
    riskScore += 20;
  }
  
  return Math.min(riskScore, 100);
}

// Export seed data for direct access
export const seedData = {
  users: usersSeed as User[],
  properties: propertiesSeed as Property[],
  ledgerEvents: ledgerSeed as LedgerEvent[],
};
