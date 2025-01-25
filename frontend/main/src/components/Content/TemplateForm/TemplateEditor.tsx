import React from 'react';
import { TemplateType } from '../../../types/template';

interface TemplateEditorProps {
  type: TemplateType;
  content: string;
  onChange: (content: string) => void;
}

export default function TemplateEditor({
  type,
  content,
  onChange,
}: TemplateEditorProps) {
  const handleInsertTag = (tag: string) => {
    onChange(content + `{${tag}}`);
  };

  return (
    <div className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Type your template content here..."
      />
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-gray-500">Insert:</span>
        <button
          type="button"
          onClick={() => handleInsertTag('firstName')}
          className="text-blue-600 hover:text-blue-800"
        >
          First Name
        </button>
        <button
          type="button"
          onClick={() => handleInsertTag('lastName')}
          className="text-blue-600 hover:text-blue-800"
        >
          Last Name
        </button>
        <button
          type="button"
          onClick={() => handleInsertTag('email')}
          className="text-blue-600 hover:text-blue-800"
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => handleInsertTag('company')}
          className="text-blue-600 hover:text-blue-800"
        >
          Company
        </button>
      </div>
    </div>
  );
}