import React from 'react';
import { Plus } from 'lucide-react';

interface CampaignHeaderProps {
  onCreateCampaign: () => void;
}

export default function CampaignHeader({ onCreateCampaign }: CampaignHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and monitor all your marketing campaigns in one place.
        </p>
      </div>
      <button
        onClick={onCreateCampaign}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
        Create Campaign
      </button>
    </div>
  );
}