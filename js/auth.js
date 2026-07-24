/* =========================================================
   AUTH.JS — Kirish (login) va rol asosida yo'naltirish
   =========================================================
   MANTIQ:
   1. Foydalanuvchi email/parol va rolni tanlab kiradi
   2. Firebase Authentication orqali tizimga kiritiladi
   3. Firestore'dagi "users" kolleksiyasidan uning haqiqiy
      roli o'qib olinadi (xavfsizlik uchun UI'dagi tanlov
      emas, balki Firestore'dagi rol asos qilib olinadi)
   4. Rolga qarab tegishli dashboard sahifasiga o'tkaziladi:
        admin   -> admin/dashboard.html
        teacher -> teacher/dashboard.html
        student -> student/dashboard.html
        parent  -> parent/dashboard.html
   ========================================================= */

let selectedRole = 'student';

function initRoleTabs(){
  const tabs = document.querySelectorAll('.role-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedRole = tab.dataset.role;
    });
  });
}

function redirectByRole(role){
  const map = {
    admin: 'admin/dashboard.html',
    teacher: 'teacher/dashboard.html',
    student: 'student/dashboard.html',
    parent: 'parent/dashboard.html'
  };
  window.location.href = map[role] || 'student/dashboard.html';
}

async function handleLogin(e){
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.textContent = 'Kirilmoqda...';

  try{
    if(DEMO_MODE){
      // ---- DEMO REJIM: haqiqiy Firebase so'rovisiz sinash uchun ----
      await new Promise(r => setTimeout(r, 600)); // tarmoq kechikishini simulyatsiya qilish
      localStorage.setItem('ee-role', selectedRole);
      showToast("Muvaffaqiyatli kirdingiz!", 'success');
      setTimeout(() => redirectByRole(selectedRole), 500);
      return;
    }

    // ---- HAQIQIY FIREBASE AUTENTIFIKATSIYASI ----
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const uid = cred.user.uid;

    // Foydalanuvchi rolini Firestore'dan olish (UI tanlovi emas!)
    const userDoc = await db.collection('users').doc(uid).get();
    if(!userDoc.exists){
      throw new Error("Foydalanuvchi ma'lumotlari topilmadi. Administratorga murojaat qiling.");
    }
    const userData = userDoc.data();
    showToast("Muvaffaqiyatli kirdingiz!", 'success');
    setTimeout(() => redirectByRole(userData.role), 500);

  }catch(err){
    console.error(err);
    showToast(err.message || "Kirishda xatolik yuz berdi", 'error');
  }finally{
    btn.disabled = false;
    btn.textContent = 'Kirish';
  }
}

/**
 * Har bir dashboard sahifasi boshida chaqiriladi:
 * foydalanuvchi tizimga kirmagan bo'lsa login sahifasiga qaytaradi,
 * va sahifa kutayotgan rol bilan mos kelmasa ham qaytaradi.
 */
function guardPage(expectedRole){
  if(DEMO_MODE){
    const role = localStorage.getItem('ee-role') || expectedRole;
    if(role !== expectedRole){
      // demo qulayligi uchun avtomatik moslashtiramiz
      localStorage.setItem('ee-role', expectedRole);
    }
    return;
  }
  auth.onAuthStateChanged(async (user) => {
    if(!user){
      window.location.href = '/index.html';
      return;
    }
    const userDoc = await db.collection('users').doc(user.uid).get();
    if(!userDoc.exists || userDoc.data().role !== expectedRole){
      window.location.href = '/index.html';
    }
  });
}

function logout(){
  if(DEMO_MODE){
    localStorage.removeItem('ee-role');
    window.location.href = '../index.html';
    return;
  }
  auth.signOut().then(() => window.location.href = '/index.html');
}

document.addEventListener('DOMContentLoaded', () => {
  initRoleTabs();
  const form = document.getElementById('loginForm');
  if(form) form.addEventListener('submit', handleLogin);
});
