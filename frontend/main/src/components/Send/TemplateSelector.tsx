import React from 'react';
import { MessageTemplate, MessageType } from '../../types/message';
import { Plus } from 'lucide-react';

interface TemplateSelectorProps {
  type: MessageType;
  onSelectTemplate: (template: MessageTemplate) => void;
  onCreateTemplate: () => void;
}

export default function TemplateSelector({
  type,
  onSelectTemplate,
  onCreateTemplate,
}: TemplateSelectorProps) {
  // Mock templates - replace with API call
  const templates: MessageTemplate[] = [
    {
      id: '1',
      name: 'Welcome Message',
      type: 'email',
      content: 'Welcome {firstName}! Were excited to have you on board.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Add more mock templates as needed
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Message Templates</h3>
        <button
          onClick={onCreateTemplate}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates
          .filter((template) => template.type === type)
          .map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {template.content}
              </p>
            </button>
          ))}
      </div>
    </div>
  );
}