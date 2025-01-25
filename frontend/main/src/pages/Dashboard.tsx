import React from 'react';
import { Users, Mail, BarChart2, Bolt } from 'lucide-react';
import MetricCard from '../components/Dashboard/MetricCard';

// Simple component to display usage in a progress bar
function UsageCard({
  title,
  used,
  limit,
}: {
  title: string;
  used: number;
  limit: number;
}) {
  const percentageUsed = Math.round((used / limit) * 100);

  return (
    <div className="rounded-lg bg-white p-5 shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {used} / {limit} used
      </p>
      <div className="relative mt-3 h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percentageUsed}%` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening with your campaigns.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Campaigns" value="0" change={12} icon={BarChart2} />
        <MetricCard title="Active Campaigns" value="0" change={-5} icon={Mail} />
        <MetricCard title="Recipients" value="0" change={8} icon={Users} />
        <MetricCard title="Sent" value="0" change={15} icon={Bolt} />
      </div>

      {/* Usage Limits (replacing the two charts) */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Usage Limits</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <UsageCard title="Tokens" used={0} limit={0} />
          <UsageCard title="Seats" used={1} limit={1} />
          <UsageCard title="ExpressNext Executions" used={0} limit={25} />
        </div>
      </div>
    </div>
  );
}
