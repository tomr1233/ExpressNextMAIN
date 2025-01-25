import React from 'react';
import SettingsCard from '../SettingsCard';

export default function EmailRecipient() {
  return (
    <SettingsCard
      title="Invoice Recipients"
      description="Manage who receives billing notifications and invoices"
    >
      <div className="py-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter email address"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Send a copy of each invoice to additional email
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter additional email address"
          />
        </div>
      </div>
    </SettingsCard>
  );
}