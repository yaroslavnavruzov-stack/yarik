(function () {
  'use strict';

  const THEME_KEY = 'citizen_appeals_theme';

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    const isDark = document.body.classList.contains('dark-theme');
    btn.innerHTML = isDark
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-stars-fill"></i>';

    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const nowDark = document.body.classList.contains('dark-theme');
      localStorage.setItem(THEME_KEY, nowDark ? 'dark' : 'light');
      btn.innerHTML = nowDark
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-stars-fill"></i>';
    });
  });
})();