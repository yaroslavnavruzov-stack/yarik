import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ВСТАВЬТЕ СЮДА ВАШИ КЛЮЧИ ИЗ КОНСОЛИ FIREBASE!
// Их можно найти: Project settings (шестеренка) -> General -> Your apps -> Web app
const firebaseConfig = {
  apiKey: "AIzaSy...",             
  authDomain: "my-project.firebaseapp.com", 
  projectId: "my-project",       
  storageBucket: "my-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);