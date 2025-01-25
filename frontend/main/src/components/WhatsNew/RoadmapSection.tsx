import React from 'react';
import UpdateCard from './UpdateCard';
import { Bot, BarChart2, Workflow } from 'lucide-react';

export default function RoadmapSection() {
  const upcomingFeatures = [
    {
      icon: Bot,
      title: 'AI Tools',
      description: 'Smarter automation with AI-driven insights and virtual AI employees.'
    },
    {
      icon: BarChart2,
      title: 'Advanced Reporting',
      description: 'Deeper insights into messaging and campaign performance.'
    },
    {
      icon: Workflow,
      title: 'Integrations',
      description: 'Seamless integrations with Zapier, Make.com, and more.'
    }
  ];

  return (
    <UpdateCard
      title="What's Coming Next?"
      description="Preview the exciting features we're working on to make your experience even better."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {upcomingFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="relative rounded-lg border border-gray-200 p-6 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-6 w-6 text-blue-500" />
                <h4 className="text-base font-medium text-gray-900">{feature.title}</h4>
              </div>
              <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Stay tuned for more updates as we continue to innovate and deliver tools to automate and grow your business!
        </p>
      </div>
    </UpdateCard>
  );
}