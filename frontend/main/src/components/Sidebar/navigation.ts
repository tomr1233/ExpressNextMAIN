import {
  LayoutDashboard,
  Megaphone,
  Send,
  Users,
  FileText,
  Settings,
  Inbox,
  Mail,
  MessageSquare,
  Bot,
  BookOpen,
  Blocks
} from 'lucide-react';

export const marketingLinks = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
  { name: 'Send', href: '/send', icon: Send },
  { name: 'Form Builder', href: '/formbuilder', icon: Blocks },
];

export const manageLinks = [
  { name: 'Audience', href: '/audience', icon: Users },
  { name: 'Content', href: '/content', icon: FileText },
];

export const inboxLinks = [
  { name: 'All Messages', href: '/inbox', icon: Mail },
  { name: 'Email', href: '/inbox/email', icon: Mail },
  { name: 'SMS', href: '/inbox/sms', icon: MessageSquare },
];

export const aiLinks = [
  { name: 'AI', href: '/ai/employees', icon: Bot },
  { name: 'AI Agents', href: '/ai/knowledge', icon: BookOpen },
];