import React from 'react';
import UpdateCard from './UpdateCard';
import FeatureList from './FeatureList';

export default function WebAppUpdates() {
  const features = [
    {
      title: 'New Sidebar Navigation',
      description: 'Streamlined navigation with clear sections for Marketing, Manage, Inbox, and AI tools.',
      items: [
        'Organized sections for better workflow',
        'Clear icons and labels',
        'Quick access to essential tools'
      ]
    },
    {
      title: 'Enhanced Message Composer',
      description: 'Improved message composition with new features for better engagement.',
      items: [
        'Template selection',
        'Emoji picker integration',
        'Dynamic personalization tags',
        'Message scheduling capabilities'
      ]
    },
    {
      title: 'Advanced Contact Management',
      description: 'Powerful tools to manage your contacts and audiences.',
      items: [
        'Import and export functionality',
        'Detailed contact profiles',
        'Advanced filtering and search',
        'Group management'
      ]
    },
    {
      title: 'Streamlined Inbox',
      description: 'Better organization of your communications.',
      items: [
        'Separate views for Open, Unread, and All messages',
        'Advanced filtering options',
        'Quick actions for common tasks',
        'Improved message threading'
      ]
    }
  ];

  return (
    <UpdateCard
      title="What's New in the Web App?"
      description="Check out the latest features and improvements we've added to enhance your experience."
    >
      <div className="space-y-8">
        {features.map((feature, index) => (
          <FeatureList
            key={index}
            title={feature.title}
            description={feature.description}
            items={feature.items}
          />
        ))}
      </div>
    </UpdateCard>
  );
}