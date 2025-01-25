import React from 'react';
import { FormDesign } from '../types/form';

interface FormPreviewProps {
  formDesign: FormDesign;
}

export default function FormPreview({ formDesign }: FormPreviewProps) {
  const { theme } = formDesign;

  const buttonStyles = {
    rounded: 'rounded-full',
    outlined: 'border-2 bg-transparent',
    filled: 'rounded-md',
  };

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
      }}
      className="max-w-md mx-auto p-6 rounded-lg"
    >
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {formDesign.fields.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
              {field.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>

            {field.type === 'text' && (
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border rounded-md"
                required={field.required}
              />
            )}

            {field.type === 'email' && (
              <input
                type="email"
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border rounded-md"
                required={field.required}
              />
            )}

            {field.type === 'password' && (
              <input
                type="password"
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border rounded-md"
                required={field.required}
              />
            )}

            {field.type === 'select' && (
              <select
                className="w-full px-3 py-2 border rounded-md"
                required={field.required}
              >
                <option value="">{field.placeholder}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'checkbox' && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  required={field.required}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="ml-2">{field.placeholder}</span>
              </div>
            )}

            {field.type === 'radio' && (
              <div className="space-y-2">
                {field.options?.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      name={field.id}
                      value={option}
                      required={field.required}
                      className="h-4 w-4 border-gray-300"
                    />
                    <span className="ml-2">{option}</span>
                  </div>
                ))}
              </div>
            )}

            {field.type === 'date' && (
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md"
                required={field.required}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          style={{ backgroundColor: theme.buttonColor }}
          className={`w-full px-4 py-2 text-white ${
            buttonStyles[theme.buttonStyle]
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}