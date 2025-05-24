// Types
export interface CompanyPolicy {
  windowDays: number;
  message: string;
  exceptions?: string[];
}

export interface CompanyPolicies {
  refund: CompanyPolicy;
  exchange: CompanyPolicy;
  return: CompanyPolicy;
  warranty: CompanyPolicy;
}

export interface CustomerMessage {
  id: number;
  text: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  category?: 'refund' | 'exchange' | 'technical' | 'shipping';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  warrantyPeriod: number; // in days
}

// Mock Data
export const companyPolicies: CompanyPolicies = {
  refund: {
    windowDays: 30,
    message: "Refunds are only allowed within 30 days of purchase.",
    exceptions: [
      "Defective items may be refunded within 60 days",
      "Digital products are non-refundable after download"
    ]
  },
  exchange: {
    windowDays: 60,
    message: "Exchanges are allowed within 60 days if the product is unopened.",
  },
  return: {
    windowDays: 45,
    message: "Free returns within 45 days for unused items.",
  },
  warranty: {
    windowDays: 365,
    message: "1-year manufacturer warranty on all electronics.",
  }
};

export const customerMessages: CustomerMessage[] = [
  {
    id: 1,
    text: "Hi, I bought a laptop from your store 40 days ago, but it's overheating. Can I get a refund?",
    sentiment: "negative",
    category: "refund"
  },
  {
    id: 2,
    text: "The shoes I ordered arrived damaged. I need a replacement ASAP!",
    sentiment: "negative",
    category: "exchange"
  },
  {
    id: 3,
    text: "Just wanted to say I'm really happy with my purchase! The quality is excellent.",
    sentiment: "positive",
    category: undefined
  },
  {
    id: 4,
    text: "How do I connect the wireless headphones to my device? The instructions weren't clear.",
    sentiment: "neutral",
    category: "technical"
  }
];

export const products: Product[] = [
  {
    id: "prod-1001",
    name: "UltraThin Laptop Pro",
    category: "electronics",
    warrantyPeriod: 365
  },
  {
    id: "prod-2002",
    name: "ComfortMax Running Shoes",
    category: "footwear",
    warrantyPeriod: 60
  },
  {
    id: "prod-3003",
    name: "NoiseCancel Wireless Headphones",
    category: "electronics",
    warrantyPeriod: 180
  }
];

// Helper Functions
export const findProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getPolicyForCategory = (category: keyof CompanyPolicies): CompanyPolicy => {
  return companyPolicies[category];
};

// Utility Types
export type SupportCategory = keyof CompanyPolicies;
export type Sentiment = CustomerMessage['sentiment'];