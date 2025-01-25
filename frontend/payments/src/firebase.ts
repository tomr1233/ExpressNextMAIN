// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUep-wPKV-vEyi2e6BcuNmvirdGrsJM94",
    authDomain: "expressnext-8489e.firebaseapp.com",
    projectId: "expressnext-8489e",
    storageBucket: "expressnext-8489e.firebasestorage.app",
    messagingSenderId: "5454565370",
    appId: "1:5454565370:web:66730ea7306adb1b131e43",
    measurementId: "G-4YTB8J7S9G"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };