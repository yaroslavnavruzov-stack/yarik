(function () {
  'use strict';
  const LANG_KEY = 'citizen_appeals_lang';
  const LANGS = ['ru', 'ky', 'en'];

  const I18N = {
    ru: {
      nav: { dashboard: 'Дашборд', applications: 'Обращения', create: 'Подать обращение', statistics: 'Статистика', departments: 'Отделы' },
      common: { cancel: 'Отмена', save: 'Сохранить', close: 'Закрыть', delete: 'Удалить', edit: 'Редактировать', add: 'Добавить', reset: 'Сбросить', open: 'Открыть', actions: 'Действия', no_data: 'Нет данных' },
      dash: { title: 'Дашборд', subtitle: 'Общая сводка', total: 'Всего обращений', new: 'Новые', progress: 'В работе', resolved: 'Решено', quick: 'Быстрые действия', create_btn: 'Подать обращение', all_btn: 'Все обращения', stats_btn: 'Статистика', recent: 'Последние', all_link: 'Все' },
      apps: { title: 'Обращения', subtitle: 'Реестр заявок', search_ph: 'Поиск...', all_statuses: 'Все статусы', all_categories: 'Все категории', all_departments: 'Все отделы', col_id: '№', col_subject: 'Тема', col_applicant: 'Заявитель', col_category: 'Категория', col_department: 'Отдел', col_date: 'Дата', col_status: 'Статус', col_actions: 'Действия', not_found: 'Не найдено', details: 'Детали', applicant: 'Заявитель', email: 'Email', phone: 'Телефон', description: 'Описание', status_updated: 'Статус обновлен' },
      create: { title: 'Подать обращение', subtitle: 'Все поля обязательны', fullName: 'ФИО *', email: 'Email *', phone: 'Телефон', category: 'Категория *', department: 'Отдел *', choose_cat: '— Выберите —', choose_dept: '— Выберите —', subject: 'Тема *', description: 'Описание *', agree: 'Согласен на обработку *', submit: 'Отправить', info_title: 'Порядок', info_1: 'Регистрация 1 день', info_2: 'Рассмотрение 30 дней', info_3: 'Ответ на email', info_4: 'Статус в ЛК', err_check: 'Проверьте форму', err_name: 'Мин. 3 символа', err_name_fmt: 'Только буквы', err_email_req: 'Укажите email', err_email_fmt: 'Неверный email', err_phone: 'Неверный телефон', err_cat: 'Выберите категорию', err_dept: 'Выберите отдел', err_subject: 'Мин. 5 символов', err_subject_max: 'Макс. 120 символов', err_desc: 'Мин. 20 символов', err_agree: 'Требуется согласие', success: 'Успешно!' },
      stats: { title: 'Статистика', subtitle: 'Аналитика', kpi_total: 'Всего', kpi_resolved: 'Решено %', kpi_avg: 'Среднее время', kpi_today: 'Сегодня', by_category: 'По категориям', by_status: 'По статусам', week: 'Активность', days: 'дн' },
      depts: { title: 'Отделы', subtitle: 'Управление', add_btn: 'Добавить', col_id: 'Код', col_name: 'Название', col_head: 'Руководитель', col_email: 'Email', col_phone: 'Телефон', col_appeals: 'Обращений', edit_title: 'Редактировать', add_title: 'Новый', name_ru: 'Имя (RU) *', name_ky: 'Имя (KY) *', name_en: 'Имя (EN) *', head: 'Руководитель', email: 'Email', phone: 'Телефон', err_name: 'Заполните все', confirm_delete: 'Удалить?', saved: 'Сохранено', deleted: 'Удалено', in_use: 'Есть заявки' },
      status: { new: 'Новая', in_progress: 'В работе', resolved: 'Решено', rejected: 'Отклонено', housing: 'ЖКХ', transport: 'Транспорт', healthcare: 'Медицина', education: 'Образование', social: 'Соцзащита', other: 'Прочее' },
      toast: { no_stats: 'Нет данных' }
    },
    ky: {
      nav: { dashboard: 'Башкаруу', applications: 'Кайрылуулар', create: 'Жөнөтүү', statistics: 'Статистика', departments: 'Бөлүмдөр' },
      common: { cancel: 'Жокко чыгаруу', save: 'Сактоо', close: 'Жабуу', delete: 'Өчүрүү', edit: 'Оңдоо', add: 'Кошуу', reset: 'Тазалоо', open: 'Ачуу', actions: 'Аракеттер', no_data: 'Жок' },
      dash: { title: 'Башкаруу', subtitle: 'Жалпы', total: 'Бардыгы', new: 'Жаңы', progress: 'Иштелүүдө', resolved: 'Чечилди', quick: 'Тез', create_btn: 'Жаңы', all_btn: 'Баары', stats_btn: 'Статистика', recent: 'Акыркы', all_link: 'Баары' },
      apps: { title: 'Кайрылуулар', subtitle: 'Тизме', search_ph: 'Издөө...', all_statuses: 'Бардык статус', all_categories: 'Бардык кат.', all_departments: 'Бардык бөлүм', col_id: '№', col_subject: 'Тема', col_applicant: 'Арыз', col_category: 'Кат.', col_department: 'Бөлүм', col_date: 'Күнү', col_status: 'Абалы', col_actions: 'Аракет', not_found: 'Табылган жок', details: 'Чоо-жайы', applicant: 'Арыз', email: 'Email', phone: 'Телефон', description: 'Сүрөттөмө', status_updated: 'Жаңыртылды' },
      create: { title: 'Жөнөтүү', subtitle: 'Милдеттүү', fullName: 'Аты *', email: 'Email *', phone: 'Телефон', category: 'Кат. *', department: 'Бөлүм *', choose_cat: '— Тандаңыз —', choose_dept: '— Тандаңыз —', subject: 'Тема *', description: 'Сүрөттөмө *', agree: 'Макулмун *', submit: 'Жөнөтүү', info_title: 'Тартип', info_1: '1 күн', info_2: '30 күн', info_3: 'Email', info_4: 'Статус', err_check: 'Текшериңиз', err_name: 'Кеминде 3', err_name_fmt: 'Тамгалар', err_email_req: 'Email', err_email_fmt: 'Туура эмес', err_phone: 'Туура эмес', err_cat: 'Тандаңыз', err_dept: 'Тандаңыз', err_subject: 'Кеминде 5', err_subject_max: 'Макс 120', err_desc: 'Кеминде 20', err_agree: 'Макулдук', success: 'Ийгиликтүү!' },
      stats: { title: 'Статистика', subtitle: 'Аналитика', kpi_total: 'Бардыгы', kpi_resolved: 'Чечилди %', kpi_avg: 'Орточо', kpi_today: 'Бүгүн', by_category: 'Кат. боюнча', by_status: 'Статус боюнча', week: 'Активдүүлүк', days: 'күн' },
      depts: { title: 'Бөлүмдөр', subtitle: 'Башкаруу', add_btn: 'Кошуу', col_id: 'Код', col_name: 'Аталышы', col_head: 'Жетекчи', col_email: 'Email', col_phone: 'Телефон', col_appeals: 'Кайрылуу', edit_title: 'Оңдоо', add_title: 'Жаңы', name_ru: 'Аталыш (RU) *', name_ky: 'Аталыш (KY) *', name_en: 'Аталыш (EN) *', head: 'Жетекчи', email: 'Email', phone: 'Телефон', err_name: 'Толтуруңуз', confirm_delete: 'Өчүрөсүзбү?', saved: 'Сакталды', deleted: 'Өчүрүлдү', in_use: 'Байланыш бар' },
      status: { new: 'Жаңы', in_progress: 'Иштелүүдө', resolved: 'Чечилди', rejected: 'Четке', housing: 'Турак', transport: 'Транспорт', healthcare: 'Медицина', education: 'Билим', social: 'Социалдык', other: 'Башка' },
      toast: { no_stats: 'Маалымат жок' }
    },
    en: {
      nav: { dashboard: 'Dashboard', applications: 'Appeals', create: 'New Appeal', statistics: 'Statistics', departments: 'Departments' },
      common: { cancel: 'Cancel', save: 'Save', close: 'Close', delete: 'Delete', edit: 'Edit', add: 'Add', reset: 'Reset', open: 'Open', actions: 'Actions', no_data: 'No data' },
      dash: { title: 'Dashboard', subtitle: 'Overview', total: 'Total', new: 'New', progress: 'In progress', resolved: 'Resolved', quick: 'Quick actions', create_btn: 'New appeal', all_btn: 'All appeals', stats_btn: 'Statistics', recent: 'Recent', all_link: 'View all' },
      apps: { title: 'Appeals', subtitle: 'Registry', search_ph: 'Search...', all_statuses: 'All statuses', all_categories: 'All categories', all_departments: 'All departments', col_id: 'No.', col_subject: 'Subject', col_applicant: 'Applicant', col_category: 'Category', col_department: 'Department', col_date: 'Date', col_status: 'Status', col_actions: 'Actions', not_found: 'Not found', details: 'Details', applicant: 'Applicant', email: 'Email', phone: 'Phone', description: 'Description', status_updated: 'Status updated' },
      create: { title: 'Submit appeal', subtitle: 'All fields required', fullName: 'Full name *', email: 'Email *', phone: 'Phone', category: 'Category *', department: 'Department *', choose_cat: '— Choose —', choose_dept: '— Choose —', subject: 'Subject *', description: 'Description *', agree: 'I agree *', submit: 'Submit', info_title: 'Procedure', info_1: '1 day', info_2: '30 days', info_3: 'Email', info_4: 'Status', err_check: 'Check form', err_name: 'Min 3', err_name_fmt: 'Letters only', err_email_req: 'Email', err_email_fmt: 'Invalid', err_phone: 'Invalid', err_cat: 'Choose', err_dept: 'Choose', err_subject: 'Min 5', err_subject_max: 'Max 120', err_desc: 'Min 20', err_agree: 'Required', success: 'Success!' },
      stats: { title: 'Statistics', subtitle: 'Analytics', kpi_total: 'Total', kpi_resolved: 'Resolved %', kpi_avg: 'Avg time', kpi_today: 'Today', by_category: 'By category', by_status: 'By status', week: 'Activity', days: 'd' },
      depts: { title: 'Departments', subtitle: 'Manage', add_btn: 'Add', col_id: 'Code', col_name: 'Name', col_head: 'Head', col_email: 'Email', col_phone: 'Phone', col_appeals: 'Appeals', edit_title: 'Edit', add_title: 'New', name_ru: 'Name (RU) *', name_ky: 'Name (KY) *', name_en: 'Name (EN) *', head: 'Head', email: 'Email', phone: 'Phone', err_name: 'Fill all', confirm_delete: 'Delete?', saved: 'Saved', deleted: 'Deleted', in_use: 'Has appeals' },
      status: { new: 'New', in_progress: 'In progress', resolved: 'Resolved', rejected: 'Rejected', housing: 'Housing', transport: 'Transport', healthcare: 'Healthcare', education: 'Education', social: 'Social', other: 'Other' },
      toast: { no_stats: 'No data' }
    }
  };

  function getLang() { return localStorage.getItem(LANG_KEY) || 'ru'; }
  function setLang(lang) { localStorage.setItem(LANG_KEY, lang); location.reload(); }
  
  function t(key) {
    const lang = getLang();
    const parts = key.split('.');
    let val = I18N[lang];
    for (const p of parts) { if (val == null) return key; val = val[p]; }
    return val == null ? key : val;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder'))); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { el.setAttribute('title', t(el.getAttribute('data-i18n-title'))); });
  }

  function initSwitcher() {
    const sel = document.getElementById('langSelect');
    if (sel) {
      sel.value = getLang();
      sel.addEventListener('change', e => setLang(e.target.value));
    }
  }

  window.I18n = { t, getLang, applyTranslations };

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('lang', getLang());
    applyTranslations();
    initSwitcher();
  });
})();