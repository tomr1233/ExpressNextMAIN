import type { PriceType } from '../types/pricing';

const roundToNearest5Down = (num: number): number => {
  return Math.floor(num / 5) * 5;
};

export const calculatePrice = (price: PriceType, isAnnual: boolean): number => {
  if (typeof price === 'number') {
    // Legacy calculation: 10% discount for annual billing
    return isAnnual ? price : Math.round(price * 1.1);
  }
  
  const calculatedPrice = isAnnual ? price.yearly / 12 : price.monthly;
  return roundToNearest5Down(calculatedPrice);
};