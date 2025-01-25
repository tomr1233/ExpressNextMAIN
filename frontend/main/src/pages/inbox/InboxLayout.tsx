import React, { useState } from 'react';
import { Message, MessageStatus, MessagePriority } from '../../types/inbox';
import MessageListHeader from '../../components/Inbox/MessageList/MessageListHeader';
import MessageListItem from '../../components/Inbox/MessageList/MessageListItem';
import MessageView from '../../components/Inbox/MessageView/MessageView';
import MessageFilters from '../../components/Inbox/MessageFilters';

interface InboxLayoutProps {
  title: string;
  messages: Message[];
  filterPredicate?: (message: Message) => boolean;
  onMessageSelect?: (message: Message) => void; // NEW callback prop
}

export default function InboxLayout({
  title,
  messages,
  filterPredicate = () => true,
  onMessageSelect,
}: InboxLayoutProps) {
  const [search, setSearch] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as MessageStatus[],
    priority: [] as MessagePriority[],
    dateRange: {
      start: '',
      end: '',
    },
  });

  const filteredMessages = messages
    .filter(filterPredicate)
    .filter((message) => {
      const matchesSearch =
        message.subject.toLowerCase().includes(search.toLowerCase()) ||
        message.content.toLowerCase().includes(search.toLowerCase()) ||
        message.sender.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(message.status);
      const matchesPriority =
        filters.priority.length === 0 || filters.priority.includes(message.priority);

      const matchesDateRange =
        (!filters.dateRange.start ||
          new Date(message.timestamp) >= new Date(filters.dateRange.start)) &&
        (!filters.dateRange.end ||
          new Date(message.timestamp) <= new Date(filters.dateRange.end));

      return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    // Call the callback if provided, to inform the parent that a message was selected.
    if (onMessageSelect) {
      onMessageSelect(message);
    }
  };

  const handleReply = () => {
    // Implement reply logic
    console.log('Reply to message:', selectedMessage?.id);
  };

  const handleForward = () => {
    // Implement forward logic
    console.log('Forward message:', selectedMessage?.id);
  };

  const handleDelete = () => {
    // Implement delete logic
    console.log('Delete message:', selectedMessage?.id);
    setSelectedMessage(null);
  };

  return (
    <div className="h-full flex">
      <div className={`flex-1 flex flex-col ${selectedMessage ? 'hidden lg:flex' : ''}`}>
        <MessageListHeader
          title={title}
          count={filteredMessages.length}
          search={search}
          onSearchChange={setSearch}
          sortDirection={sortDirection}
          onSortChange={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          onFilterClick={() => setIsFiltersOpen(true)}
        />
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((message) => (
            <MessageListItem
              key={message.id}
              message={message}
              isSelected={selectedMessage?.id === message.id}
              onClick={() => handleSelectMessage(message)} // Use the handler
            />
          ))}
        </div>
      </div>

      {selectedMessage && (
        <div
          className={`w-full lg:w-7/12 border-l border-gray-200 ${
            selectedMessage ? 'block' : 'hidden lg:block'
          }`}
        >
          <MessageView
            message={selectedMessage}
            onBack={() => setSelectedMessage(null)}
            onReply={handleReply}
            onForward={handleForward}
            onDelete={handleDelete}
          />
        </div>
      )}

      <MessageFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
}
