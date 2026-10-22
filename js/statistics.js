import { getAppeals } from './db.js';
import { escapeHtml } from './app.js';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getAppeals();
  if (!data.length) return;

  document.getElementById('kpiTotal').textContent = data.length;
  const resolved = data.filter(a => a.status === 'resolved').length;
  document.getElementById('kpiResolvedPercent').textContent = Math.round((resolved / data.length) * 100) + '%';
  document.getElementById('kpiToday').textContent = data.filter(a => new Date(a.createdAt).toDateString() === new Date().toDateString()).length;
  document.getElementById('kpiAvgTime').textContent = '—';

  const catCounts = {};
  data.forEach(a => catCounts[a.category] = (catCounts[a.category] || 0) + 1);
  const maxCat = Math.max(...Object.values(catCounts), 1);
  document.getElementById('categoryChart').innerHTML = Object.entries(catCounts).map(([key, val]) => `
    <div class="bar-row"><span class="bar-label">${escapeHtml(window.I18n.t('status.' + key) || key)}</span><div class="bar-track"><div class="bar-fill" style="width:${(val / maxCat) * 100}%"></div></div><span class="bar-value">${val}</span></div>
  `).join('');

  const statCounts = { new: 0, in_progress: 0, resolved: 0, rejected: 0 };
  data.forEach(a => { if (statCounts[a.status] !== undefined) statCounts[a.status]++; });
  const maxStat = Math.max(...Object.values(statCounts), 1);
  document.getElementById('statusChart').innerHTML = Object.entries(statCounts).map(([key, val]) => `
    <div class="bar-row"><span class="bar-label">${escapeHtml(window.I18n.t('status.' + key) || key)}</span><div class="bar-track"><div class="bar-fill fill-${key}" style="width:${(val / maxStat) * 100}%"></div></div><span class="bar-value">${val}</span></div>
  `).join('');

  const days = [];
  for(let i=6; i>=0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const count = data.filter(a => new Date(a.createdAt).toDateString() === d.toDateString()).length;
    days.push({ label: d.toLocaleDateString('ru-RU', { weekday: 'short' }), count });
  }
  const maxDay = Math.max(...days.map(d => d.count), 1);
  document.getElementById('weekChart').innerHTML = days.map(d => `
    <div class="line-bar"><div class="line-bar-fill" data-value="${d.count}" style="height:${(d.count / maxDay) * 100}%"></div><span class="line-bar-label">${d.label}</span></div>
  `).join('');
});