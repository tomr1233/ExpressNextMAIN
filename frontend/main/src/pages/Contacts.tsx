import React, { useEffect, useState } from 'react';
import { Contact } from '../types/contact';
import ContactsHeader from '../components/Contacts/ContactsHeader';
import ContactsFilters from '../components/Contacts/ContactsFilters';
import ContactsTableHeader from '../components/Contacts/ContactsTable/ContactsTableHeader';
import ContactsTableRow from '../components/Contacts/ContactsTable/ContactsTableRow';
import ContactForm from '../components/Contacts/ContactForm';
import { useSortableData } from '../hooks/useSortableData';

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('1');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contacts from the webhook on mount
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch('https://your-webhook-url.com/contacts')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch contacts');
        }
        return res.json();
      })
      .then((data: Contact[]) => {
        setContacts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching contacts:', err);
        setError('Unable to load contacts. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  const { items: sortedContacts, requestSort, sortConfig } = useSortableData(contacts);

  const filteredContacts = sortedContacts.filter((contact) => {
    const matchesSearch =
      contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search);

    const matchesDateRange =
      (!dateRange.start || new Date(contact.createdAt) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(contact.createdAt) <= new Date(dateRange.end));

    return matchesSearch && matchesDateRange;
  });

  const handleImport = () => {
    // Implement CSV import logic
    console.log('Importing contacts...');
  };

  const handleExport = () => {
    // Implement export logic
    console.log('Exporting contacts...');
  };

  const handleCreateContact = () => {
    setSelectedContact(undefined);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  };

  const handleDeleteContact = (contact: Contact) => {
    // Implement delete logic
    console.log('Deleting contact:', contact.id);
  };

  const handleSaveContact = (contact: Partial<Contact>) => {
    // Implement save logic
    console.log('Saving contact:', contact);
    setIsFormOpen(false);
  };

  return (
    <div className="p-8">
      <ContactsHeader
        totalContacts={filteredContacts.length}
        onImport={handleImport}
        onExport={handleExport}
        onCreateContact={handleCreateContact}
      />

      <ContactsFilters
        search={search}
        onSearchChange={setSearch}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            // Loading state
            <div className="p-4 text-center">Loading contacts...</div>
          ) : error ? (
            // Error state
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : filteredContacts.length > 0 ? (
            // Contacts table
            <table className="min-w-full divide-y divide-gray-200">
              <ContactsTableHeader sortConfig={sortConfig} onSort={requestSort} />
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <ContactsTableRow
                    key={contact.id}
                    contact={contact}
                    onEdit={handleEditContact}
                    onDelete={handleDeleteContact}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            // No results
            <div className="p-4 text-center text-gray-500">No contacts found.</div>
          )}
        </div>
      </div>

      <ContactForm
        contact={selectedContact}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveContact}
      />
    </div>
  );
}