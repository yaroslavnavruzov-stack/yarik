import './app.js';
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from './db.js';
import { escapeHtml, toast } from './app.js';

let allDepts = [];
let currentId = null;

document.addEventListener('DOMContentLoaded', async () => {
  await load();
  setupModal();
});

async function load() {
  try {
    allDepts = await getDepartments();
    renderTable();
  } catch (error) {
    console.error("Ошибка загрузки отделов:", error);
    alert("Не удалось загрузить отделы. Проверьте консоль (F12)");
  }
}

function renderTable() {
  const tbody = document.getElementById('deptsBody');
  if (!tbody) return;
  
  if (!allDepts.length) { 
    tbody.innerHTML = `<tr><td colspan="6" class="empty-cell">Нет отделов</td></tr>`; 
    return; 
  }
  
  tbody.innerHTML = allDepts.map(d => `
    <tr>
      <td>${d.id.slice(0, 6)}</td>
      <td><b>${escapeHtml(d.name && d.name.ru ? d.name.ru : '—')}</b></td>
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
  if (!overlay) return;

  window.closeDeptModal = () => overlay.classList.remove('active');
  document.getElementById('deptModalClose').onclick = window.closeDeptModal;
  document.getElementById('deptCancel').onclick = window.closeDeptModal;

  document.getElementById('addDeptBtn').onclick = () => {
    currentId = null;
    document.getElementById('deptModalTitle').textContent = 'Новый отдел';
    document.getElementById('deptNameRu').value = ''; 
    document.getElementById('deptNameKy').value = ''; 
    document.getElementById('deptNameEn').value = '';
    document.getElementById('deptHead').value = ''; 
    document.getElementById('deptEmail').value = ''; 
    document.getElementById('deptPhone').value = '';
    overlay.classList.add('active');
  };

  window.editDept = (id) => {
    const d = allDepts.find(x => x.id === id);
    if (!d) return;
    currentId = id;
    document.getElementById('deptModalTitle').textContent = 'Редактировать отдел';
    document.getElementById('deptNameRu').value = d.name && d.name.ru ? d.name.ru : ''; 
    document.getElementById('deptNameKy').value = d.name && d.name.ky ? d.name.ky : ''; 
    document.getElementById('deptNameEn').value = d.name && d.name.en ? d.name.en : '';
    document.getElementById('deptHead').value = d.head || ''; 
    document.getElementById('deptEmail').value = d.email || ''; 
    document.getElementById('deptPhone').value = d.phone || '';
    overlay.classList.add('active');
  };

  window.delDept = async (id) => {
    if (confirm('Удалить этот отдел?')) { 
      try {
        await deleteDepartment(id); 
        toast('Отдел удален', 'success'); 
        await load(); 
      } catch (e) {
        alert("Ошибка удаления: " + e.message);
      }
    }
  };

  document.getElementById('deptSave').onclick = async () => {
    const data = {
      name: { 
        ru: document.getElementById('deptNameRu').value.trim(), 
        ky: document.getElementById('deptNameKy').value.trim(), 
        en: document.getElementById('deptNameEn').value.trim() 
      },
      head: document.getElementById('deptHead').value.trim(), 
      email: document.getElementById('deptEmail').value.trim(), 
      phone: document.getElementById('deptPhone').value.trim()
    };
    
    if (!data.name.ru || !data.name.ky || !data.name.en) {
      return toast('Заполните названия на всех трех языках', 'error');
    }
    
    try {
      if (currentId) {
        await updateDepartment(currentId, data);
      } else {
        await addDepartment(data);
      }
      toast('Сохранено', 'success'); 
      window.closeDeptModal(); 
      await load();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Ошибка при сохранении: " + error.message);
    }
  };
}