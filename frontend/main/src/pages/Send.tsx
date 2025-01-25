import React, { useState } from 'react';
import ContactSelector from '../components/Send/ContactSelector';
import MessageBox from '../components/Send/MessageBox/MessageBox';
import MessagePreview from '../components/Send/MessagePreview';
import { Contact, MessagePreview as IMessagePreview } from '../types/message';

export default function Send() {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [messageContent, setMessageContent] = useState('');

  // Mock preview data - replace with actual calculation
  const preview: IMessagePreview = {
    recipients: selectedContacts.length,
    segments: Math.ceil(messageContent.length / 160) || 1,
    estimatedCost: selectedContacts.length * 0.01,
    personalizedContent: messageContent.replace(
      '{firstName}',
      selectedContacts[0]?.firstName || 'John'
    ),
  };

  const handleSelectContact = (contact: Contact) => {
    if (!selectedContacts.find((c) => c.id === contact.id)) {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleRemoveContact = (contactId: string) => {
    setSelectedContacts(selectedContacts.filter((c) => c.id !== contactId));
  };

  const handleSend = () => {
    // Implement send logic
    console.log('Sending message...');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Send Message</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and send personalized messages to your contacts.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ContactSelector
              selectedContacts={selectedContacts}
              onSelectContact={handleSelectContact}
              onRemoveContact={handleRemoveContact}
            />

            <div className="mt-6">
              <MessageBox
                content={messageContent}
                onContentChange={setMessageContent}
              />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <MessagePreview
            preview={preview}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}