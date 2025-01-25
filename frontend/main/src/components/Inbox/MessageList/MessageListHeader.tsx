import React from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

interface MessageListHeaderProps {
  title: string;
  count: number;
  search: string;
  onSearchChange: (value: string) => void;
  sortDirection: 'asc' | 'desc';
  onSortChange: () => void;
  onFilterClick: () => void;
}

export default function MessageListHeader({
  title,
  count,
  search,
  onSearchChange,
  sortDirection,
  onSortChange,
  onFilterClick,
}: MessageListHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{count} messages</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onSortChange}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {sortDirection === 'asc' ? (
              <SortAsc className="h-5 w-5" />
            ) : (
              <SortDesc className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={onFilterClick}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}