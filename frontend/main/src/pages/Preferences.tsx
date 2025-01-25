import React from 'react';
import BrandingSettings from '../components/Preferences/BrandingSettings';
import EmailDomainSettings from '../components/Preferences/EmailDomainSettings';
import SMSSettings from '../components/Preferences/SMSSettings';

export default function Preferences() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Preferences</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your messaging and email settings to align with your brand and communication preferences.
        </p>
      </div>

      <div className="space-y-8">
        <BrandingSettings />
        <EmailDomainSettings />
        <SMSSettings />
      </div>
    </div>
  );
}