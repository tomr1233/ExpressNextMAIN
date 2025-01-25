import React from 'react';
import { MessageSquare, HardDrive, Megaphone } from 'lucide-react';
import SettingsCard from './SettingsCard';

export default function UsageOverview() {
  const metrics = [
    {
      icon: MessageSquare,
      label: 'Messages Sent',
      value: '0',
      total: '0',
      percentage: 0,
    },
    {
      icon: HardDrive,
      label: 'Storage Used',
      value: '0',
      total: '0',
      percentage: 0,
    },
    {
      icon: Megaphone,
      label: 'Active Campaigns',
      value: '0',
      total: '0',
      percentage: 0,
    },
  ];

  return (
    <SettingsCard
      title="Usage Overview"
      description="Monitor your account usage and limits"
    >
      <div className="py-4">
        <div className="grid gap-6 sm:grid-cols-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="relative rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-gray-400" />
                  <h4 className="text-sm font-medium text-gray-900">
                    {metric.label}
                  </h4>
                </div>
                <div className="mt-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-semibold text-gray-900">
                      {metric.value}
                    </span>
                    <span className="text-sm text-gray-500">
                      / {metric.total}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${metric.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  Current Plan: Professional
                </h4>
                <p className="text-sm text-gray-500">
                  Next billing date: March 31, 2024
                </p>
              </div>
              <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}