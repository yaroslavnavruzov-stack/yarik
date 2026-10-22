// js/app.js
import { logout, requireAuth } from './auth.js';

// 1. Проверка авторизации (если не вошел - выкинет на login.html)
requireAuth();

// ==========================================
// ТЕМА (СВЕТЛАЯ / ТЕМНАЯ)
// ==========================================
const THEME_KEY = 'citizen_appeals_theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') {
    document.body.classList.add('dark-theme');
  }
  
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // Устанавливаем иконку
  updateThemeIcon(btn);

  // Клик по кнопке
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateThemeIcon(btn);
  });
}

function updateThemeIcon(btn) {
  const isDark = document.body.classList.contains('dark-theme');
  btn.innerHTML = isDark 
    ? '<i class="bi bi-sun-fill"></i>' 
    : '<i class="bi bi-moon-stars-fill"></i>';
}

// ==========================================
// ВЫХОД ИЗ СИСТЕМЫ
// ==========================================
function initLogout() {
  const btn = document.getElementById('logoutBtn');
  if (!btn) return;
  
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    logout().then(() => {
      window.location.href = 'login.html';
    });
  });
}

// ==========================================
// УВЕДОМЛЕНИЯ (ТОСТЫ)
// ==========================================
export function toast(message, type = 'info', duration = 3200) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const icons = { 
    info: '<i class="bi bi-info-circle-fill"></i>', 
    success: '<i class="bi bi-check-circle-fill"></i>', 
    error: '<i class="bi bi-x-circle-fill"></i>', 
    warning: '<i class="bi bi-exclamation-triangle-fill"></i>' 
  };
  
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(el);
  
  void el.offsetWidth;
  el.classList.add('show');
  
  setTimeout(() => { 
    el.classList.remove('show'); 
    setTimeout(() => el.remove(), 300); 
  }, duration);
}

// ==========================================
// УТИЛИТЫ (ЭКРАНИРОВАНИЕ И ДАТЫ)
// ==========================================
export function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatDate(ts) {
  const d = new Date(ts);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function formatDateShort(ts) {
  const d = new Date(ts);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

// ==========================================
// ЗАПУСК ПРИ ЗАГРУЗКЕ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLogout();
});