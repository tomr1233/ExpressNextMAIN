import React from 'react';
import { Plus } from 'lucide-react';
import { TemplateType } from '../../types/template';

interface ContentHeaderProps {
  activeTab: TemplateType;
  onTabChange: (tab: TemplateType) => void;
  onCreateTemplate: () => void;
}

export default function ContentHeader({
  activeTab,
  onTabChange,
  onCreateTemplate,
}: ContentHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your message and email templates
          </p>
        </div>
        <button
          onClick={onCreateTemplate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => onTabChange('message')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'message'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Message Templates
          </button>
        </nav>
      </div>
    </div>
  );
}