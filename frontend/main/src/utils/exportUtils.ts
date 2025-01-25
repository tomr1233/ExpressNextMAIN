import { Campaign } from '../types/campaign';

export function exportToCsv(campaigns: Campaign[], fileName: string): void {
  // Convert campaigns to CSV format
  const headers = [
    'Name',
    'Type',
    'Status',
    'Recipients',
    'Open Rate',
    'Click Rate',
    'Placed Rate',
    'Created At',
    'Tags'
  ];

  const rows = campaigns.map(campaign => [
    campaign.name,
    campaign.type,
    campaign.status,
    campaign.recipients || 0,
    campaign.metrics?.openRate || 0,
    campaign.metrics?.clickRate || 0,
    campaign.metrics?.placedRate || 0,
    new Date(campaign.createdAt).toLocaleDateString(),
    campaign.tags?.join(', ') || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create and download the CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}