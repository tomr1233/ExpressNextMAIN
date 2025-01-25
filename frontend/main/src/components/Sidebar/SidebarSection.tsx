import React from 'react';
import { LucideIcon } from 'lucide-react';
import SidebarLink from './SidebarLink';
import { cn } from '../../utils/classNames';

interface SidebarLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarSectionProps {
  title: string;
  links: SidebarLink[];
  isExpanded?: boolean;
}

export default function SidebarSection({ 
  title, 
  links,
  isExpanded = false 
}: SidebarSectionProps) {
  return (
    <div className="px-2 py-3">
      <h2 className={cn(
        'mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400',
        isExpanded ? 'w-full' : 'text-center'
      )}>
        {isExpanded ? title : title[0]}
      </h2>
      <div className="space-y-1">
        {links.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.name}
            isExpanded={isExpanded}
          />
        ))}
      </div>
    </div>
  );
}