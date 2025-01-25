import React from 'react';
import { BookOpen, Smile, Hash } from 'lucide-react';

interface MessageToolbarProps {
  templatesButtonRef: React.RefObject<HTMLButtonElement>;
  emojisButtonRef: React.RefObject<HTMLButtonElement>;
  tagsButtonRef: React.RefObject<HTMLButtonElement>;
  onTemplateClick: () => void;
  onEmojiClick: () => void;
  onTagClick: () => void;
}

export default function MessageToolbar({
  templatesButtonRef,
  emojisButtonRef,
  tagsButtonRef,
  onTemplateClick,
  onEmojiClick,
  onTagClick,
}: MessageToolbarProps) {
  return (
    <div className="flex space-x-2 mb-2">
      <button
        ref={templatesButtonRef}
        onClick={onTemplateClick}
        className="flex items-center px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Templates
      </button>
      <button
        ref={emojisButtonRef}
        onClick={onEmojiClick}
        className="flex items-center px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <Smile className="w-4 h-4 mr-2" />
        Emojis
      </button>
      <button
        ref={tagsButtonRef}
        onClick={onTagClick}
        className="flex items-center px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <Hash className="w-4 h-4 mr-2" />
        Tags
      </button>
    </div>
  );
}