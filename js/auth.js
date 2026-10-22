import { auth } from './firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function requireAuth() {
  onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (!user && currentPage !== 'login.html') {
      window.location.href = 'login.html';
    }
    if (user && currentPage === 'login.html') {
      window.location.href = 'index.html';
    }
  });
}