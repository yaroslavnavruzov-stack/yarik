import './app.js';
import { getAppeals } from './db.js';
import { escapeHtml, formatDateShort } from './app.js';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getAppeals();
  
  document.getElementById('statTotal').textContent = data.length;
  document.getElementById('statNew').textContent = data.filter(a => a.status === 'new').length;
  document.getElementById('statProgress').textContent = data.filter(a => a.status === 'in_progress').length;
  document.getElementById('statResolved').textContent = data.filter(a => a.status === 'resolved').length;

  const recent = data.slice(0, 7);
  const tbody = document.getElementById('recentBody');
  
  if (!recent.length) { 
    tbody.innerHTML = `<tr><td colspan="5" class="empty-cell">Нет данных</td></tr>`; 
    return; 
  }

  tbody.innerHTML = recent.map(item => `
    <tr>
      <td class="col-id">${escapeHtml(item.id.slice(0, 6))}</td>
      <td class="col-subject">${escapeHtml(item.subject)}</td>
      <td><span class="badge badge-category">${escapeHtml(window.I18n.t('status.' + item.category) || item.category)}</span></td>
      <td>${formatDateShort(item.createdAt)}</td>
      <td><span class="badge badge-${item.status === 'new' ? 'new' : item.status === 'in_progress' ? 'progress' : item.status === 'resolved' ? 'resolved' : 'rejected'}">${escapeHtml(window.I18n.t('status.' + item.status) || item.status)}</span></td>
    </tr>
  `).join('');
});