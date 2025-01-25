import React from 'react';
import { Boxes } from 'lucide-react';
import { cn } from '../../utils/classNames';

interface LogoProps {
  isExpanded?: boolean;
}

export default function Logo({ isExpanded = false }: LogoProps) {
  return (
    <div className="flex items-center">
      <Boxes className="h-8 w-8 text-blue-500" />
      <span className={cn(
        'ml-3 font-bold text-white transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
        isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
      )}>
        
      </span>
    </div>
  );
}