import React from 'react';

interface PricingToggleProps {
  annualBilling: boolean;
  onBillingToggle: (value: boolean) => void;
}

export function PricingToggle({ 
  annualBilling, 
  onBillingToggle 
}: PricingToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-zinc-400">Annual billing</span>
      <button
        className={`w-12 h-6 rounded-full p-1 transition-colors ${
          annualBilling ? 'bg-blue-500' : 'bg-zinc-700'
        }`}
        onClick={() => onBillingToggle(!annualBilling)}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform ${
            annualBilling ? 'translate-x-6' : ''
          }`}
        />
      </button>
    </div>
  );
}