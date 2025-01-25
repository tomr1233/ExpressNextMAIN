import { loadStripe } from '@stripe/stripe-js';
import type { CheckoutFormData } from '../components/CheckoutForm';
import type { PricingPlan } from '../data/pricingPlans';

// Replace with your Stripe public key
const stripePromise = loadStripe('your_publishable_key');

export async function createCheckoutSession(
  plan: PricingPlan,
  isAnnual: boolean,
  formData: CheckoutFormData
) {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to initialize');

  // This would typically be an API call to your backend
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plan,
      isAnnual,
      address: formData
    }),
  });

  const session = await response.json();

  // Redirect to Stripe Checkout
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}