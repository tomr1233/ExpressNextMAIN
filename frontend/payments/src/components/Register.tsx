import React, { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // <-- ADD THIS
import { auth, db } from '../firebase'; // <-- ASSUMING YOU HAVE db EXPORTED FROM YOUR FIREBASE CONFIG
import { useNavigate } from 'react-router-dom';

/* -----------------------------------------------
 *  Logo (same design)
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
 *  GoogleButton
 * ---------------------------------------------*/
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
      <span>Sign up with Google</span>
    </button>
  );
}

/* -----------------------------------------------
 *  TextInput
 *  (Generic version used for First Name, Last Name, Phone, etc.)
 * ---------------------------------------------*/
interface TextInputProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // optional
}

function TextInput({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border 
            ${error ? 'border-red-300' : 'border-gray-300'}
            rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          `}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

/* -----------------------------------------------
 *  Button (Primary Action)
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
 *  Main Register Component
 * ---------------------------------------------*/
export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // We'll store general errors in a single string for simplicity
  const [error, setError] = useState('');
  
  // New state for success message
  const [successMessage, setSuccessMessage] = useState('');

  /* --------------------------------------------
   *  Sign up with Google
   *  (Firebase treats it as sign-in; if the account
   *   doesn't exist, it auto-creates it)
   * ------------------------------------------*/
  const handleGoogleSignUp = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Extract user from the sign-in result
      const user = result.user;

      // Attempt to parse user's displayName into first & last names
      let googleFirstName = '';
      let googleLastName = '';
      if (user.displayName) {
        const nameParts = user.displayName.split(' ');
        googleFirstName = nameParts[0] || '';
        googleLastName = nameParts[1] || '';
      }

      // Create a document in Firestore named after the user.uid
      await setDoc(doc(db, 'users', user.uid), {
        firstName: googleFirstName,
        lastName: googleLastName,
        email: user.email,
      });

      // Then navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  /* --------------------------------------------
   *  Create user with Email & Password
   *  and post data to the webhook
   * ------------------------------------------*/
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!firstName) {
      setError('First name is required');
      return;
    }
    if (!lastName) {
      setError('Last name is required');
      return;
    }
    if (!phone) {
      setError('Phone is required');
      return;
    }
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
      // Firebase user creation
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      const uid = user.uid;

      // Send form data + UID to your webhook
      await fetch('https://hook.us1.make.com/zd46m9xot55hyn88yn8hmctt6l7cjo14', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          uid,
        }),
      });

      // Set success message
      setSuccessMessage('Registration successful! Redirecting to dashboard...');
      
      // Optionally, you can clear the form fields
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setPassword('');

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
        window.location.reload(); // Reload the page after redirection
      }, 3000);

      console.log(`Successfully registered user with UID: ${uid}`);
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
          <h2 className="mt-6 text-2xl font-bold">Create your ExpressNext account</h2>
        </div>

        <div className="mt-8 space-y-6">
          {/* Sign up with Google */}
          <GoogleButton onClick={handleGoogleSignUp} />

          {/* Display Success Message */}
          {successMessage && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {/* Email/Password Form */}
          {/* Optionally hide the form if successMessage is present */}
          {!successMessage && (
            <form onSubmit={handleEmailSubmit} className="mt-8 space-y-4">
              {/* First Name */}
              <TextInput
                id="firstName"
                label="First name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={error.includes('First name') ? error : undefined}
              />
              {/* Last Name */}
              <TextInput
                id="lastName"
                label="Last name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={error.includes('Last name') ? error : undefined}
              />
              {/* Phone */}
              <TextInput
                id="phone"
                label="Phone"
                type="tel"
                placeholder="(555) 555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={error.includes('Phone') ? error : undefined}
              />
              {/* Email */}
              <TextInput
                id="email"
                label="Company email"
                type="email"
                placeholder="email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error.includes('Email') ? error : undefined}
              />
              {/* Password */}
              <TextInput
                id="password"
                label="Password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error.includes('Password') ? error : undefined}
              />

              {/* If error is not specifically about any single field, show here */}
              {error &&
                !(
                  error.includes('First name') ||
                  error.includes('Last name') ||
                  error.includes('Phone') ||
                  error.includes('Email') ||
                  error.includes('Password')
                ) && <p className="mt-1 text-sm text-red-600">{error}</p>}

              <Button type="submit">Sign up with company email</Button>
            </form>
          )}

          {/* Already have an account? */}
          <div className="text-center">
            <a 
              href="/login" 
              className="text-gray-600 hover:text-gray-900"
            >
              Already have an account? Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
