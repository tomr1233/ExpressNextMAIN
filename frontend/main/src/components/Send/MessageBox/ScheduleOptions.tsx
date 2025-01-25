import React from 'react';
import { Clock } from 'lucide-react';

interface ScheduleOptionsProps {
  scheduleType: 'now' | 'later';
  scheduledTime: string;
  onScheduleTypeChange: (type: 'now' | 'later') => void;
  onScheduledTimeChange: (time: string) => void;
}

export default function ScheduleOptions({
  scheduleType,
  scheduledTime,
  onScheduleTypeChange,
  onScheduledTimeChange,
}: ScheduleOptionsProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            checked={scheduleType === 'now'}
            onChange={() => onScheduleTypeChange('now')}
            className="h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">Send now</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            checked={scheduleType === 'later'}
            onChange={() => onScheduleTypeChange('later')}
            className="h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">Schedule for later</span>
        </label>
      </div>
      
      {scheduleType === 'later' && (
        <div className="mt-2">
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => onScheduledTimeChange(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
      )}
    </div>
  );
}