
export interface Product {
  id: number;
  name: string;
  currentPrice: number;
  lastPrice: number;
  bestSupplier: string;
  trend: 'up' | 'down';
  savings: number;
  category: string;
}

export interface Supplier {
  name: string;
  products: number;
  avgPrice: number;
  reliability: number;
}

export interface Recommendation {
  type: 'buy' | 'wait';
  product: string;
  reason: string;
  savings: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface Filters {
  minPrice: string;
  maxPrice: string;
  supplier: string;
  trend: string;
}

export interface PriceDataPoint {
  date: string;
  supplier1: number;
  supplier2: number;
  supplier3: number;
}
