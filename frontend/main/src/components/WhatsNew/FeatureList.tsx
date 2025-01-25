import React from 'react';

interface FeatureListProps {
  title: string;
  description: string;
  items: string[];
}

export default function FeatureList({ title, description, items }: FeatureListProps) {
  return (
    <div>
      <h3 className="text-base font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 relative top-1">
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span className="ml-2 text-sm text-gray-500">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}