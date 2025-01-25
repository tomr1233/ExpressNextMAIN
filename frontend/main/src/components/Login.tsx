import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

/* ------------------------------------------------------------------
 *  Logo
 * ----------------------------------------------------------------*/
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

/* ------------------------------------------------------------------
 *  GoogleButton
 * ----------------------------------------------------------------*/
function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 px-4 py-2 
      border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 
      hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
      focus:ring-indigo-500"
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Log in with Google</span>
    </button>
  );
}

/* ------------------------------------------------------------------
 *  EmailInput
 * ----------------------------------------------------------------*/
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

/* ------------------------------------------------------------------
 *  PasswordInput
 * ----------------------------------------------------------------*/
interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function PasswordInput({ value, onChange, error }: PasswordInputProps) {
  return (
    <div>
      <label htmlFor="password" className="block text-sm text-gray-700">
        Password
      </label>
      <div className="mt-1">
        <input
          id="password"
          name="password"
          type="password"
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border 
            ${error ? 'border-red-300' : 'border-gray-300'}
            rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          `}
          placeholder="********"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------
 *  Button (Primary Action)
 * ----------------------------------------------------------------*/
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

/* ------------------------------------------------------------------
 *  Main Login Component
 * ----------------------------------------------------------------*/
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // We'll store errors for either email or password in a single string
  const [error, setError] = useState('');

  /* --------------------------------------------
   *  Sign in with Google
   * ------------------------------------------*/
  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // On success, you'd typically redirect or rely on your global auth listener.
    } catch (err: any) {
      setError(err.message);
    }
  };

  /* --------------------------------------------
   *  Sign in with Email & Password
   * ------------------------------------------*/
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login button clicked');
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    setError('');
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign-in successful');
      navigate('/dashboard'); // Use `/dashboard` instead of `dashboard`
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setError(err.message);
    }
  };
  
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-2xl font-bold">Log in to ExpressNext</h2>
        </div>

        <div className="mt-8 space-y-6">
          {/* Log in with Google */}
          <GoogleButton onClick={handleGoogleSignIn} />

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSubmit} className="mt-8 space-y-4">
            <EmailInput 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              error={error.includes('Email') ? error : undefined}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error.includes('Password') ? error : undefined}
            />
            {error && !error.includes('Email') && !error.includes('Password') && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
            <Button type="submit">Log in with company email</Button>
          </form>

          <div className="text-center">
  <a 
    href="/forgot-password"
    className="text-gray-600 hover:text-gray-900"
  >
    Forgot Password?
  </a>
</div>


          {/* Sign up Link */}
          <div className="text-center">
            <a 
              href="/register" 
              className="text-gray-600 hover:text-gray-900"
            >
              Sign up for free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
