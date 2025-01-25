import React from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import { FormField } from '../types/form';

interface FieldEditorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
}

export default function FieldEditor({ field, onUpdate, onDelete }: FieldEditorProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      {/* HEADER: Display the field's label (or fallback to type) */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <GripVertical className="w-5 h-5 text-gray-400 mr-2" />
          <span className="font-medium capitalize">
            {field.label || `${field.type} Field`}
          </span>
        </div>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* LABEL INPUT */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Label</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* PLACEHOLDER INPUT */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Placeholder
          </label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* OPTIONS (for select / radio) */}
        {(field.type === 'select' || field.type === 'radio') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Options (one per line)
            </label>
            <textarea
              value={field.options?.join('\n') || ''}
              onChange={(e) =>
                onUpdate({
                  options: e.target.value.split('\n').filter(Boolean),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
            />
          </div>
        )}

        {/* REQUIRED CHECKBOX */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id={`required-${field.id}`}
            checked={field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor={`required-${field.id}`}
            className="ml-2 block text-sm text-gray-900"
          >
            Required field
          </label>
        </div>

        {/* MIN / MAX LENGTH (for text / password) */}
        {(field.type === 'text' || field.type === 'password') && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Min Length
              </label>
              <input
                type="number"
                value={field.validation?.minLength || ''}
                onChange={(e) =>
                  onUpdate({
                    validation: {
                      ...field.validation,
                      minLength: parseInt(e.target.value) || undefined,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Length
              </label>
              <input
                type="number"
                value={field.validation?.maxLength || ''}
                onChange={(e) =>
                  onUpdate({
                    validation: {
                      ...field.validation,
                      maxLength: parseInt(e.target.value) || undefined,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
