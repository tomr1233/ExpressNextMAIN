import React from 'react';
import { Search } from 'lucide-react';

interface ContactsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedGroup: string;
  onGroupChange: (group: string) => void;
  dateRange: {
    start: string;
    end: string;
  };
  onDateRangeChange: (range: { start: string; end: string }) => void;
}

export default function ContactsFilters({
  search,
  onSearchChange,
  selectedGroup,
  onGroupChange,
  dateRange,
  onDateRangeChange,
}: ContactsFiltersProps) {
  // Mock groups - replace with API data
  const groups = [
    { id: '1', name: 'All Contacts' },
    { id: '2', name: 'VIP Customers' },
    { id: '3', name: 'Newsletter Subscribers' },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <select
          value={selectedGroup}
          onChange={(e) => onGroupChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            onDateRangeChange({ ...dateRange, start: e.target.value })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) =>
            onDateRangeChange({ ...dateRange, end: e.target.value })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}