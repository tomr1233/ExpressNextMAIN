import React from 'react';
import { Search, Calendar, Download, Plus, Filter } from 'lucide-react';

interface CampaignToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onFilter: () => void;
  onExport: () => void;
  onCreateCampaign: () => void;
}

export default function CampaignToolbar({
  search,
  onSearchChange,
  onFilter,
  onExport,
  onCreateCampaign,
}: CampaignToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search campaigns..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={onFilter}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
        
        <button
          onClick={onExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
        
        <button
          onClick={onCreateCampaign}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </button>
      </div>
    </div>
  );
}