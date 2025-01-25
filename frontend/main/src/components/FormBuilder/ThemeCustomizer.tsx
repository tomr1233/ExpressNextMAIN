import React from 'react';
import { FormDesign } from '../types/form';

interface ThemeCustomizerProps {
  theme: FormDesign['theme'];
  onChange: (theme: FormDesign['theme']) => void;
}

export default function ThemeCustomizer({ theme, onChange }: ThemeCustomizerProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Theme Customization</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Background Color
        </label>
        <input
          type="color"
          value={theme.backgroundColor}
          onChange={(e) =>
            onChange({ ...theme, backgroundColor: e.target.value })
          }
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Text Color
        </label>
        <input
          type="color"
          value={theme.textColor}
          onChange={(e) => onChange({ ...theme, textColor: e.target.value })}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Button Color
        </label>
        <input
          type="color"
          value={theme.buttonColor}
          onChange={(e) => onChange({ ...theme, buttonColor: e.target.value })}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font Family
        </label>
        <select
          value={theme.fontFamily}
          onChange={(e) => onChange({ ...theme, fontFamily: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Inter, system-ui, sans-serif">Inter</option>
          <option value="ui-serif, Georgia, Cambria, serif">Serif</option>
          <option value="ui-monospace, monospace">Monospace</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font Size
        </label>
        <select
          value={theme.fontSize}
          onChange={(e) => onChange({ ...theme, fontSize: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="14px">Small</option>
          <option value="16px">Medium</option>
          <option value="18px">Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Button Style
        </label>
        <select
          value={theme.buttonStyle}
          onChange={(e) =>
            onChange({
              ...theme,
              buttonStyle: e.target.value as FormDesign['theme']['buttonStyle'],
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="rounded">Rounded</option>
          <option value="outlined">Outlined</option>
          <option value="filled">Filled</option>
        </select>
      </div>
    </div>
  );
}