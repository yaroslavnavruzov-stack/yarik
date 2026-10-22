// js/app.js
import { logout, requireAuth } from './auth.js';

// 1. Включаем защиту (если не залогинен - выкинет на login.html)
requireAuth();

// 2. Логика выхода из системы
function initLogout() {
  const btn = document.getElementById('logoutBtn');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      logout().then(() => {
        window.location.href = 'login.html';
      });
    });
  }
}

// Твои старые функции (тема, тосты, форматирование дат) оставь здесь...
// ... (они у тебя уже есть в файле)

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initLogout();
  // initTheme() и остальное...
});