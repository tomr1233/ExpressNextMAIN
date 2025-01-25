export type TemplateType = 'email' | 'message';
export type TemplateStatus = 'active' | 'draft' | 'archived';

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  subject?: string;
  content: string;
  status: TemplateStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastUsed?: string;
  useCount: number;
}

export interface TemplateFormData {
  name: string;
  subject?: string;
  content: string;
  tags: string[];
  status: TemplateStatus;
}