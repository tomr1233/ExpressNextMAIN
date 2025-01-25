import React from 'react';
import TableHeader from '../../Table/TableHeader';

interface ContactsTableHeaderProps {
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc' | null;
  };
  onSort: (key: string) => void;
}

export default function ContactsTableHeader({ sortConfig, onSort }: ContactsTableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        <TableHeader
          label="Contact"
          sortKey="firstName"
          sortConfig={sortConfig}
          onSort={onSort}
        />
        <TableHeader
          label="Email"
          sortKey="email"
          sortConfig={sortConfig}
          onSort={onSort}
        />
        <TableHeader
          label="Phone"
          sortKey="phone"
          sortConfig={sortConfig}
          onSort={onSort}
        />
        <TableHeader
          label="Created"
          sortKey="createdAt"
          sortConfig={sortConfig}
          onSort={onSort}
        />
        <th className="relative px-6 py-3">
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
}