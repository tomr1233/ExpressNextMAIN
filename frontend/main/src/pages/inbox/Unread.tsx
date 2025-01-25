import React, { useState } from 'react';
import InboxLayout from './InboxLayout';
import { Message } from '../../types/inbox';

// Initial mock messages
const initialMessages: Message[] = [
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
    status: 'unread', // Initially unread
    priority: 'high',
    direction: 'incoming',
    timestamp: new Date().toISOString(),
    labels: ['project', 'urgent'],
  },
];

export default function UnreadInbox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const filterUnreadMessages = (message: Message) => {
    return message.status === 'unread';
  };

  const handleMessageClick = (clickedMessage: Message) => {
    // Update the clicked message's status to 'open'
    const updatedMessages = messages.map((message) =>
      message.id === clickedMessage.id
        ? { ...message, status: 'open' }
        : message
    );
    setMessages(updatedMessages);
  };

  return (
    <InboxLayout
      title="Unread Messages"
      messages={messages}
      filterPredicate={filterUnreadMessages}
      onMessageClick={handleMessageClick}
    />
  );
}
