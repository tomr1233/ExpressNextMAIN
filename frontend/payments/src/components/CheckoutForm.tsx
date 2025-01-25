import React, { useEffect, useState } from 'react';
import { PricingPlan } from '../data/pricingPlans';
import { calculatePrice } from '../utils/pricing';

interface CheckoutFormProps {
  plan: PricingPlan;
  isAnnual: boolean;
  onClose: () => void;
  onSubmit: (formData: CheckoutFormData) => void;
  userUid: string | null;
}

export interface CheckoutFormData {
  // Define any necessary data fields here
  userUid: string | null;
  planTitle: string;
  planTokens: string;
  isAnnual: boolean;
}

export function CheckoutForm({
  plan,
  isAnnual,
  onClose,
  onSubmit,
  userUid,
}: CheckoutFormProps) {
  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successCustomerID, setSuccessCustomerID] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sendDataToWebhook = async () => {
      try {
        const response = await fetch(
          'https://hook.us1.make.com/3z6677a6lqq8dja69sihvyi5ts13d89i',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userUid,
              planTitle: plan.title,
              planTokens: plan.tokens,
              isAnnual,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Webhook request failed');
        }

        const data = await response.json();
        console.log('Webhook response:', data);

        if (data.customerID) {
          setSuccessCustomerID(data.customerID);
          setShowSuccessPopup(true);
        } else {
          // If no customerID, proceed with onSubmit or handle accordingly
          onSubmit({
            userUid,
            planTitle: plan.title,
            planTokens: plan.tokens,
            isAnnual,
          });
        }
      } catch (err) {
        console.error('Error sending data to webhook:', err);
        setError('There was an issue processing your request. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    sendDataToWebhook();
  }, [userUid, plan, isAnnual, onSubmit]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-lg p-6 max-w-md w-full relative">
        {/* Close button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Processing Your Purchase</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            ×
          </button>
        </div>

        {/* Content based on state */}
        {loading && (
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="text-zinc-300">Processing your purchase...</p>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center">
            <p>{error}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        )}

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
              <h2 className="text-lg font-semibold text-green-400">
                Success!
              </h2>
              <p className="mt-2 text-sm text-zinc-300">
                Your new Stripe customer ID is:
                <span className="font-medium text-white"> {successCustomerID}</span>
              </p>
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  onClose();
                }}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
