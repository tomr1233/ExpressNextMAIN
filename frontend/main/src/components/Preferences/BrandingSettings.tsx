import React, { useState } from 'react';
import PreferenceCard from './PreferenceCard';
import Toggle from './Toggle';

export default function BrandingSettings() {
  const [brandingEnabled, setBrandingEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <PreferenceCard
      title="Branding Settings"
      description="Customize how your brand appears in messages"
      onSave={handleSave}
      isSaving={isSaving}
    >
      <div className="flex items-center justify-between py-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900">ExpressNext Branding</h4>
          <p className="text-sm text-gray-500">
            When enabled, messages will include 'Powered by ExpressNext' at the footer
          </p>
        </div>
        <Toggle
          enabled={brandingEnabled}
          onChange={setBrandingEnabled}
        />
      </div>
    </PreferenceCard>
  );
}