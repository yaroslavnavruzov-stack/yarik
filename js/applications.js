import { getAppeals, updateAppealStatus, deleteAppeal } from './db.js';
import { escapeHtml, formatDateShort, toast } from './app.js';

let allData = [];
let filteredData = [];
let currentPage = 1;
const PER_PAGE = 6;

document.addEventListener('DOMContentLoaded', async () => {
  allData = await getAppeals();
  filteredData = [...allData];
  render();
  setupFilters();
  setupModal();
});

function render() {
  const start = (currentPage - 1) * PER_PAGE;
  const items = filteredData.slice(start, start + PER_PAGE);
  const tbody = document.getElementById('applicationsBody');

  if (!items.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty-cell">Ничего не найдено</td></tr>`;
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  tbody.innerHTML = items.map(item => `
    <tr>
      <td class="col-id">${escapeHtml(item.id.slice(0, 6))}</td>
      <td class="col-subject">${escapeHtml(item.subject)}<small>${escapeHtml(item.description.slice(0, 50))}...</small></td>
      <td>${escapeHtml(item.fullName)}</td>
      <td><span class="badge badge-category">${escapeHtml(window.I18n.t('status.' + item.category) || item.category)}</span></td>
      <td>${escapeHtml(item.departmentId || '—')}</td>
      <td>${formatDateShort(item.createdAt)}</td>
      <td><span class="badge badge-${item.status === 'new' ? 'new' : item.status === 'in_progress' ? 'progress' : item.status === 'resolved' ? 'resolved' : 'rejected'}">${escapeHtml(window.I18n.t('status.' + item.status) || item.status)}</span></td>
      <td class="row-actions">
        <button class="btn btn-ghost btn-sm" onclick="window.openModal('${item.id}')">Открыть</button>
      </td>
    </tr>
  `).join('');

  renderPagination();
}

function renderPagination() {
  const pages = Math.ceil(filteredData.length / PER_PAGE);
  const c = document.getElementById('pagination');
  if (pages <= 1) { c.innerHTML = ''; return; }
  
  let html = `<button class="page-btn" onclick="window.changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹</button>`;
  for (let i = 1; i <= pages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window.changePage(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" onclick="window.changePage(${currentPage + 1})" ${currentPage === pages ? 'disabled' : ''}>›</button>`;
  c.innerHTML = html;
}

window.changePage = (p) => { currentPage = p; render(); window.scrollTo(0, 0); };

function setupFilters() {
  const search = document.getElementById('searchInput');
  const status = document.getElementById('statusFilter');
  const category = document.getElementById('categoryFilter');
  
  const filter = () => {
    const q = search.value.toLowerCase();
    filteredData = allData.filter(item => {
      const matchQ = item.subject.toLowerCase().includes(q) || item.fullName.toLowerCase().includes(q);
      const matchS = !status.value || item.status === status.value;
      const matchC = !category.value || item.category === category.value;
      return matchQ && matchS && matchC;
    });
    currentPage = 1;
    render();
  };

  search.addEventListener('input', filter);
  status.addEventListener('change', filter);
  category.addEventListener('change', filter);
  
  document.getElementById('resetFilters').addEventListener('click', () => {
    search.value = ''; status.value = ''; category.value = '';
    filter();
  });
}

function setupModal() {
  const overlay = document.getElementById('modalOverlay');
  const close = document.getElementById('modalClose');
  const cancel = document.getElementById('modalCancel');
  const save = document.getElementById('modalSave');
  let currentId = null;

  window.closeModal = () => { overlay.classList.remove('active'); currentId = null; };
  close.onclick = window.closeModal;
  cancel.onclick = window.closeModal;
  overlay.onclick = (e) => { if (e.target === overlay) window.closeModal(); };

  window.openModal = (id) => {
    const item = allData.find(x => x.id === id);
    if (!item) return;
    currentId = id;
    
    document.getElementById('modalTitle').textContent = 'Заявка ' + item.id.slice(0, 6);
    document.getElementById('modalBody').innerHTML = `
      <div class="detail-row"><span class="detail-label">ФИО</span><span class="detail-value">${escapeHtml(item.fullName)}</span></div>
      <div class="detail-row"><span class="detail-label">Тема</span><span class="detail-value">${escapeHtml(item.subject)}</span></div>
      <div class="detail-row"><span class="detail-label">Описание</span><span class="detail-value">${escapeHtml(item.description)}</span></div>
      <div class="detail-row"><span class="detail-label">Статус</span><span class="detail-value">
        <select class="form-control" id="modalStatusSelect">
          <option value="new" ${item.status === 'new' ? 'selected' : ''}>Новая</option>
          <option value="in_progress" ${item.status === 'in_progress' ? 'selected' : ''}>В работе</option>
          <option value="resolved" ${item.status === 'resolved' ? 'selected' : ''}>Решено</option>
          <option value="rejected" ${item.status === 'rejected' ? 'selected' : ''}>Отклонено</option>
        </select>
      </span></div>
    `;
    overlay.classList.add('active');
  };

  save.onclick = async () => {
    if (!currentId) return;
    const newStatus = document.getElementById('modalStatusSelect').value;
    await updateAppealStatus(currentId, newStatus);
    toast('Статус обновлен', 'success');
    allData = await getAppeals();
    filteredData = allData; // Сбрасываем фильтры для простоты
    render();
    window.closeModal();
  };
}