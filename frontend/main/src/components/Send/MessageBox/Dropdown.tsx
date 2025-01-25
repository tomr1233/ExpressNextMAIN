import React, { useRef, useEffect } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchor: HTMLElement | null;
  children: React.ReactNode;
  width?: string;
}

export default function Dropdown({ isOpen, onClose, anchor, children, width = 'w-56' }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(dropdownRef, onClose);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (!dropdownRef.current || !anchor) return;

      const anchorRect = anchor.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      
      // Calculate available space below and above
      const spaceBelow = window.innerHeight - anchorRect.bottom;
      const spaceAbove = anchorRect.top;
      
      // Position dropdown
      if (spaceBelow >= dropdownRect.height || spaceBelow >= spaceAbove) {
        // Position below
        dropdownRef.current.style.top = `${anchorRect.bottom + window.scrollY}px`;
        dropdownRef.current.style.bottom = 'auto';
      } else {
        // Position above
        dropdownRef.current.style.bottom = `${window.innerHeight - anchorRect.top + window.scrollY}px`;
        dropdownRef.current.style.top = 'auto';
      }
      
      dropdownRef.current.style.left = `${anchorRect.left}px`;
      dropdownRef.current.style.width = `${anchorRect.width}px`;
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, anchor]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`fixed ${width} rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}
      style={{ minWidth: '200px' }}
    >
      {children}
    </div>
  );
}