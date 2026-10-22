import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from './db.js';
import { escapeHtml, toast } from './app.js';

let allDepts = [], currentId = null;

document.addEventListener('DOMContentLoaded', load);

async function load() {
  allDepts = await getDepartments();
  renderTable();
  setupModal();
}

function renderTable() {
  const tbody = document.getElementById('deptsBody');
  if (!allDepts.length) { tbody.innerHTML = `<tr><td colspan="6" class="empty-cell">Нет отделов</td></tr>`; return; }
  tbody.innerHTML = allDepts.map(d => `
    <tr>
      <td>${d.id.slice(0, 6)}</td>
      <td><b>${escapeHtml(d.name.ru)}</b></td>
      <td>${escapeHtml(d.head || '—')}</td>
      <td>${escapeHtml(d.email || '—')}</td>
      <td>${escapeHtml(d.phone || '—')}</td>
      <td class="row-actions">
        <button class="btn btn-ghost btn-sm" onclick="window.editDept('${d.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-ghost btn-sm btn-danger" onclick="window.delDept('${d.id}')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function setupModal() {
  const overlay = document.getElementById('deptModal');
  window.closeDeptModal = () => overlay.classList.remove('active');
  document.getElementById('deptModalClose').onclick = window.closeDeptModal;
  document.getElementById('deptCancel').onclick = window.closeDeptModal;

  document.getElementById('addDeptBtn').onclick = () => {
    currentId = null;
    document.getElementById('deptModalTitle').textContent = 'Новый';
    document.getElementById('deptNameRu').value = ''; document.getElementById('deptNameKy').value = ''; document.getElementById('deptNameEn').value = '';
    document.getElementById('deptHead').value = ''; document.getElementById('deptEmail').value = ''; document.getElementById('deptPhone').value = '';
    overlay.classList.add('active');
  };

  window.editDept = (id) => {
    const d = allDepts.find(x => x.id === id);
    currentId = id;
    document.getElementById('deptModalTitle').textContent = 'Редактировать';
    document.getElementById('deptNameRu').value = d.name.ru || ''; document.getElementById('deptNameKy').value = d.name.ky || ''; document.getElementById('deptNameEn').value = d.name.en || '';
    document.getElementById('deptHead').value = d.head || ''; document.getElementById('deptEmail').value = d.email || ''; document.getElementById('deptPhone').value = d.phone || '';
    overlay.classList.add('active');
  };

  window.delDept = async (id) => {
    if (confirm('Удалить?')) { await deleteDepartment(id); toast('Удалено', 'success'); load(); }
  };

  document.getElementById('deptSave').onclick = async () => {
    const data = {
      name: { ru: document.getElementById('deptNameRu').value.trim(), ky: document.getElementById('deptNameKy').value.trim(), en: document.getElementById('deptNameEn').value.trim() },
      head: document.getElementById('deptHead').value.trim(), email: document.getElementById('deptEmail').value.trim(), phone: document.getElementById('deptPhone').value.trim()
    };
    if (!data.name.ru || !data.name.ky || !data.name.en) return toast('Заполните названия', 'error');
    if (currentId) await updateDepartment(currentId, data); else await addDepartment(data);
    toast('Сохранено', 'success'); window.closeDeptModal(); load();
  };
}