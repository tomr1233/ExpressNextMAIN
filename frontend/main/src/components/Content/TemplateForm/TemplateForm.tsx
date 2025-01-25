import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Template, TemplateFormData, TemplateType, TemplateStatus } from '../../../types/template';
import TemplateEditor from './TemplateEditor';

interface TemplateFormProps {
  type: TemplateType;
  template?: Template;                // If defined, we're editing
  isOpen: boolean;
  onClose: () => void;
  // If you want to let the parent handle the save, you can remove the fetch logic below
  // and rely on this callback. But here we still do the fetch in this component for example’s sake.
  onSave: (data: TemplateFormData & { uid: string }) => void;
}

export default function TemplateForm({
  type,
  template,
  isOpen,
  onClose,
  onSave,
}: TemplateFormProps) {
  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    subject: type === 'email' ? '' : undefined,
    content: '',
    tags: [],
    status: 'draft',
  });

  // Keep track of the current user's UID
  const [userUID, setUserUID] = useState<string | null>(null);

  // 1. On mount, or when the `template` prop changes, sync form data
  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        // Some templates (e.g. 'message') might not have a subject, so handle safely:
        subject: template.subject ?? (type === 'email' ? '' : undefined),
        content: template.content,
        tags: template.tags,
        status: template.status,
      });
    } else {
      // If creating new, reset fields
      setFormData({
        name: '',
        subject: type === 'email' ? '' : undefined,
        content: '',
        tags: [],
        status: 'draft',
      });
    }
  }, [template, type]);

  // 2. Get the logged-in user’s UID
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserUID(currentUser.uid);
    }
  }, []);

  if (!isOpen) return null;

  // 3. Submit logic: if `template` exists, we update; otherwise, we create
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!userUID) {
      toast.error('User is not authenticated. Please log in.');
      return;
    }
  
    // Decide which webhook to call
    let webhookUrl = 'https://hook.us1.make.com/9dzc1nde38exyyfs3x74cqnbqf7scmsq';
    if (template && template.id) {
      // If we're editing
      webhookUrl = 'https://hook.us1.make.com/mgc6xr5su7lh23wiod4ga5x5mm71rxyr';
    }
  
    // Build the data
    const dataToSend: any = {
      ...formData,
      uid: userUID,
      type,
    };
  
    if (template?.id) {
      dataToSend.id = template.id;
    }
  
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      if (!template?.id) {
        // This is a creation scenario; upon success, reload the page.
        toast.success('Template created successfully...');
        // Small delay so user sees the toast before reload
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // For an edit, you can either also reload, or just close.
        toast.success('Template updated successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Error sending template:', error);
      toast.error('Failed to save template. Please try again.');
    }
  };

  return (
    <>
      {/* ToastContainer must be included in the component tree */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
        <div className="fixed inset-y-0 right-0 w-[600px] bg-white shadow-xl">
          <div className="h-full flex flex-col">
            {/* HEADER */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  {template ? 'Edit Template' : 'Create Template'}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 
                               shadow-sm focus:border-blue-500 focus:ring-blue-500 
                               sm:text-sm p-3 text-base bg-gray-100 hover:bg-white"
                    placeholder="Enter the template name"
                    required
                  />
                </div>

                {/* SUBJECT (only if type === 'email') */}
                {type === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      value={formData.subject ?? ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subject: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 
                                 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                                 sm:text-sm"
                      required
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <TemplateEditor
                    type={type}
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                  />
                </div>

                {/* TAGS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value.split(',').map((tag) => tag.trim()),
                      })
                    }
                    placeholder="Separate tags with commas"
                    className="mt-1 block w-full rounded-md border-gray-300 
                               shadow-sm focus:border-blue-500 focus:ring-blue-500 
                               sm:text-sm"
                  />
                </div>

                {/* STATUS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as TemplateStatus,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 
                               shadow-sm focus:border-blue-500 focus:ring-blue-500 
                               sm:text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>
            </form>

            {/* FOOTER ACTIONS */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                             rounded-md hover:bg-blue-700"
                >
                  {template ? 'Update Template' : 'Save Template'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
