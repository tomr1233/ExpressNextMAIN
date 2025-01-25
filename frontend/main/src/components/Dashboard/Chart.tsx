import React from 'react';

interface ChartProps {
  title: string;
  children: React.ReactNode;
}

export default function Chart({ title, children }: ChartProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}