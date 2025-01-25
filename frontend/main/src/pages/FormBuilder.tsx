import React, { useEffect, useState } from 'react';
import { Save, Upload } from 'lucide-react';
import FormBuilder from '../components/FormBuilder/FormBuilder';

export default function FormBuild() {
  const [activeTab, setActiveTab] = useState<'editor' | 'saved'>('editor');
  const [savedForms, setSavedForms] = useState<any[]>([]);

  useEffect(() => {
    // On mount, load any saved forms from localStorage
    const storedForms = JSON.parse(localStorage.getItem('savedForms') || '[]');
    setSavedForms(storedForms);

    // Listen for the formSaved event from FormBuilder
    function handleFormSaved(e: CustomEvent) {
      const newFormData = e.detail; // detail contains the form data
      setSavedForms((prev) => {
        const updated = [...prev, newFormData];
        localStorage.setItem('savedForms', JSON.stringify(updated));
        return updated;
      });
    }

    window.addEventListener('formSaved', handleFormSaved as EventListener);

    return () => {
      window.removeEventListener('formSaved', handleFormSaved as EventListener);
    };
  }, []);

  // Dispatch a custom saveForm event — FormBuilder listens to this and then
  // dispatches formSaved with the final JSON.
  const handleSave = () => {
    const saveEvent = new CustomEvent('saveForm');
    window.dispatchEvent(saveEvent);
  };

  // Load the selected form by dispatching a loadForm event with the JSON data.
  // FormBuilder should listen for loadForm and update its state accordingly.
  const handleLoadSelected = (formData: any) => {
    const loadEvent = new CustomEvent('loadForm', {
      detail: { jsonData: formData },
    });
    window.dispatchEvent(loadEvent);

    // Switch to the "editor" tab to see the loaded form
    setActiveTab('editor');
  };

  // When a user selects a .json file, dispatch loadForm event with the file object
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const loadEvent = new CustomEvent('loadForm', {
      detail: { files },
    });
    window.dispatchEvent(loadEvent);

    // Optionally switch to editor tab
    setActiveTab('editor');
  };

  // Delete a saved form (by index)
  const handleDeleteForm = (indexToRemove: number) => {
    setSavedForms((prevForms) => {
      const updated = [...prevForms];
      updated.splice(indexToRemove, 1);
      localStorage.setItem('savedForms', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP NAVBAR (common to both tabs) */}
      <nav className="bg-gray-50 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <h1 className="text-2xl font-bold text-gray-900">Form Builder</h1>
          <div className="flex space-x-4">
            {/* SAVE BUTTON (only relevant in Editor tab, but can stay globally accessible) */}
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>

            {/* LOAD BUTTON (from file) */}
            <label className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Load from file
              <input
                type="file"
                className="hidden"
                accept=".json"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
          </div>
        </div>
      </nav>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex space-x-4 border-b border-gray-300 mb-4">
          <button
            className={`py-2 px-3 ${
              activeTab === 'editor' ? 'border-b-2 border-blue-600 font-semibold' : ''
            }`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button
            className={`py-2 px-3 ${
              activeTab === 'saved' ? 'border-b-2 border-blue-600 font-semibold' : ''
            }`}
            onClick={() => setActiveTab('saved')}
          >
            Saved Forms
          </button>
        </div>

        {/* RENDER BASED ON ACTIVE TAB */}
        {activeTab === 'editor' ? (
          <div>
            <FormBuilder />
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-2">Saved Forms</h2>
            {savedForms.length === 0 ? (
              <p className="text-gray-500">No forms saved yet.</p>
            ) : (
              <ul className="list-disc list-inside">
                {savedForms.map((formData, index) => (
                  <li key={index} className="mb-2">
                    <strong>Form #{index + 1}</strong>
                    <button
                      onClick={() => handleLoadSelected(formData)}
                      className="inline-flex items-center px-2 py-1 ml-2 text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                    >
                      Load this form
                    </button>
                    <button
                      onClick={() => handleDeleteForm(index)}
                      className="inline-flex items-center px-2 py-1 ml-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
