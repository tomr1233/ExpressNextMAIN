import React, { useState, useCallback, useRef } from 'react';
import MessageToolbar from './MessageToolbar';
import CharacterCounter from './CharacterCounter';
import ScheduleOptions from './ScheduleOptions';
import TagsDropdown from './TagsDropdown';
import TemplatesDropdown from './TemplatesDropdown';
import EmojiPicker from './EmojiPicker';
import Dropdown from './Dropdown';

interface MessageBoxProps {
  content: string;
  onContentChange: (content: string) => void;
}

export default function MessageBox({ content, onContentChange }: MessageBoxProps) {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [scheduledTime, setScheduledTime] = useState('');
  
  const templatesButtonRef = useRef<HTMLButtonElement>(null);
  const emojisButtonRef = useRef<HTMLButtonElement>(null);
  const tagsButtonRef = useRef<HTMLButtonElement>(null);

  const characterCount = content.length;
  const segmentCount = Math.ceil(characterCount / 160) || 1;

  const handleInsertTemplate = useCallback((template: string) => {
    onContentChange(template);
    setShowTemplates(false);
  }, [onContentChange]);

  const handleInsertEmoji = useCallback((emoji: string) => {
    onContentChange(content + emoji);
    setShowEmojis(false);
  }, [content, onContentChange]);

  const handleInsertTag = useCallback((tag: string) => {
    onContentChange(content + tag);
    setShowTags(false);
  }, [content, onContentChange]);

  return (
    <div className="space-y-4">
      <MessageToolbar
        templatesButtonRef={templatesButtonRef}
        emojisButtonRef={emojisButtonRef}
        tagsButtonRef={tagsButtonRef}
        onTemplateClick={() => {
          setShowEmojis(false);
          setShowTags(false);
          setShowTemplates(!showTemplates);
        }}
        onEmojiClick={() => {
          setShowTemplates(false);
          setShowTags(false);
          setShowEmojis(!showEmojis);
        }}
        onTagClick={() => {
          setShowTemplates(false);
          setShowEmojis(false);
          setShowTags(!showTags);
        }}
      />

      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Type your message here..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <div className="absolute bottom-2 right-2">
          <CharacterCounter
            characterCount={characterCount}
            segmentCount={segmentCount}
          />
        </div>
      </div>

      <Dropdown
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        anchor={templatesButtonRef.current}
        width="w-72"
      >
        <TemplatesDropdown
          onSelect={handleInsertTemplate}
          onClose={() => setShowTemplates(false)}
        />
      </Dropdown>

      <Dropdown
        isOpen={showEmojis}
        onClose={() => setShowEmojis(false)}
        anchor={emojisButtonRef.current}
        width="w-64"
      >
        <EmojiPicker
          onSelect={handleInsertEmoji}
          onClose={() => setShowEmojis(false)}
        />
      </Dropdown>

      <Dropdown
        isOpen={showTags}
        onClose={() => setShowTags(false)}
        anchor={tagsButtonRef.current}
        width="w-56"
      >
        <TagsDropdown
          onSelect={handleInsertTag}
          onClose={() => setShowTags(false)}
        />
      </Dropdown>

      <ScheduleOptions
        scheduleType={scheduleType}
        scheduledTime={scheduledTime}
        onScheduleTypeChange={setScheduleType}
        onScheduledTimeChange={setScheduledTime}
      />
    </div>
  );
}