import React from 'react';
import { Crown } from 'lucide-react';

interface CurrentPlanProps {
  planName?: string;
}

export function CurrentPlan({ planName = 'Starter Plan (Free)' }: CurrentPlanProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 px-4 inline-flex items-center gap-2">
      <Crown size={16} className="text-yellow-500" />
      <span className="text-sm">Current Plan: <span className="font-semibold">{planName}</span></span>
    </div>
  );
}