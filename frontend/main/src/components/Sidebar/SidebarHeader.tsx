import React from 'react';
import Logo from '../Logo/Logo';

interface SidebarHeaderProps {
  isExpanded?: boolean;
}

export default function SidebarHeader({ isExpanded = false }: SidebarHeaderProps) {
  return (
    <div className="flex h-16 items-center px-4">
      <Logo isExpanded={isExpanded} />
    </div>
  );
}