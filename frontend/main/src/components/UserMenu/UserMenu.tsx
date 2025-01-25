import React, { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import UserAvatar from './UserAvatar';
import UserMenuDropdown from './UserMenuDropdown';
import { cn } from '../../utils/classNames';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface UserMenuProps {
  isExpanded?: boolean;
}

export default function UserMenu({ isExpanded = false }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, `users/${user.uid}`);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Accessing the "First name" field from Firestore
            setUsername(userData['firstName'] || 'User');
          } else {
            console.warn('User document does not exist.');
            setUsername('User');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUsername('User');
        }
      } else {
        setUsername(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div ref={menuRef} className="relative mt-auto border-t border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white',
          isExpanded ? 'px-3 py-3' : 'p-2 justify-center'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <UserAvatar name={username || 'User'} size="sm" />
        <span className={cn(
          'ml-3 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
          isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
        )}>
          {username || 'User'}
        </span>
      </button>

      {isOpen && (
        <UserMenuDropdown
          username={username || 'User'}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}