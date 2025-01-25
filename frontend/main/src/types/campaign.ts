export type CampaignType = 'email' | 'sms' | 'social';
export type CampaignStatus = 'active' | 'draft' | 'completed';

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  metrics?: {
    sent?: number;
    opened?: number;
    clicked?: number;
    converted?: number;
  };
}