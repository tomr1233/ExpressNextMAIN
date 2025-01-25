import React, { useEffect, useState } from 'react'; // Added useState import
import SettingsCard from '../SettingsCard';
import { getAuth } from 'firebase/auth';

export default function BillingOverview() {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <>
      {showBanner && (
        <div className="bg-red-500 text-white text-center py-2">
          Wallet has no balance. <a href="/pay">Add balance to your wallet</a> to continue using paid services on your account.
        </div>
      )}
      <SettingsCard
        title="Billing Overview"
        description="View your current plan and usage"
      >
        <div className="py-4 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-blue-900">Current Plan: Starter</h4>
                <p className="mt-1 text-sm text-blue-700"></p>
              </div>
              <button className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-300 hover:bg-blue-50">
                <a href="https://payments.expressnext.app">Change Plan</a>
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500">Messages Sent</div>
              <div className="mt-1 text-2xl font-semibold">0</div>
              <div className="mt-1 text-xs text-gray-500">of 0 included</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500">ExpressNext Executions</div>
              <div className="mt-1 text-2xl font-semibold">0</div>
              <div className="mt-1 text-xs text-gray-500">of 0 included</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500">Total Campaigns</div>
              <div className="mt-1 text-2xl font-semibold">0</div>
              <div className="mt-1 text-xs text-gray-500">of 3 included</div>
            </div>
          </div>
        </div>
      </SettingsCard>
    </>
  );
}
