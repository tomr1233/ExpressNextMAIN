import React from 'react';
import { ArrowLeft, Download, Star, Trash2, Reply, Forward } from 'lucide-react';
import { Message } from '../../../types/inbox';
import { formatDate } from '../../../utils/dateUtils';

interface MessageViewProps {
  message: Message;
  onBack: () => void;
  onReply: () => void;
  onForward: () => void;
  onDelete: () => void;
}

export default function MessageView({
  message,
  onBack,
  onReply,
  onForward,
  onDelete,
}: MessageViewProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <Star className="h-5 w-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">{message.subject}</h1>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-900">
                {message.direction === 'incoming' ? message.sender.name : message.recipient.name}
              </p>
              <p className="text-sm text-gray-500">
                {message.direction === 'incoming' ? message.sender.email : message.recipient.email}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">{formatDate(message.timestamp)}</p>
        </div>

        <div className="prose max-w-none mb-6">
          {message.content}
        </div>

        {message.attachments && message.attachments.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Attachments</h3>
            <div className="space-y-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-2 border border-gray-200 rounded-lg"
                >
                  <span className="text-sm text-gray-600">{attachment.name}</span>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={onReply}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </button>
          <button
            onClick={onForward}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Forward className="h-4 w-4 mr-2" />
            Forward
          </button>
        </div>
      </div>
    </div>
  );
}