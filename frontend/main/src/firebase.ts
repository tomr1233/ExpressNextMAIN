// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCUep-wPKV-vEyi2e6BcuNmvirdGrsJM94',
  authDomain: 'expressnext-8489e.firebaseapp.com',
  projectId: 'expressnext-8489e',
  // etc.
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
// Then you can import { auth } from './firebase'; in other files