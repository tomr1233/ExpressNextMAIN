import React from 'react';
import { Mail, MessageSquare, Paperclip } from 'lucide-react';
import { Message } from '../../../types/inbox';
import { formatRelativeTime } from '../../../utils/dateUtils';

interface MessageListItemProps {
  message: Message;
  isSelected: boolean;
  onClick: () => void;
}

export default function MessageListItem({
  message,
  isSelected,
  onClick,
}: MessageListItemProps) {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 border-b border-gray-200 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      } ${message.status === 'unread' ? 'bg-white font-medium' : 'bg-gray-50'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0">
          <div className="flex-shrink-0 mr-3">
            {message.type === 'email' ? (
              <Mail className="h-4 w-4 text-gray-400" />
            ) : (
              <MessageSquare className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <p className="truncate text-sm">
                {message.direction === 'incoming' ? message.sender.name : message.recipient.name}
              </p>
              {message.priority !== 'low' && (
                <span className={`px-2 inline-flex text-xs leading-4 font-semibold rounded-full ${
                  priorityColors[message.priority]
                }`}>
                  {message.priority}
                </span>
              )}
              {message.attachments?.length > 0 && (
                <Paperclip className="h-3 w-3 text-gray-400" />
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">{message.subject}</p>
          </div>
        </div>
        <div className="ml-3 flex-shrink-0">
          <p className="text-xs text-gray-500">{formatRelativeTime(message.timestamp)}</p>
        </div>
      </div>
    </div>
  );
}