import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Settings, Eye, Code } from 'lucide-react';
import { FormDesign, FormField } from '../types/form';
import FieldEditor from './FieldEditor';
import FormPreview from './FormPreview';
import ThemeCustomizer from './ThemeCustomizer';
import CodeExport from './CodeExport';

const defaultTheme = {
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  buttonColor: '#3b82f6',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '16px',
  buttonStyle: 'rounded' as const,
};

export default function FormBuilder() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'export' | 'savedForms'>('editor');


  const [formDesign, setFormDesign] = useState<FormDesign>({
    id: crypto.randomUUID(),
    name: 'New Form',
    fields: [],
    theme: defaultTheme,
  });

  /**
   * Listen for events from the parent:
   * - "saveForm": Parent is requesting that we save (we dispatch "formSaved" with our current state).
   * - "loadForm": Parent is telling us to load either a JSON file or a saved JSON object.
   */
  useEffect(() => {
    const handleSaveForm = () => {
      // Dispatch a "formSaved" event so the parent can store or list it
      const formSavedEvent = new CustomEvent('formSaved', {
        detail: formDesign,
      });
      window.dispatchEvent(formSavedEvent);
    };

    const handleLoadForm = async (event: Event) => {
      const customEvent = event as CustomEvent;
      const { files, jsonData } = customEvent.detail || {};

      // 1) If there's a file, parse it as JSON
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const loadedForm = JSON.parse(e.target?.result as string);
            if (loadedForm) {
              setFormDesign(loadedForm);
            }
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };
        reader.readAsText(file);
      }

      // 2) If there's JSON data (from a saved form in localStorage), load it directly
      if (jsonData) {
        setFormDesign(jsonData);
      }
    };

    window.addEventListener('saveForm', handleSaveForm);
    window.addEventListener('loadForm', handleLoadForm as EventListener);

    return () => {
      window.removeEventListener('saveForm', handleSaveForm);
      window.removeEventListener('loadForm', handleLoadForm as EventListener);
    };
  }, [formDesign]);

  /**
   * Handle drag-and-drop reordering of fields
   */
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const fields = Array.from(formDesign.fields);
    const [reorderedItem] = fields.splice(result.source.index, 1);
    fields.splice(result.destination.index, 0, reorderedItem);

    setFormDesign({ ...formDesign, fields });
  };

  /**
   * Add a new field of the given type
   */
  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: `New ${type} field`,
      placeholder: '',
      required: false,
    };
    setFormDesign({
      ...formDesign,
      fields: [...formDesign.fields, newField],
    });
  };

  /**
   * Update an existing field
   */
  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormDesign({
      ...formDesign,
      fields: formDesign.fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    });
  };
  
  



  /**
   * Delete a field
   */
  const deleteField = (fieldId: string) => {
    setFormDesign({
      ...formDesign,
      fields: formDesign.fields.filter((field) => field.id !== fieldId),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tabs: Editor | Preview | Export */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeTab === 'editor'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700'
          }`}
        >
          <Settings className="w-4 h-4 mr-2" />
          Editor
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeTab === 'preview'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700'
          }`}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeTab === 'export'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700'
          }`}
        >
          <Code className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {activeTab === 'editor' && (
        <div className="grid grid-cols-12 gap-8">
          {/* Left column: Field editor list + drag-and-drop */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow p-6">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="form-fields">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {formDesign.fields.map((field, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <FieldEditor
                                field={field}
                                onUpdate={(updates) => updateField(field.id, updates)}
                                onDelete={() => deleteField(field.id)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>

          {/* Right column: Add field + theme customizer */}
          <div className="col-span-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Add Field</h3>
              <div className="grid grid-cols-2 gap-4">
                {['text', 'email', 'password', 'select', 'checkbox', 'radio', 'date'].map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => addField(type as FormField['type'])}
                      className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 capitalize"
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
              <div className="mt-8">
                <ThemeCustomizer
                  theme={formDesign.theme}
                  onChange={(theme) =>
                    setFormDesign({ ...formDesign, theme })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="bg-white rounded-lg shadow p-6">
          <FormPreview formDesign={formDesign} />
        </div>
      )}

      {activeTab === 'export' && (
        <div className="bg-white rounded-lg shadow p-6">
          <CodeExport formDesign={formDesign} />
        </div>
      )}
    </div>
  );
}
