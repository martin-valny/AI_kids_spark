import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not configured. Payment features will be disabled.');
}

export const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// Pricing configuration
export const PRICING = {
  monthly: {
    id: 'monthly',
    name: 'Monthly',
    price: 9.99,
    interval: 'month' as const,
    priceId: import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID || 'price_monthly',
    features: [
      'Unlimited access to all lessons',
      'All interactive projects',
      'Progress tracking & certificates',
      'Priority support',
      'New content as it releases',
    ],
  },
  yearly: {
    id: 'yearly',
    name: 'Yearly',
    price: 99.99,
    interval: 'year' as const,
    priceId: import.meta.env.VITE_STRIPE_YEARLY_PRICE_ID || 'price_yearly',
    savings: '17%',
    features: [
      'Everything in Monthly',
      'Save 17% compared to monthly',
      'Exclusive yearly member content',
      'Early access to new features',
    ],
  },
} as const;

// Free tier features
export const FREE_FEATURES = [
  'Access to introductory lessons',
  'Basic AI concepts',
  'Limited interactive games',
  'Community support',
];

// Premium-only lesson IDs
export const PREMIUM_LESSONS = [
  'machine-learning-basics',
  'data-and-patterns',
  'image-recognition',
  'simple-algorithms',
  'music-and-ai',
  'future-of-ai',
];

// Premium-only project IDs
export const PREMIUM_PROJECTS = [
  'music-ai-creator',
  'ai-art-studio',
  'build-chatbot',
  'ai-video-magic',
];

export type PricingPlan = keyof typeof PRICING;
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'inactive';

export interface Subscription {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  priceId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
}
