import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDj9z05dlINR9gyeG2tyOdbaiotHFqNN98",
  authDomain: "yarik-c747f.firebaseapp.com",
  projectId: "yarik-c747f",
  storageBucket: "yarik-c747f.firebasestorage.app",
  messagingSenderId: "1012999748050",
  appId: "1:1012999748050:web:d11addc7c7e1e699cf300b",
  measurementId: "G-SN1KNM9JGL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);