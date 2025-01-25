import React from 'react';

interface UpdateCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function UpdateCard({ title, description, children }: UpdateCardProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );
}