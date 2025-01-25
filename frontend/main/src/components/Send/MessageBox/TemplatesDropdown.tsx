import React from 'react';

interface TemplatesDropdownProps {
  onSelect: (template: string) => void;
  onClose: () => void;
}

export default function TemplatesDropdown({ onSelect, onClose }: TemplatesDropdownProps) {
  const templates = [
    {
      id: '1',
      name: 'Welcome Message',
      content: 'Hi {firstName}, welcome to our platform!',
    },
    {
      id: '2',
      name: 'Appointment Reminder',
      content: 'Hi {firstName}, this is a reminder about your upcoming appointment.',
    },
  ];

  return (
    <div className="py-1" role="menu">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.content)}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          role="menuitem"
        >
          <div className="font-medium text-gray-900">{template.name}</div>
          <div className="text-gray-500 truncate">{template.content}</div>
        </button>
      ))}
    </div>
  );
}