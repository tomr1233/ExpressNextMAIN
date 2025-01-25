import type { PriceType } from '../types/pricing';

export interface PricingPlan {
  title: string;
  tokens: string;
  basePrice: PriceType;
  features: string[];
  buttonText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    title: 'Standard',
    tokens: '1M tokens',
    basePrice: {
      monthly: 40,
      yearly: 440
    },
    features: [
      '1000 Monthly SMS Cap',
      '3 Total Campaigns',
      'Self/Basic Service',
      '25 Monthly ExpressNext Executions'
    ],
    buttonText: 'Upgrade to Standard'
  },
  {
    title: 'Standard 50',
    tokens: '10M tokens',
    basePrice: {
      monthly: 200,
      yearly: 2200
    },
    features: [
      'No SMS Cap',
      '10 Total Campaigns',
      'Self/Basic Service',
      'Unlimited team members',
      '500 Monthly ExpressNext Executions'
    ],
    buttonText: 'Upgrade to Standard 50'
  },
  {
    title: 'Pro',
    tokens: '55M tokens',
    basePrice: {
      monthly: 600,
      yearly: 6000
    },
    features: [
      '50 Active Campaigns',
      'Full Service',
      'Dedicated onboarding',
      '2000 Monthly ExpressNext Executions'
    ],
    buttonText: 'Upgrade to Pro'
  },
  {
    title: 'Pro 50',
    tokens: '120M tokens',
    basePrice: {
      monthly: 6000,
      yearly: 60000
    },
    features: [
      '100 Active Campaigns',
      'Exclusive VPC access',
      'Senior support team',
      'Custom solutions',
      '10000 Monthly ExpressNext Executions'
    ],
    buttonText: 'Upgrade to Pro 50'
  }
];