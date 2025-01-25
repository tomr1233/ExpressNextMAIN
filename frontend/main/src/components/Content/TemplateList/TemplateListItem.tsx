import React, { useState, useEffect, useRef } from 'react';
import { Template } from '../../../types/template';
import { MoreVertical, Mail, MessageSquare } from 'lucide-react';
import { formatRelativeTime } from '../../../utils/dateUtils';

interface TemplateListItemProps {
  template: Template;
  onEdit: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onDelete: (template: Template) => void;
}

export default function TemplateListItem({
  template,
  onEdit,
  onDuplicate,
  onDelete,
}: TemplateListItemProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-gray-100 text-gray-800',
    archived: 'bg-red-100 text-red-800',
  };
  
  const [menuOpen, setMenuOpen] = useState(false);
  // Create a ref to the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="px-6 py-4 hover:bg-gray-50 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {template.type === 'email' ? (
            <Mail className="h-5 w-5 text-gray-400" />
          ) : (
            <MessageSquare className="h-5 w-5 text-gray-400" />
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{template.content}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              statusColors[template.status]
            }`}
          >
            {template.status}
          </span>
          <span className="text-sm text-gray-500">
            Updated {formatRelativeTime(template.updatedAt)}
          </span>

          {/* Dropdown wrapper with ref */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-400 hover:text-gray-500"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit(template);
                      setMenuOpen(false); // Close after action
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(template);
                      setMenuOpen(false); // Close after action
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
