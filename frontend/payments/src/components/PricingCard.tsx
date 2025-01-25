import React, { useState } from 'react';
import { Bolt, Check } from 'lucide-react';
import { calculatePrice } from '../utils/pricing';
import { CheckoutForm } from './CheckoutForm';
import { createCheckoutSession } from '../services/stripe';
import type { PricingPlan } from '../data/pricingPlans';

interface PricingCardProps {
  user: {
    uid: string;
    email: string;
  } | null;
  title: string;
  tokens: string;
  originalTokens?: string;
  basePrice: number;
  isAnnual: boolean;
  buttonText: string;
  features: string[];
  onPlanClick?: (title: string) => void;
}

export function PricingCard({
  user,
  title,
  tokens,
  originalTokens,
  features,
  basePrice,
  isAnnual,
  buttonText,
  onPlanClick,
}: PricingCardProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const price = calculatePrice(basePrice, isAnnual);

  const handleCardClick = () => {
    onPlanClick?.(title);
  };

  const handleUpgrade = async () => {
    if (!user) {
      console.log('No user found. Please sign in first.');
      return;
    }

    setLoading(true); // Show loading indicator
    try {
      const response = await fetch(
        'https://hook.us1.make.com/8twbqbmdsi0b9stfjwhd6v0v0gcrh6jg',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not OK');
      }

      const data = await response.json();

      if (data.customerID) {
        try {
          const portalResponse = await fetch(
            'https://hook.us1.make.com/hmjfar6woupntqcohcyt8gb2kmj1pq78',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid: user.uid,
              }),
            }
          );

          if (!portalResponse.ok) {
            throw new Error('Network response was not OK (portal)');
          }

          const portalData = await portalResponse.json();
          if (portalData.portalLink) {
            console.log('Redirecting to the portal link:', portalData.portalLink);
            window.location.href = portalData.portalLink;
          } else {
            console.log('No portal link returned. Showing checkout as fallback.');
            setShowCheckout(true);
          }
        } catch (portalError) {
          console.error('Error fetching portal link:', portalError);
          setShowCheckout(true);
        }
      } else {
        setShowCheckout(true);
      }
    } catch (error) {
      console.error('Error fetching Stripe customerID:', error);
      setShowCheckout(true);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleCheckoutSubmit = async (formData: CheckoutFormData) => {
    try {
      await createCheckoutSession(
        { title, tokens, basePrice, features, buttonText },
        isAnnual,
        formData
      );
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <>
      <div
        className="bg-zinc-900 rounded-lg p-6 flex flex-col h-full cursor-pointer transition-colors hover:bg-zinc-800"
        onClick={handleCardClick}
      >
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Bolt size={20} className="text-zinc-400" />
            <span className="text-emerald-400">{tokens}</span>
            {originalTokens && (
              <span className="text-zinc-500 line-through">{originalTokens}</span>
            )}
          </div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-zinc-400">
                <Check size={16} className="mt-1 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-2xl">$</span>
              <span className="text-5xl font-semibold">{price}</span>
              <span className="text-zinc-400 ml-1">/ month</span>
            </div>
            <div className="text-zinc-500 mt-1">
              Billed {isAnnual ? 'yearly' : 'monthly'}
            </div>
          </div>

          <button
            className={`w-full ${
              loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-md py-2 transition-colors`}
            onClick={(event) => {
              event.stopPropagation();
              handleUpgrade();
            }}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Loading...' : buttonText} {/* Show loading text */}
          </button>
        </div>
      </div>

      {showCheckout && (
        <CheckoutForm
          plan={{ title, tokens, basePrice, features, buttonText }}
          isAnnual={isAnnual}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckoutSubmit}
          userUid={user?.uid || null}
        />
      )}
    </>
  );
}
