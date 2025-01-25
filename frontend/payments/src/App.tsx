import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/firebase'; // import our auth from firebaseConfig

import { PricingHeader } from './components/PricingHeader';
import { PricingToggle } from './components/PricingToggle';
import { PricingCard } from './components/PricingCard';
import { EnterpriseCTA } from './components/EnterpriseCTA';
import { CurrentPlan } from './components/CurrentPlan';
import { pricingPlans } from './data/pricingPlans';
import { FeaturesTable } from './components/FeaturesTable';
import { usePlanHighlight } from './hooks/usePlanHighlight';
import { useNavigate } from 'react-router-dom';


function App() {
  const { highlightedPlan, highlightPlan } = usePlanHighlight();
  const [annualBilling, setAnnualBilling] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const navigate = useNavigate();



  // Track the auth state (user signed in / out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        navigate('/login')
      }
    });
    return () => unsubscribe();
  }, []);

  // Whenever user is not null, send UID and email to Make.com webhook
  useEffect(() => {
    if (user) {
      fetch('https://hook.us1.make.com/8twbqbmdsi0b9stfjwhd6v0v0gcrh6jg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }
          return response.text();
        })
        .then((data) => {
          console.log('Webhook response:', data);
        })
        .catch((error) => {
          console.error('Error sending user data to webhook:', error);
        });
    }
  }, [user]);

  // Example sign-in function (with email & password)
  const handleSignIn = () => {
    const email = 'testuser@example.com';
    const password = 'somePassword123';

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in user:', userCredential.user);
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
      });
  };

  // Example sign-out function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

  // Compute user initials, e.g. from email
  // You could also derive this from user.displayName if available.
  const getUserInitials = (user: any) => {
    if (!user) return '';

    // Example: Use the first two letters of the email’s username part
    // e.g. "john.doe@example.com" => "JD"
    const email = user.email || '';
    const usernamePart = email.split('@')[0]; // "john.doe"
    // Split by non-alphabetic, map to uppercase, take first letter of each
    const initials = usernamePart
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .map((part: string) => part[0].toUpperCase())
      .slice(0, 2)
      .join('');

    return initials;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Show Sign In button if not logged in */}
        {!user && (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 px-4 py-2 rounded mb-4"
          >
            Sign In
          </button>
        )}

        {/* Pricing & Content */}
        <PricingHeader tokensLeft="0" resetDays={0} />

        <div className="flex justify-between items-center max-w-5xl mx-auto mb-8">
          <CurrentPlan />
          <PricingToggle
            annualBilling={annualBilling}
            onBillingToggle={setAnnualBilling}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              user={user}
              {...plan}
              isAnnual={annualBilling}
              onPlanClick={() => highlightPlan(plan.title)}
            />
          ))}
        </div>

        <EnterpriseCTA />
        <FeaturesTable highlightedPlan={highlightedPlan} />
      </div>

      {/* Bottom-left user menu (only show if user is logged in) */}
      {user && (
        <div className="fixed bottom-4 left-4">
          {/* Button with user’s initials */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
          >
            {getUserInitials(user)}
          </button>

          {/* The dropdown menu */}
          {isMenuOpen && (
            <div className="mt-2 bg-gray-800 p-2 rounded shadow-xl text-sm">
              <ul className="flex flex-col space-y-2">
                <li>
                  <a
                    href="https://us-1.expressnext.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-gray-700 block px-2 py-1 rounded"
                  >
                    Back to Dashboard
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="hover:bg-gray-700 w-full text-left px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
