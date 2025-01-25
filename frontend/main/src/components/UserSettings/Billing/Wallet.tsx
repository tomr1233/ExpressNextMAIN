import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import SettingsCard from '../SettingsCard';

export default function Wallet() {
  return (
    <SettingsCard
      title="Payment Methods"
      description="Manage your payment methods and wallet"
    >
      <div className="py-4 space-y-4">
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">•••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/24</p>
              </div>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
          </div>
        </div>

        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Plus className="h-5 w-5 mr-2" />
          Add Payment Method
        </button>
      </div>
    </SettingsCard>
  );
}