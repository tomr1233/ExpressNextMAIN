import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc' | null;
}

interface TableHeaderProps {
  label: string;
  sortKey: string;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export default function TableHeader({ label, sortKey, sortConfig, onSort }: TableHeaderProps) {
  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <span className="flex flex-col">
          <ChevronUp
            className={`h-3 w-3 ${
              sortConfig.key === sortKey && sortConfig.direction === 'asc'
                ? 'text-gray-700'
                : 'text-gray-400'
            }`}
          />
          <ChevronDown
            className={`h-3 w-3 -mt-1 ${
              sortConfig.key === sortKey && sortConfig.direction === 'desc'
                ? 'text-gray-700'
                : 'text-gray-400'
            }`}
          />
        </span>
      </div>
    </th>
  );
}