// js/auth.js
import { auth } from './firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

// Функция входа
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Функция регистрации
export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Функция выхода
export function logout() {
  return signOut(auth);
}

// Защита страниц: если не вошел — кидаем на login.html
export function requireAuth() {
  onAuthStateChanged(auth, (user) => {
    // Получаем имя текущего файла (например, index.html)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (!user && currentPage !== 'login.html') {
      window.location.href = 'login.html';
    }
    
    // Если уже вошел, но находится на странице входа — кидаем на главную
    if (user && currentPage === 'login.html') {
      window.location.href = 'index.html';
    }
  });
}