// js/create.js
import { getDepartments, addAppeal } from './db.js';
import { toast } from './app.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Заполняем выпадающий список КАТЕГОРИЙ
  const categories = ['housing', 'transport', 'healthcare', 'education', 'social', 'other'];
  const catSelect = document.getElementById('category');
  catSelect.innerHTML = `<option value="">— Выберите категорию —</option>` + 
    categories.map(key => `<option value="${key}">${window.I18n.t('status.' + key) || key}</option>`).join('');

  // 2. Заполняем выпадающий список ОТДЕЛОВ из Firebase
  const deptSelect = document.getElementById('departmentId');
  try {
    const deps = await getDepartments();
    if (deps.length === 0) {
      deptSelect.innerHTML = `<option value="">— Сначала создайте отдел в меню "Отделы" —</option>`;
    } else {
      deptSelect.innerHTML = `<option value="">— Выберите отдел —</option>` + 
        deps.map(d => `<option value="${d.id}">${d.name.ru}</option>`).join('');
    }
  } catch (error) {
    console.error("Ошибка загрузки отделов:", error);
    deptSelect.innerHTML = `<option value="">— Ошибка загрузки —</option>`;
  }

  // 3. Обработка отправки формы
  document.getElementById('appealForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Очистка ошибок
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

    const data = {
      fullName: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      category: document.getElementById('category').value,
      departmentId: document.getElementById('departmentId').value,
      subject: document.getElementById('subject').value.trim(),
      description: document.getElementById('description').value.trim()
    };

    let hasError = false;
    if (!data.fullName) { document.querySelector('[data-error-for="fullName"]').textContent = 'Обязательно'; hasError = true; }
    if (!data.email) { document.querySelector('[data-error-for="email"]').textContent = 'Обязательно'; hasError = true; }
    if (!data.category) { document.querySelector('[data-error-for="category"]').textContent = 'Выберите'; hasError = true; }
    if (!data.departmentId) { document.querySelector('[data-error-for="departmentId"]').textContent = 'Выберите'; hasError = true; }
    if (!data.subject) { document.querySelector('[data-error-for="subject"]').textContent = 'Обязательно'; hasError = true; }
    if (!data.description) { document.querySelector('[data-error-for="description"]').textContent = 'Обязательно'; hasError = true; }
    if (!document.getElementById('agree').checked) { document.querySelector('[data-error-for="agree"]').textContent = 'Требуется'; hasError = true; }

    if (hasError) { 
      document.querySelectorAll('.error-text').forEach(el => { 
        if(el.textContent) el.previousElementSibling.classList.add('is-invalid'); 
      }); 
      return; 
    }

    try {
      await addAppeal(data);
      toast('Обращение успешно создано!', 'success');
      setTimeout(() => window.location.href = 'applications.html', 1000);
    } catch (err) { 
      toast('Ошибка при создании', 'error'); 
    }
  });
});