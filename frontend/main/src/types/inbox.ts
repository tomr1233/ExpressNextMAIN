export type MessageStatus = 'unread' | 'read' | 'archived';
export type MessagePriority = 'low' | 'medium' | 'high';
export type MessageDirection = 'incoming' | 'outgoing';

export interface Message {
  id: string;
  subject: string;
  content: string;
  sender: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  recipient: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  type: 'email' | 'sms';
  status: MessageStatus;
  priority: MessagePriority;
  direction: MessageDirection;
  timestamp: string;
  lastReplyAt?: string;
  labels: string[];
  attachments?: {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }[];
}