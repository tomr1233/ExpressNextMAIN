import React from 'react';

interface SettingsTabsProps {
  activeTab: 'account' | 'billing' | 'preferences';
  onTabChange: (tab: 'account' | 'billing' | 'preferences') => void;
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange('account')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'account'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Account Settings
        </button>
        <button
          onClick={() => onTabChange('billing')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'billing'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Billing & Payments
        </button>
        <button
          onClick={() => onTabChange('preferences')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'preferences'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Preferences
        </button>
      </nav>
    </div>
  );
}