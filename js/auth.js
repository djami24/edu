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
    console.log('Login muvaffaqiyatli, UID:', uid);

    const userDoc = await db.collection('users').doc(uid).get();
    console.log('Dokument mavjudmi:', userDoc.exists);

    if (!userDoc.exists) {
      // Agar users da dokument yo'q bo'lsa — avtomatik yaratamiz
      await db.collection('users').doc(uid).set({
        uid: uid,
        email: email,
        name: email.split('@')[0],
        role: 'student',
        status: 'active',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      showToast("Hisob yaratildi, qaytadan kiring", 'info');
      await auth.signOut();
      btn.disabled = false;
      btn.textContent = 'Kirish';
      return;
    }

    const userData = userDoc.data();
    console.log('Role:', userData.role);

    if (userData.status === 'blocked') {
      await auth.signOut();
      throw new Error("Hisobingiz bloklangan.");
    }

    showToast("Muvaffaqiyatli kirdingiz!", 'success');
    setTimeout(() => redirectByRole(userData.role), 600);

  } catch (err) {
    console.error('Login xato:', err);
    const msgs = {
      'auth/user-not-found':    "Bu email ro'yxatdan o'tmagan",
      'auth/wrong-password':    "Parol noto'g'ri",
      'auth/invalid-email':     "Email noto'g'ri formatda",
      'auth/too-many-requests': "Juda ko'p urinish. Biroz kuting",
      'auth/invalid-credential':"Email yoki parol noto'g'ri"
    };
    showToast(msgs[err.code] || err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Kirish';
  }
}

async function forgotPassword() {
  const email = document.getElementById('email').value.trim();
  if (!email) { showToast("Emailingizni kiriting", 'error'); return; }
  try {
    await auth.sendPasswordResetEmail(email);
    showToast("Parolni tiklash uchun email yuborildi", 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function guardPage(expectedRole) {
  auth.onAuthStateChanged(async (user) => {
    if (!user) { window.location.href = '/index.html'; return; }
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (!userDoc.exists) { window.location.href = '/index.html'; return; }
    const role = userDoc.data().role;
    if (role !== expectedRole) redirectByRole(role);
  });
}

function logout() {
  auth.signOut().then(() => window.location.href = '/index.html');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) form.addEventListener('submit', handleLogin);
});
