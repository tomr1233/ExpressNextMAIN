import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/classNames';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isExpanded?: boolean;
}

export default function SidebarLink({ 
  href, 
  icon: Icon, 
  label, 
  isExpanded = false 
}: SidebarLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-gray-800 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      )}
    >
      <Icon className={cn(
        'h-5 w-5 transition-all duration-300 ease-in-out',
        isExpanded ? 'mr-3' : 'mx-auto'
      )} />
      <span className={cn(
        'transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
        isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
      )}>
        {label}
      </span>
    </Link>
  );
}