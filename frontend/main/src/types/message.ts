export type MessageType = 'email' | 'sms';

export interface MessageTemplate {
  id: string;
  name: string;
  type: MessageType;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tags: string[];
}

export interface ContactGroup {
  id: string;
  name: string;
  description: string;
  contactCount: number;
}

export interface MessagePreview {
  recipients: number;
  segments: number;
  estimatedCost: number;
  personalizedContent: string;
}