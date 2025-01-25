import React, { useState } from 'react';
import { User, CreditCard, Building, Mail, Shield, Wallet, FileText, Settings, MessageSquare } from 'lucide-react';
import SettingsTabs from '../components/UserSettings/Layout/SettingsTabs';
import SettingsSidebar from '../components/UserSettings/Layout/SettingsSidebar';
import UserInformation from '../components/UserSettings/UserInformation';
import PasswordManagement from '../components/UserSettings/PasswordManagement';
import BillingOverview from '../components/UserSettings/Billing/BillingOverview';
import BillingWallet from '../components/UserSettings/Billing/Wallet';
import BillingInformation from '../components/UserSettings/Billing/BillingInformation';
import EmailRecipient from '../components/UserSettings/Billing/EmailRecipient';
import BrandingSettings from '../components/Preferences/BrandingSettings';
import EmailDomainSettings from '../components/Preferences/EmailDomainSettings';
import SMSSettings from '../components/Preferences/SMSSettings';

const accountItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
];

const billingItems = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'billing-info', label: 'Billing Information', icon: Building },
  { id: 'recipients', label: 'Invoice Recipients', icon: Mail },
];

const preferencesItems = [
  { id: 'branding', label: 'Branding', icon: Settings },
  { id: 'email', label: 'Email Settings', icon: Mail },
  { id: 'sms', label: 'SMS Settings', icon: MessageSquare },
];

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState<'account' | 'billing' | 'preferences'>('account');
  const [activeSection, setActiveSection] = useState('profile');

  const handleTabChange = (tab: 'account' | 'billing' | 'preferences') => {
    setActiveTab(tab);
    setActiveSection(
      tab === 'account' ? 'profile' : 
      tab === 'billing' ? 'overview' : 
      'branding'
    );
  };

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'account':
        return accountItems;
      case 'billing':
        return billingItems;
      case 'preferences':
        return preferencesItems;
      default:
        return accountItems;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      // Account sections
      case 'profile':
        return <UserInformation />;
      case 'security':
        return <PasswordManagement />;
      
      // Billing sections
      case 'overview':
        return <BillingOverview />;
      case 'wallet':
        return <BillingWallet />;
      case 'billing-info':
        return <BillingInformation />;
      case 'recipients':
        return <EmailRecipient />;
      
      // Preferences sections
      case 'branding':
        return <BrandingSettings />;
      case 'email':
        return <EmailDomainSettings />;
      case 'sms':
        return <SMSSettings />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <SettingsTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        <div className="flex gap-8">
          <SettingsSidebar
            items={getCurrentItems()}
            activeItem={activeSection}
            onItemClick={setActiveSection}
          />
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}