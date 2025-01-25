import React from 'react';
import { Campaign } from '../../types/campaign';
import { formatDate } from '../../utils/dateUtils';

interface CampaignTableRowProps {
  campaign: Campaign;
}

export default function CampaignTableRow({ campaign }: CampaignTableRowProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-gray-100 text-gray-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500 capitalize">{campaign.type}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[campaign.status]}`}>
          {campaign.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(campaign.createdAt)}
      </td>
    </tr>
  );
}