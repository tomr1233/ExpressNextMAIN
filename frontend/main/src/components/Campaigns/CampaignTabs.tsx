import React from 'react';
import { cn } from '../../utils/classNames';

interface CampaignTabsProps {
  activeTab: 'all' | 'draft' | 'sent';
  onTabChange: (tab: 'all' | 'draft' | 'sent') => void;
  counts: {
    all: number;
    draft: number;
    sent: number;
  };
}

export default function CampaignTabs({ activeTab, onTabChange, counts }: CampaignTabsProps) {
  const tabs = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'draft', label: 'Draft', count: counts.draft },
    { id: 'sent', label: 'Sent', count: counts.sent },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as 'all' | 'draft' | 'sent')}
            className={cn(
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            {tab.label}
            <span className="ml-2 text-gray-400">({tab.count})</span>
          </button>
        ))}
      </nav>
    </div>
  );
}