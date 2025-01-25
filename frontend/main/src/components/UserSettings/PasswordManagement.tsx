import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import SettingsCard from './SettingsCard';

export default function PasswordManagement() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isValid = oldPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  const handleSave = async () => {
    if (!isValid) return;
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Reset form
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const PasswordInput = ({ 
    value, 
    onChange, 
    show, 
    onToggleShow, 
    placeholder 
  }: { 
    value: string;
    onChange: (value: string) => void;
    show: boolean;
    onToggleShow: () => void;
    placeholder: string;
  }) => (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
      <button
        type="button"
        onClick={onToggleShow}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        {show ? (
          <EyeOff className="h-4 w-4 text-gray-400" />
        ) : (
          <Eye className="h-4 w-4 text-gray-400" />
        )}
      </button>
    </div>
  );

  return (
    <SettingsCard
      title="Password"
      description="Update your password"
      onSave={handleSave}
      isSaving={isSaving}
      saveDisabled={!isValid}
    >
      <div className="space-y-6 py-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <div className="mt-1">
            <PasswordInput
              value={oldPassword}
              onChange={setOldPassword}
              show={showOldPassword}
              onToggleShow={() => setShowOldPassword(!showOldPassword)}
              placeholder="Enter your current password"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="mt-1">
            <PasswordInput
              value={newPassword}
              onChange={setNewPassword}
              show={showNewPassword}
              onToggleShow={() => setShowNewPassword(!showNewPassword)}
              placeholder="Enter your new password"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <div className="mt-1">
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirmPassword}
              onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Confirm your new password"
            />
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              Passwords do not match
            </p>
          )}
        </div>
      </div>
    </SettingsCard>
  );
}