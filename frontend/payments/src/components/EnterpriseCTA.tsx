import React from 'react';
import { Building2 } from 'lucide-react';

export function EnterpriseCTA() {
  return (
    <div className="text-center mt-16">
      <div className="flex justify-center mb-2">
        <Building2 size={24} className="text-zinc-400" />
      </div>
      <p className="mb-2">
        Looking for <span className="font-semibold">Enterprise plans</span>?
      </p>
      <a href="#" className="text-blue-400 hover:text-blue-300">
        Contact us for a quote
      </a>
    </div>
  );
}