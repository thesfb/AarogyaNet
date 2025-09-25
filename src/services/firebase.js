import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// PASTE YOUR FIREBASE CONFIGURATION HERE
const firebaseConfig = {
  apiKey: "AIzaSyAlF6L1h1NSvMXSxW_LwK16yx-vxkDQTR4",
  authDomain: "aarogya-net.firebaseapp.com",
  projectId: "aarogya-net",
  storageBucket: "aarogya-net.firebasestorage.app",
  messagingSenderId: "100755619814",
  appId: "1:100755619814:web:b057bd386d7764728ea027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;