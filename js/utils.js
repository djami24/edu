/* =========================================================
   UTILS.JS — qayta ishlatiladigan yordamchi funksiyalar
   (Toast xabarlari, tasdiqlash oynalari, loading, dark mode)
   ========================================================= */

/* ---------- TOAST NOTIFICATIONS ---------- */
function ensureToastWrap(){
  let wrap = document.querySelector('.toast-wrap');
  if(!wrap){
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  return wrap;
}

/**
 * Ekranga qisqa muddatli xabar (toast) chiqaradi.
 * @param {string} message - ko'rsatiladigan matn
 * @param {'success'|'error'|'info'} type - xabar turi
 */
function showToast(message, type = 'info'){
  const wrap = ensureToastWrap();
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    setTimeout(() => el.remove(), 250);
  }, 3200);
}

/* ---------- TASDIQLASH OYNASI (Confirmation dialog) ---------- */
/**
 * Foydalanuvchidan tasdiq so'raydi (masalan, "O'chirishni tasdiqlaysizmi?")
 * @returns {Promise<boolean>}
 */
function confirmDialog(title, message){
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box">
        <h3>${title}</h3>
        <p>${message}</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" data-action="cancel">Bekor qilish</button>
          <button class="btn btn-danger" data-action="ok">Ha, davom etish</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay || e.target.dataset.action === 'cancel'){
        overlay.remove(); resolve(false);
      }
      if(e.target.dataset.action === 'ok'){
        overlay.remove(); resolve(true);
      }
    });
  });
}

/* ---------- FORMA OYNASI (Add/Edit modal) ---------- */
/**
 * Maydonlar ro'yxati asosida forma oynasini ochadi.
 * @param {string} title - oyna sarlavhasi
 * @param {Array<{key:string,label:string,type?:string,options?:Array<{value:string,label:string}>,required?:boolean,default?:any}>} fields
 * @param {Object} initial - tahrirlashda boshlang'ich qiymatlar (bo'sh bo'lsa - yangi qo'shish)
 * @returns {Promise<Object|null>} - "Saqlash" bosilsa qiymatlar obyekti, "Bekor qilish" bosilsa null
 */
function openFormModal(title, fields, initial = {}){
  return new Promise((resolve) => {
    const esc = (v) => String(v === undefined || v === null ? '' : v).replace(/"/g, '&quot;');
    const fieldsHtml = fields.map(f => {
      const val = initial[f.key] !== undefined && initial[f.key] !== null ? initial[f.key] : (f.default !== undefined ? f.default : '');
      if(f.type === 'select'){
        const opts = f.options.map(o => `<option value="${esc(o.value)}" ${String(o.value) === String(val) ? 'selected' : ''}>${o.label}</option>`).join('');
        return `<div class="form-group"><label class="form-label">${f.label}</label><select class="form-input" id="mf_${f.key}">${opts}</select></div>`;
      }
      return `<div class="form-group"><label class="form-label">${f.label}</label><input class="form-input" type="${f.type || 'text'}" id="mf_${f.key}" value="${esc(val)}"></div>`;
    }).join('');

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box" style="max-width:440px; max-height:85vh; overflow-y:auto;">
        <h3>${title}</h3>
        <div>${fieldsHtml}</div>
        <div class="modal-actions">
          <button class="btn btn-ghost" data-action="cancel">Bekor qilish</button>
          <button class="btn btn-primary" data-action="ok">Saqlash</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    function close(result){ overlay.remove(); resolve(result); }

    overlay.addEventListener('click', (e) => {
      if(e.target === overlay || e.target.dataset.action === 'cancel'){ close(null); return; }
      if(e.target.dataset.action === 'ok'){
        const result = {};
        for(const f of fields){
          const el = document.getElementById('mf_' + f.key);
          let v = el.value;
          if(f.type === 'number') v = v === '' ? null : Number(v);
          result[f.key] = v;
        }
        const missing = fields.find(f => f.required && (result[f.key] === '' || result[f.key] === null || result[f.key] === undefined));
        if(missing){
          showToast(`Iltimos, "${missing.label}" maydonini to'ldiring`, 'error');
          return;
        }
        close(result);
      }
    });
  });
}

/* ---------- FIRESTORE XATOLIK XABARI ---------- */
function firestoreErrorMessage(err){
  if(err && err.code === 'permission-denied') return "Ruxsat yo'q — bu amal uchun huquqingiz yetarli emas (Firestore Rules tekshiring).";
  if(err && err.code === 'unavailable') return "Server bilan aloqa yo'q. Internetni tekshiring.";
  return (err && err.message) ? err.message : "Noma'lum xatolik yuz berdi";
}

/* ---------- LOADING HOLATI ---------- */
function showLoading(container){
  container.innerHTML = `<div class="loading-center"><div class="spinner"></div></div>`;
}

/* ---------- DARK MODE ---------- */
function initDarkMode(){
  const saved = localStorage.getItem('ee-theme');
  if(saved === 'dark') document.body.classList.add('dark');
}
function toggleDarkMode(){
  document.body.classList.toggle('dark');
  localStorage.setItem('ee-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

/* ---------- MOBIL MENU ---------- */
function initMobileMenu(){
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if(toggle && sidebar){
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
}

/* ---------- ODDIY PAGINATION QURUVCHI ---------- */
/**
 * @param {number} totalItems - jami elementlar soni
 * @param {number} perPage - har sahifadagi elementlar soni
 * @param {number} currentPage - joriy sahifa
 * @param {function} onChange - sahifa o'zgarganda chaqiriladigan callback
 */
function renderPagination(container, totalItems, perPage, currentPage, onChange){
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  container.innerHTML = '';
  for(let i = 1; i <= totalPages; i++){
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.addEventListener('click', () => onChange(i));
    container.appendChild(btn);
  }
}

/* ---------- ODDIY QIDIRUV/FILTR ---------- */
function filterList(items, query, keys){
  if(!query) return items;
  const q = query.toLowerCase();
  return items.filter(item => keys.some(k => String(item[k] || '').toLowerCase().includes(q)));
}

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initMobileMenu();
});
