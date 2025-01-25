import React from 'react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const emojis = ['😊', '👍', '🎉', '❤️', '🙌', '✨', '🌟', '💪', '🤝', '📱'];

  return (
    <div className="p-3 grid grid-cols-5 gap-2">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100 rounded"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}