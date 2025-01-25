import React, { useEffect, useRef, useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Contact } from '../../types/message';

interface ContactSelectorProps {
  selectedContacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  onRemoveContact: (contactId: string) => void;
}

export default function ContactSelector({
  selectedContacts,
  onSelectContact,
  onRemoveContact,
}: ContactSelectorProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  // This effect fetches contacts when the dropdown is opened or the query changes.
  useEffect(() => {
    if (dropdownOpen) {
      setIsLoading(true);
      // Replace with your webhook URL
      fetch('https://your-webhook-url.com/contacts?search=' + encodeURIComponent(query))
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data: Contact[]) => {
          setContacts(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching contacts:', error);
          setIsLoading(false);
        });
    }
  }, [dropdownOpen, query]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleFocus = () => {
    // Open the dropdown when input is focused
    setDropdownOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="space-y-4 relative" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onFocus={handleFocus}
          onChange={handleSearchChange}
          placeholder="Search contacts..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <ChevronDown
            className={`h-5 w-5 transform transition-transform ${
              dropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedContacts.map((contact) => (
          <div
            key={contact.id}
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800"
          >
            <span className="text-sm">{`${contact.firstName} ${contact.lastName}`}</span>
            <button
              onClick={() => onRemoveContact(contact.id)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {dropdownOpen && (
        <div className="absolute z-10 w-full mt-1 max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-md">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : contacts.length > 0 ? (
            contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => {
                  onSelectContact(contact);
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{`${contact.firstName} ${contact.lastName}`}</span>
                  <span className="text-sm text-gray-500">{contact.email}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No contacts found</div>
          )}
        </div>
      )}
    </div>
  );
}