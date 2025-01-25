import React from 'react';

interface TagsDropdownProps {
  onSelect: (tag: string) => void;
  onClose: () => void;
}

export default function TagsDropdown({ onSelect, onClose }: TagsDropdownProps) {
  const tags = [
    { label: 'First Name', value: '{firstName}' },
    { label: 'Last Name', value: '{lastName}' },
    { label: 'Phone Number', value: '{phone}' },
    { label: 'Email', value: '{email}' },
    { label: 'Company', value: '{company}' },
  ];

  return (
    <div className="py-1" role="menu">
      {tags.map((tag) => (
        <button
          key={tag.value}
          onClick={() => onSelect(tag.value)}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}