import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import PreferenceCard from './PreferenceCard';

export default function EmailDomainSettings() {
  const [domain, setDomain] = useState('');
  const [currentDomain, setCurrentDomain] = useState('mail.company.com');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('verified');
  const [isSaving, setIsSaving] = useState(false);

  const handleVerify = async () => {
    setVerificationStatus('pending');
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setVerificationStatus('verified');
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentDomain(domain);
    setIsSaving(false);
  };

  return (
    <PreferenceCard
      title="Email Sending Domain"
      description="Configure and verify your email sending domain"
      onSave={handleSave}
      isSaving={isSaving}
    >
      <div className="space-y-4 py-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Sending Domain
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={currentDomain}
              disabled
              className="block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Sending Domain
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain (e.g., mail.yourcompany.com)"
              className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleVerify}
            disabled={!domain}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Verify Domain
          </button>
          <div className="flex items-center">
            {verificationStatus === 'pending' && (
              <span className="text-yellow-600 text-sm">Verification in progress...</span>
            )}
            {verificationStatus === 'verified' && (
              <span className="text-green-600 text-sm">Domain verified</span>
            )}
            {verificationStatus === 'failed' && (
              <span className="text-red-600 text-sm">Verification failed</span>
            )}
          </div>
        </div>

        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">DNS Configuration Required</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Add the following DNS records to verify your domain:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Type: TXT</li>
                  <li>Host: @</li>
                  <li>Value: expressnext-verify=your-verification-code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreferenceCard>
  );
}