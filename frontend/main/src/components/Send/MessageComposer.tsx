import React, { useState } from 'react';
import { MessageType } from '../../types/message';

interface MessageComposerProps {
  type: MessageType;
  content: string;
  onContentChange: (content: string) => void;
}

export default function MessageComposer({
  type,
  content,
  onContentChange,
}: MessageComposerProps) {
  const maxLength = type === 'sms' ? 160 : 0;
  const segments = type === 'sms' ? Math.ceil(content.length / 160) : 0;

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Type your message here..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {type === 'sms' && (
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {content.length} / {maxLength} characters
            {segments > 1 && ` (${segments} segments)`}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <span>Available tags:</span>
        <button
          onClick={() => onContentChange(content + '{firstName}')}
          className="text-blue-600 hover:text-blue-800"
        >
          {'{firstName}'}
        </button>
        <button
          onClick={() => onContentChange(content + '{lastName}')}
          className="text-blue-600 hover:text-blue-800"
        >
          {'{lastName}'}
        </button>
        <button
          onClick={() => onContentChange(content + '{email}')}
          className="text-blue-600 hover:text-blue-800"
        >
          {'{email}'}
        </button>
      </div>
    </div>
  );
}