import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

interface TemplateCardProps {
  title: string;
  description: string;
  industry: string;
  imageUrl: string;
  previewUrl: string;
}

export function TemplateCard({ title, description, industry, imageUrl, previewUrl }: TemplateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-700">
            {industry}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Preview Template <ExternalLink size={16} />
          </a>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Mail size={16} />
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
}