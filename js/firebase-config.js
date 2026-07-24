/* =========================================================
   FIREBASE KONFIGURATSIYASI
   =========================================================
   1-QADAM: https://console.firebase.google.com ga kiring
   2-QADAM: "Add project" tugmasi orqali yangi loyiha yarating
   3-QADAM: Project Settings > General > "Your apps" bo'limida
            "</> Web app" ni tanlang va ro'yxatdan o'tkazing
   4-QADAM: Sizga beriladigan firebaseConfig obyektini
            pastdagi joyga to'liq almashtiring
   5-QADAM: Authentication bo'limida "Email/Password" usulini
            yoqing (Sign-in method > Email/Password > Enable)
   6-QADAM: Firestore Database yarating (production mode)
   7-QADAM: Storage bo'limini yoqing (rasm/pdf fayllar uchun)
   8-QADAM: Cloud Messaging uchun "Web Push certificates"
            bo'limida VAPID key generatsiya qiling
   ========================================================= */

// !!! O'ZINGIZNING FIREBASE PROJECT MA'LUMOTLARINGIZNI SHU YERGA QO'YING !!!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase ilovasini ishga tushirish (compat SDK - eng oddiy usul)
firebase.initializeApp(firebaseConfig);

// Global obyektlar - butun loyiha davomida ishlatiladi
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

/* ---------------------------------------------------------
   DEMO REJIM
   ---------------------------------------------------------
   Real Firebase ma'lumotlari kiritilmagan bo'lsa ham sayt
   ishlab turishi uchun DEMO_MODE yoqilgan. Haqiqiy Firebase
   ulanganda DEMO_MODE = false qiling.
   --------------------------------------------------------- */
const DEMO_MODE = true;
