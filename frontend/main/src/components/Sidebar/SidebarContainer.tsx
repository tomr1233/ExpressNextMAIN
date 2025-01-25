import React from 'react';
import { cn } from '../../utils/classNames';

interface SidebarContainerProps {
  children: React.ReactNode;
  isExpanded: boolean;
  onExpand: (expanded: boolean) => void;
}

export default function SidebarContainer({ 
  children, 
  isExpanded,
  onExpand 
}: SidebarContainerProps) {
  return (
    <div
      onMouseEnter={() => onExpand(true)}
      onMouseLeave={() => onExpand(false)}
      className={cn(
        'flex h-screen flex-col bg-gray-900 transition-all duration-300 ease-in-out relative',
        isExpanded ? 'w-64' : 'w-16'
      )}
    >
      {children}
    </div>
  );
}