import React from 'react';

interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onSave?: () => void;
  isSaving?: boolean;
  saveDisabled?: boolean;
}

export default function SettingsCard({
  title,
  description,
  children,
  onSave,
  isSaving,
  saveDisabled = false,
}: SettingsCardProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
          {onSave && (
            <button
              onClick={onSave}
              disabled={isSaving || saveDisabled}
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>
      <div className="px-6">{children}</div>
    </div>
  );
}