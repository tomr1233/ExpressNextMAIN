import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase'; // your Firebase config

/* -----------------------------------------------
 * Logo (same design)
 * ---------------------------------------------*/
function Logo() {
  return (
    <div className="mx-auto w-12 h-12">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          fill="currentColor"
          d="M21.707 11.293l-8-8A.997.997 0 0013 3H4a1 1 0 00-1 1v9c0 .266.105.52.293.707l8 8a.997.997 0 001.414 0l9-9a.999.999 0 000-1.414zM12 19.586l-7-7V5h7.586l7 7-7.586 7.586z"
        />
      </svg>
    </div>
  );
}

/* -----------------------------------------------
 * EmailInput (same design)
 * ---------------------------------------------*/
interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function EmailInput({ value, onChange, error }: EmailInputProps) {
  return (
    <div>
      <label htmlFor="email" className="block text-sm text-gray-700">
        Company email
      </label>
      <div className="mt-1">
        <input
          id="email"
          name="email"
          type="email"
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border
            ${error ? 'border-red-300' : 'border-gray-300'}
            rounded-md shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          `}
          placeholder="email@company.com"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

/* -----------------------------------------------
 * Button (same design)
 * ---------------------------------------------*/
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full flex justify-center py-2 px-4
      border border-transparent rounded-md shadow-sm
      text-sm font-medium text-white bg-black
      hover:bg-gray-900 focus:outline-none
      focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
    </button>
  );
}

/* -----------------------------------------------
 * ForgotPassword Page
 * ---------------------------------------------*/
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Send Firebase reset email
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(`A password reset link has been sent to ${email}.`);
      setEmail(''); // clear the field if you want
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-2xl font-bold">Reset your password</h2>
          <p className="mt-1 text-sm text-gray-600">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Show success message, if any */}
          {message && (
            <p className="text-green-600 text-center font-semibold">{message}</p>
          )}

          {/* Forgot Password Form */}
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error.includes('Email') ? error : undefined}
            />

            {/* If error is not specifically about Email, show it here */}
            {error && !error.includes('Email') && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <Button type="submit">Send reset link</Button>
          </form>

          {/* Link back to Login */}
          <div className="text-center">
            <a 
              href="/login" 
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
