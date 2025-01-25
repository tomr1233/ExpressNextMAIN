import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {
  Template,
  TemplateType,
  TemplateStatus,
  TemplateFormData,
} from '../types/template';

import ContentHeader from '../components/Content/ContentHeader';
import TemplateListHeader from '../components/Content/TemplateList/TemplateListHeader';
import TemplateListItem from '../components/Content/TemplateList/TemplateListItem';
import TemplateForm from '../components/Content/TemplateForm/TemplateForm';

// Example skeleton component for a single list item
function TemplateListItemSkeleton() {
  return (
    <div className="p-4 flex animate-pulse items-center space-x-3">
      <div className="w-12 h-12 bg-gray-200 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function Content() {
  // State for storing templates
  const [templates, setTemplates] = useState<Template[]>([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Store the current user to get their UID
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Other UI states
  const [activeTab, setActiveTab] = useState<TemplateType>('message');
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TemplateStatus | ''>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | undefined>();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user || null);

      if (user?.uid) {
        setIsLoading(true);

        try {
          // Fetch the templates from your Make.com "get templates" scenario
          const response = await fetch(
            'https://hook.us1.make.com/mtmqddrfbaqyhitypxvh6oy9yw9afo17',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ uid: user.uid }),
            }
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json(); // Array of Firestore docs
          console.log('Make.com response for templates:', data);

          // Map data into Template[]
          const mappedTemplates: Template[] = data.map((doc: any) => {
            const { fields, name, createTime, updateTime } = doc;
            return {
              id: name.split('/').pop() || '',
              name: fields.name?.stringValue || '',
              content: fields.content?.stringValue || '',
              status: fields.status?.stringValue as TemplateStatus || 'draft',
              tags: fields.tags?.stringValue
                ? fields.tags.stringValue.split(',').map((t: string) => t.trim())
                : [],
              type: 'message', // or pull from Firestore if you store it
              createdAt: createTime,
              updatedAt: updateTime,
            };
          });

          setTemplates(mappedTemplates);
        } catch (err) {
          console.error('Error fetching templates:', err);
        } finally {
          setIsLoading(false);
        }
      } else {
        // If user logs out or no user, clear the list
        setTemplates([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Filter logic
  const filteredTemplates = templates.filter((template) => {
    const matchesType = template.type === activeTab;
    const matchesSearch =
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.content.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !selectedStatus || template.status === selectedStatus;
    return matchesType && matchesSearch && matchesStatus;
  });

  // Handlers
  const handleCreateTemplate = () => {
    setSelectedTemplate(undefined);
    setIsFormOpen(true);
  };

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsFormOpen(true);
  };

  const handleDuplicateTemplate = (template: Template) => {
    const duplicatedTemplate = {
      ...template,
      id: `${template.id}-copy`,
      name: `${template.name} (Copy)`,
      status: 'draft' as TemplateStatus,
    };
    console.log('Duplicating template:', duplicatedTemplate);
    // ...Call Make or Firestore to actually create the duplicated doc
  };

  /**
   * Actually delete the template from Firestore (via Make.com) 
   * and remove it from local state.
   */
  const handleDeleteTemplate = async (template: Template) => {
    if (!currentUser?.uid) return;

    console.log('Attempting to delete template:', template.id);
    setIsLoading(true);

    try {
      // Example: calling a Make.com webhook to delete from Firestore
      const deleteResponse = await fetch(
        'https://hook.us1.make.com/ix9yhd8dnd4tkb1eddtgne21ydummg94',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: currentUser.uid,
            templateId: template.id,
          }),
        }
      );

      if (!deleteResponse.ok) {
        throw new Error('Make.com delete scenario failed');
      }

      // Remove it from local state
      setTemplates((prev) => prev.filter((t) => t.id !== template.id));
      console.log('Template deleted successfully:', template.id);
    } catch (err) {
      console.error('Error deleting template:', err);
      // Optionally show an error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTemplate = (data: TemplateFormData) => {
    // ... Save your template in Firestore or via Make
    console.log('Saving template:', data);
    setIsFormOpen(false);
  };

  return (
    <div className="p-8">
      <ContentHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateTemplate={handleCreateTemplate}
      />

      <div className="bg-white shadow rounded-lg">
        <TemplateListHeader
          search={search}
          onSearchChange={setSearch}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <div className="divide-y divide-gray-200">
          {/* Show skeletons while loading */}
          {isLoading && (
            <>
              <TemplateListItemSkeleton />
              <TemplateListItemSkeleton />
              <TemplateListItemSkeleton />
            </>
          )}

          {/* Show filtered templates if not loading */}
          {!isLoading && filteredTemplates.length > 0 && (
            filteredTemplates.map((template) => (
              <TemplateListItem
                key={template.id}
                template={template}
                onEdit={handleEditTemplate}
                onDuplicate={handleDuplicateTemplate}
                onDelete={handleDeleteTemplate}  // <-- calls our new function
              />
            ))
          )}

          {/* Show empty state if not loading and no templates found */}
          {!isLoading && filteredTemplates.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No templates found. Create a new one to get started.
            </div>
          )}
        </div>
      </div>

      <TemplateForm
        type={activeTab}
        template={selectedTemplate}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveTemplate}
      />
    </div>
  );
}
