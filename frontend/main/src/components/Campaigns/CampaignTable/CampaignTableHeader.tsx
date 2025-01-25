import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../../utils/classNames';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface CampaignTableHeaderProps {
  columns: Column[];
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc' | null;
  };
  onSort: (key: string) => void;
}

export default function CampaignTableHeader({
  columns,
  sortConfig,
  onSort,
}: CampaignTableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {column.sortable ? (
              <button
                onClick={() => onSort(column.key)}
                className="group inline-flex items-center space-x-1"
              >
                <span>{column.label}</span>
                <span className="flex flex-col">
                  <ChevronUp
                    className={cn(
                      'h-3 w-3',
                      sortConfig.key === column.key && sortConfig.direction === 'asc'
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    )}
                  />
                  <ChevronDown
                    className={cn(
                      'h-3 w-3 -mt-1',
                      sortConfig.key === column.key && sortConfig.direction === 'desc'
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    )}
                  />
                </span>
              </button>
            ) : (
              <span>{column.label}</span>
            )}
          </th>
        ))}
        <th scope="col" className="relative px-6 py-3">
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
}