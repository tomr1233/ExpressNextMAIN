import React from 'react';
import RebrandAnnouncement from '../components/WhatsNew/RebrandAnnouncement';
import WebAppUpdates from '../components/WhatsNew/WebAppUpdates';
import RoadmapSection from '../components/WhatsNew/RoadmapSection';

export default function WhatsNew() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">What's New</h1>
        <p className="mt-1 text-sm text-gray-500">
          Discover the latest updates and improvements to your all-in-one CRM and marketing automation platform.
        </p>
      </div>

      <div className="space-y-8">
        <RebrandAnnouncement />
        <WebAppUpdates />
        <RoadmapSection />
      </div>
    </div>
  );
}