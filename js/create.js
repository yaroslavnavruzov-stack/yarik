import { getDepartments, addAppeal } from './db.js';
import { toast } from './app.js';

document.addEventListener('DOMContentLoaded', async () => {
  const deps = await getDepartments();
  document.getElementById('departmentId').innerHTML = `<option value="">— Выберите —</option>` + deps.map(d => `<option value="${d.id}">${d.name.ru}</option>`).join('');

  document.getElementById('appealForm').addEventListener('submit', async (e) => {
    e.preventDefault();
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

    if (hasError) { document.querySelectorAll('.error-text').forEach(el => { if(el.textContent) el.previousElementSibling.classList.add('is-invalid'); }); return; }

    try {
      await addAppeal(data);
      toast('Создано!', 'success');
      setTimeout(() => window.location.href = 'applications.html', 1000);
    } catch (err) { toast('Ошибка', 'error'); }
  });
});