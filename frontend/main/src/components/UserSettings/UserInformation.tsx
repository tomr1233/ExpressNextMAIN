import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import SettingsCard from './SettingsCard';
import UserAvatar from '../UserMenu/UserAvatar';

// A simple modal for demonstration purposes
function PhoneVerificationModal({ onClose }) {
  // Local state to hold the phone number input
  const [phoneInput, setPhoneInput] = useState('');

  const handleVerifyPhone = async () => {
    // 1) Use Firebase RecaptchaVerifier + signInWithPhoneNumber, etc.
    // 2) Prompt user for the 6-digit OTP
    // 3) On successful verification, update Firestore
    // For brevity, we won't implement the full flow here

    // Example: after verifying successfully, close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Verify Phone Number</h2>
        <p className="mb-2 text-sm text-gray-600">
          Enter your phone number to verify
        </p>
        <input
          type="tel"
          value={phoneInput}
          onChange={(e) => setPhoneInput(e.target.value)}
          placeholder="+1 555-555-5555"
          className="mb-4 w-full rounded border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleVerifyPhone}
            className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserInformation() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false); // track verification status
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Controls whether the phone verification modal is open
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setDisplayName(data.displayName || '');
            setEmail(data.email || '');
            setPhone(data.phone || '');
            setPhoneVerified(data.phoneVerified || false);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          displayName,
          // If phone changes, you'd update it here too
        });
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Example function that might be called once the phone is successfully verified
  const handlePhoneVerified = async (verifiedNumber) => {
    setShowPhoneModal(false);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        // Save the new phone and mark it verified
        await updateDoc(userDocRef, {
          phone: verifiedNumber,
          phoneVerified: true,
        });
        setPhone(verifiedNumber);
        setPhoneVerified(true);
      }
    } catch (error) {
      console.error('Error verifying phone:', error);
    }
  };

  // Render a loading skeleton or spinner while fetching data
  if (isLoading) {
    return (
      <SettingsCard title="Information" description="Loading user data...">
        <div className="p-4 text-center">
          <div className="mb-2 h-5 w-1/2 animate-pulse rounded bg-gray-200"></div>
          <div className="mb-2 h-5 w-1/3 animate-pulse rounded bg-gray-200"></div>
          <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-gray-200"></div>
        </div>
      </SettingsCard>
    );
  }

  return (
    <>
      <SettingsCard
        title="Information"
        description="Update your profile information"
        onSave={handleSave}
        isSaving={isSaving}
      >
        <div className="space-y-6 py-4">
          {/* Avatar & Display Name */}
          <div className="flex items-center space-x-4">
            <UserAvatar name={displayName || 'User'} size="lg" />
            <div>
              <p className="text-sm font-medium text-gray-700">Profile Photo</p>
              <p className="text-sm text-gray-500">
                Your name's initials will be used as your profile photo
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">
                This name will be visible to your team
              </p>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                type="email"
                value={email}
                disabled
                className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Phone Number + "Verify" Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="tel"
                value={phone}
                disabled
                className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {/* Only show the link if there's no phone or the phone isn't verified */}
              {(!phone || !phoneVerified) && (
                <button
                  onClick={() => setShowPhoneModal(true)}
                  className="text-blue-600 hover:underline"
                >
                  {phone ? 'Verify Phone' : 'Add Phone'}
                </button>
              )}
            </div>
          </div>
        </div>
      </SettingsCard>

      {/* Conditionally render the PhoneVerificationModal */}
      {showPhoneModal && (
        <PhoneVerificationModal
          onClose={() => setShowPhoneModal(false)}
          // If you want to handle phone verified in the modal itSelf/Basic,
          // pass a callback here:
          // onPhoneVerified={handlePhoneVerified}
        />
      )}
    </>
  );
}
