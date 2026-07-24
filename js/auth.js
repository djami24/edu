/* =========================================================
   AUTH.JS — Login, Register, Guard, Logout
   =========================================================
   MANTIQ:
   1. Foydalanuvchi email/parol bilan kiradi
   2. Firebase Authentication tekshiradi
   3. Firestore'dagi "users" kolleksiyasidan roli olinadi
   4. Rolga qarab dashboard sahifasiga yo'naltiriladi:
        admin   -> admin/dashboard.html
        teacher -> teacher/dashboard.html
        student -> student/dashboard.html
        parent  -> parent/dashboard.html
   ========================================================= */

function redirectByRole(role) {
  const map = {
    admin:   'admin/dashboard.html',
    teacher: 'teacher/dashboard.html',
    student: 'student/dashboard.html',
    parent:  'parent/dashboard.html'
  };
  window.location.href = map[role] || 'index.html';
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.textContent = 'Kirilmoqda...';

  try {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const uid = cred.user.uid;

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      throw new Error("Foydalanuvchi ma'lumotlari topilmadi. Administratorga murojaat qiling.");
    }

    const userData = userDoc.data();

    if (userData.status === 'blocked') {
      await auth.signOut();
      throw new Error("Hisobingiz bloklangan. Administratorga murojaat qiling.");
    }

    showToast("Muvaffaqiyatli kirdingiz!", 'success');
    setTimeout(() => redirectByRole(userData.role), 600);

  } catch (err) {
    console.error(err);
    const msgs = {
      'auth/user-not-found':  "Bu email ro'yxatdan o'tmagan",
      'auth/wrong-password':  "Parol noto'g'ri",
      'auth/invalid-email':   "Email noto'g'ri formatda",
      'auth/too-many-requests': "Juda ko'p urinish. Biroz kuting"
    };
    showToast(msgs[err.code] || err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Kirish';
  }
}

async function forgotPassword() {
  const email = document.getElementById('email').value.trim();
  if (!email) {
    showToast("Emailingizni kiriting, keyin bosing", 'error');
    return;
  }
  try {
    await auth.sendPasswordResetEmail(email);
    showToast("Parolni tiklash uchun email yuborildi", 'success');
  } catch (err) {
    const msgs = {
      'auth/user-not-found': "Bu email ro'yxatdan o'tmagan",
      'auth/invalid-email':  "Email noto'g'ri formatda"
    };
    showToast(msgs[err.code] || err.message, 'error');
  }
}

/* ---------------------------------------------------------
   guardPage — har bir dashboard sahifasi boshida chaqiriladi
   expectedRole: 'admin' | 'teacher' | 'student' | 'parent'
   --------------------------------------------------------- */
function guardPage(expectedRole) {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = '/index.html';
      return;
    }
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (!userDoc.exists) {
      await auth.signOut();
      window.location.href = '/index.html';
      return;
    }
    const role = userDoc.data().role;
    if (role !== expectedRole) {
      redirectByRole(role);
    }
  });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = '/index.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) form.addEventListener('submit', handleLogin);
});
