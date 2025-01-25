import React from 'react';
import { Bolt } from 'lucide-react';

interface PricingHeaderProps {
  tokensLeft: string;
  resetDays: number;
}

export function PricingHeader({ tokensLeft, resetDays }: PricingHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-5xl font-bold text-center mb-4">Pricing</h1>
      <p className="text-zinc-400 text-center text-lg max-w-2xl mx-auto mb-8">
        Start with a free account to speed up your workflow on public projects or boost 
        your entire team with instantly-opening production environments.
      </p>
      
      <div className="bg-zinc-900 rounded-lg p-4 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Bolt size={20} className="text-zinc-400" />
          <span className="font-semibold">{tokensLeft} tokens left.</span>
         {/* ADD THIS AFTER U INTEGRATE WITH STRIPE <span className="text-zinc-400">Reset to 0 in {resetDays} days.</span>*/}
        </div>
        <div className="flex items-center gap-2">
          <span>Need more tokens?</span>
          <a href="https://buy.stripe.com/6oE6rL5rTcklc7u9AA" className="text-blue-400 hover:text-blue-300">token reload</a>
        </div>
      </div>
    </div>
  );
}