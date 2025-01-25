export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leadScore: number;
  lastContact: string;
  status: 'active' | 'inactive' | 'lead';
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms';
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  sentCount: number;
  openRate: number;
  clickRate: number;
  lastModified: string;
}

export interface Message {
  id: string;
  type: 'email' | 'sms';
  subject?: string;
  content: string;
  from: string;
  to: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}