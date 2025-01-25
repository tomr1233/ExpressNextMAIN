import React from 'react';
import { MessagePreview as IMessagePreview } from '../../types/message';

interface MessagePreviewProps {
  preview: IMessagePreview;
  onSend: () => void;
}

export default function MessagePreview({ preview, onSend }: MessagePreviewProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Message Preview</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Recipients</span>
          <span className="font-medium">{preview.recipients}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Segments</span>
          <span className="font-medium">{preview.segments}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimated Cost</span>
          <span className="font-medium">${preview.estimatedCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Sample Preview</h4>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">
          {preview.personalizedContent}
        </p>
      </div>

      <button
        onClick={onSend}
        className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Send Message
      </button>
    </div>
  );
}