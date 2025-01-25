import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Campaign } from '../../../types/campaign';
import { formatDate } from '../../../utils/dateUtils';
import { formatNumber } from '../../../utils/numberUtils';

interface CampaignTableRowProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDuplicate: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

export default function CampaignTableRow({
  campaign,
  onEdit,
  onDuplicate,
  onDelete,
}: CampaignTableRowProps) {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-yellow-100 text-yellow-800',
    sent: 'bg-green-100 text-green-800',
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{campaign.type}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-wrap gap-2">
          {campaign.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          statusColors[campaign.status]
        }`}>
          {campaign.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatNumber(campaign.recipients)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {campaign.metrics?.openRate ? `${campaign.metrics.openRate}%` : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {campaign.metrics?.clickRate ? `${campaign.metrics.clickRate}%` : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {campaign.metrics?.placedRate ? `${campaign.metrics.placedRate}%` : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(campaign.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative group">
          <button className="text-gray-400 hover:text-gray-500">
            <MoreVertical className="h-5 w-5" />
          </button>
          <div className="hidden group-hover:block absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu">
              <button
                onClick={() => onEdit(campaign)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Edit
              </button>
              <button
                onClick={() => onDuplicate(campaign)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Duplicate
              </button>
              <button
                onClick={() => onDelete(campaign)}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                role="menuitem"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}