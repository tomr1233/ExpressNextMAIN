export interface YearlyPricing {
    monthly: number;
    yearly: number;
  }
  
  export type PriceType = number | YearlyPricing;