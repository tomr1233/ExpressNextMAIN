import { useState, useCallback } from 'react';
import { Message, MessageStatus } from '../types/inbox';

export function useMessages(initialMessages: Message[]) {
  const [messages, setMessages] = useState(initialMessages);

  const updateMessageStatus = useCallback((messageId: string, status: MessageStatus) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === messageId 
          ? { ...message, status } 
          : message
      )
    );
  }, []);

  return {
    messages,
    updateMessageStatus
  };
}