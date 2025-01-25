import React from 'react';
import UpdateCard from './UpdateCard';
import { ArrowRight } from 'lucide-react';

export default function RebrandAnnouncement() {
  return (
    <UpdateCard
      title="ExpressTXT Has a New Look and Feel!"
      description="We've evolved beyond SMS messaging into a comprehensive AI-powered CRM and automation agency."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">ExpressTXT</div>
              <div className="text-sm text-gray-500">Before</div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400" />
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">ExpressNext</div>
              <div className="text-sm text-gray-500">Now</div>
            </div>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-gray-500">
          <p>
            We're excited to announce our transformation from ExpressTXT to ExpressNext! 
            This rebrand reflects our evolution into a comprehensive platform that goes 
            beyond messaging to provide you with powerful CRM capabilities and AI-driven automation tools.
          </p>
          
          <h4 className="text-gray-900">What's Changed?</h4>
          <ul>
            <li>Simplified user experience with an intuitive new layout</li>
            <li>Fresh, modern design that reflects our commitment to innovation</li>
            <li>Enhanced focus on AI-powered automation tools</li>
            <li>Expanded capabilities beyond SMS messaging</li>
          </ul>
        </div>
      </div>
    </UpdateCard>
  );
}