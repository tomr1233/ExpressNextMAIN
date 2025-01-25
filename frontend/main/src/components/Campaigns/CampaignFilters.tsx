import React from 'react';
import { X } from 'lucide-react';
import { CampaignType, CampaignStatus } from '../../types/campaign';

interface Filters {
  types: CampaignType[];
  statuses: CampaignStatus[];
  dateRange: {
    start: string;
    end: string;
  };
}

interface CampaignFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function CampaignFilters({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: CampaignFiltersProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl">
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Filter Campaigns</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Campaign Type</h3>
                <div className="space-y-2">
                  {['email', 'sms', 'social'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(type as CampaignType)}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...filters.types, type as CampaignType]
                            : filters.types.filter((t) => t !== type);
                          onFiltersChange({ ...filters, types: newTypes });
                        }}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Status</h3>
                <div className="space-y-2">
                  {['active', 'draft', 'completed'].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.statuses.includes(status as CampaignStatus)}
                        onChange={(e) => {
                          const newStatuses = e.target.checked
                            ? [...filters.statuses, status as CampaignStatus]
                            : filters.statuses.filter((s) => s !== status);
                          onFiltersChange({ ...filters, statuses: newStatuses });
                        }}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Date Range</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-700">From</label>
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          dateRange: { ...filters.dateRange, start: e.target.value },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">To</label>
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          dateRange: { ...filters.dateRange, end: e.target.value },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>
                  onFiltersChange({
                    types: [],
                    statuses: [],
                    dateRange: { start: '', end: '' },
                  })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}