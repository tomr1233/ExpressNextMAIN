import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface UserMenuItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
}

export default function UserMenuItem({ icon: Icon, label, href, onClick }: UserMenuItemProps) {
  const className = "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full";
  
  if (href) {
    return (
      <Link to={href} className={className}>
        <Icon className="mr-3 h-4 w-4" aria-hidden="true" />
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <Icon className="mr-3 h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}