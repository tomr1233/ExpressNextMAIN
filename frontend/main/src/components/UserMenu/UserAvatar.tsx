import React from 'react';
import { getInitials, getAvatarColor } from '../../utils/avatarUtils';

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function UserAvatar({ name, size = 'md' }: UserAvatarProps) {
  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(name);
  
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full font-medium text-white ${backgroundColor} ${sizeClasses[size]}`}
      aria-label={`${name}'s avatar`}
    >
      {initials}
    </div>
  );
}