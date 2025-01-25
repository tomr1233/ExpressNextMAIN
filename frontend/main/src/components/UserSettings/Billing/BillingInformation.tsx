import React from 'react';
import SettingsCard from '../SettingsCard';

export default function BillingInformation() {
  return (
    <SettingsCard
      title="Billing Information"
      description="Manage your billing details and address"
    >
      <div className="py-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tax ID</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter tax ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Billing Address</label>
          <textarea
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter billing address"
          />
        </div>
      </div>
    </SettingsCard>
  );
}
