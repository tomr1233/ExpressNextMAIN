import React from 'react';
import { Settings, Bell, LogOut } from 'lucide-react';
import UserMenuItem from './UserMenuItem';
import UserAvatar from './UserAvatar';
// Make sure these imports match your Firebase setup:
import { getAuth, signOut } from 'firebase/auth';

interface UserMenuDropdownProps {
  username: string;
  onClose: () => void;
}

export default function UserMenuDropdown({ username, onClose }: UserMenuDropdownProps) {
  const handleLogout = async () => {
    try {
      const auth = getAuth();   // or however you access your Auth instance
      await signOut(auth);
      console.log('Successfully logged out from Firebase!');
      onClose();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="absolute bottom-full left-0 mb-2 ml-3 w-56 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="border-b border-gray-100 px-4 py-3">
        <div className="flex items-center">
          <UserAvatar name={username} size="lg" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{username}</p>
            <p className="text-xs text-gray-500">View Profile</p>
          </div>
        </div>
      </div>
      <div className="py-1">
        <UserMenuItem
          icon={Settings}
          label="User Settings"
          href="/settings/account"
        />
        <UserMenuItem
          icon={Bell}
          label="What's New"
          href="/whats-new"
        />
        <UserMenuItem
          icon={LogOut}
          label="Log Out"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}