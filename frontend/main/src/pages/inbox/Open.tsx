import React from 'react';
import InboxLayout from './InboxLayout';
import { Message } from '../../types/inbox';

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
  // Add more mock messages as needed
];

export default function OpenInbox() {
  const filterOpenMessages = (message: Message) => {
    return message.status === 'unread' || 
           (message.status === 'read' && !message.lastReplyAt);
  };

  return (
    <InboxLayout
      title="Open Messages"
      messages={mockMessages}
      filterPredicate={filterOpenMessages}
    />
  );
}