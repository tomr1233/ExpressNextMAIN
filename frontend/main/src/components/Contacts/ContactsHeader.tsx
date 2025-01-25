import React from 'react';
import { Upload, Download, Plus } from 'lucide-react';

interface ContactsHeaderProps {
  totalContacts: number;
  onImport: () => void;
  onExport: () => void;
  onCreateContact: () => void;
}

export default function ContactsHeader({
  totalContacts,
  onImport,
  onExport,
  onCreateContact,
}: ContactsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="mt-1 text-sm text-gray-500">
            {totalContacts.toLocaleString()} total contacts
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onImport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </button>
          <button
            onClick={onExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={onCreateContact}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Contact
          </button>
        </div>
      </div>
    </div>
  );
}