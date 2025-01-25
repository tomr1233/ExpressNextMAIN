import React from 'react';
import { Search } from 'lucide-react';
import { TemplateStatus } from '../../../types/template';

interface TemplateListHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedStatus: TemplateStatus | '';
  onStatusChange: (status: TemplateStatus | '') => void;
}

export default function TemplateListHeader({
  search,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}: TemplateListHeaderProps) {
  return (
    <div className="bg-white px-6 py-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value as TemplateStatus | '')}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </div>
  );
}