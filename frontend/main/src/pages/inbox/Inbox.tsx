import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message, MessageStatus, MessagePriority } from '../../types/inbox';
import MessageListHeader from '../../components/Inbox/MessageList/MessageListHeader';
import MessageListItem from '../../components/Inbox/MessageList/MessageListItem';
import MessageView from '../../components/Inbox/MessageView/MessageView';
import MessageFilters from '../../components/Inbox/MessageFilters';
import { useMessages } from '../../hooks/useMessages';

interface InboxProps {
  type: 'all' | 'email' | 'sms';
}

// Mock data - replace with API call
const mockMessages: Message[] = [
  {
    id: '1',
    subject: 'Urgent: Project Update Required',
    content: 'Please provide an update on the current project status...',
    sender: {
      id: 'sender1',
      name: 'John Smith',
      email: 'john@example.com',
    },
    recipient: {
      id: 'recipient1',
      name: 'Current User',
      email: 'user@example.com',
    },
    type: 'email',
    status: 'unread',
    priority: 'high',
    direction: 'incoming',
    timestamp: new Date().toISOString(),
    labels: ['project', 'urgent'],
  },
  {
    id: '2',
    subject: 'Order Confirmation',
    content: 'Your order has been confirmed and will be shipped soon.',
    sender: {
      id: 'sender2',
      name: 'Support Team',
      email: 'support@example.com',
    },
    recipient: {
      id: 'recipient1',
      name: 'Current User',
      email: 'user@example.com',
    },
    type: 'sms',
    status: 'unread',
    priority: 'medium',
    direction: 'incoming',
    timestamp: new Date().toISOString(),
    labels: ['order'],
  },
];

export default function Inbox({ type }: InboxProps) {
  const navigate = useNavigate();
  const { messages, updateMessageStatus } = useMessages(mockMessages);
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

  const getTitle = () => {
    switch (type) {
      case 'email':
        return 'Email Messages';
      case 'sms':
        return 'SMS Messages';
      default:
        return 'All Messages';
    }
  };

  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      updateMessageStatus(message.id, 'read');
    }
  };

  const filteredMessages = messages
    .filter((message) => {
      // Filter by message type
      if (type !== 'all' && message.type !== type) {
        return false;
      }

      const matchesSearch =
        message.subject?.toLowerCase().includes(search.toLowerCase()) ||
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

  const handleReply = () => {
    console.log('Reply to message:', selectedMessage?.id);
  };

  const handleForward = () => {
    console.log('Forward message:', selectedMessage?.id);
  };

  const handleDelete = () => {
    if (selectedMessage) {
      updateMessageStatus(selectedMessage.id, 'archived');
      setSelectedMessage(null);
    }
  };

  return (
    <div className="h-full flex">
      <div className={`flex-1 flex flex-col ${selectedMessage ? 'hidden lg:flex' : ''}`}>
        <MessageListHeader
          title={getTitle()}
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
              onClick={() => handleMessageSelect(message)}
            />
          ))}
          {filteredMessages.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No messages found
            </div>
          )}
        </div>
      </div>

      {selectedMessage && (
        <div className={`w-full lg:w-7/12 border-l border-gray-200 ${
          selectedMessage ? 'block' : 'hidden lg:block'
        }`}>
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