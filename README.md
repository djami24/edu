# Education Express — Ta'lim Boshqaruv Tizimi

To'rt rolli (Admin, O'qituvchi, Talaba, Ota-ona) zamonaviy ta'lim boshqaruv tizimi.
HTML, CSS, JavaScript, Firebase (Authentication, Firestore, Storage, Cloud Messaging)
va Chart.js asosida qurilgan.

---

## 1. Papka strukturasi

```
education-express/
├── index.html              → Kirish (login) sahifasi, rol tanlash
├── firestore.rules         → Firestore xavfsizlik qoidalari
├── css/
│   └── style.css           → Yagona dizayn tizimi (ranglar, kartalar, animatsiyalar)
├── js/
│   ├── firebase-config.js  → Firebase ulanish sozlamalari (BU YERGA O'Z KALITINGIZNI QO'YING)
│   ├── auth.js             → Login va rol asosida yo'naltirish logikasi
│   ├── utils.js            → Toast, modal, loading, pagination, qidiruv
│   ├── charts.js           → Chart.js grafiklari (chiziqli, ustunli, donut)
│   └── demo-data.js        → Namunaviy ma'lumotlar (DEMO_MODE uchun)
├── admin/
│   ├── dashboard.html      → Statistika, grafiklar, so'nggi faoliyat
│   └── students.html       → Talabalar CRUD (qidiruv, filtr, pagination)
│   (parents.html, teachers.html, groups.html, courses.html va boshqalar
│    students.html namunasi asosida osongina qo'shiladi — pastga qarang)
├── teacher/
│   └── dashboard.html      → Davomat belgilash, uy vazifa berish, izoh yozish
├── student/
│   ├── dashboard.html      → Bosh sahifa
│   ├── homework.html       → Uy vazifalar (filtrlash bilan)
│   ├── attendance.html     → Davomat kalendari
│   ├── results.html        → Test natijalari va grafiklar
│   ├── comments.html       → O'qituvchi izohi + to'lovlar
│   ├── menu.html            → Menu (skrinshotdagi kabi)
│   ├── schedule.html, notifications.html, profile.html
└── parent/
    └── dashboard.html      → Farzand haqida umumiy ma'lumot
```

**Nega bunday tuzilgan?** Har bir rol o'z papkasida, umumiy qismlar
(`css/style.css`, `js/*.js`) barcha rollar uchun bitta joydan qayta
ishlatiladi — bu "reusable components" tamoyili. Yangi sahifa qo'shish
uchun mavjud sahifalardan birini nusxalab, ichidagi ma'lumotni almashtirish
kifoya.

---

## 2. Firebase loyihasini sozlash (qadam-baqadam)

### 2.1. Loyiha yaratish
1. https://console.firebase.google.com ga kiring
2. **"Add project"** tugmasini bosing, nomini kiriting (masalan `education-express`)
3. Google Analytics — xohishga ko'ra yoqing yoki o'tkazib yuboring

### 2.2. Web ilova qo'shish
1. Loyiha sahifasida **"</>"** (Web) belgisini bosing
2. Ilova nomini kiriting, **"Register app"**
3. Sizga ko'rsatiladigan `firebaseConfig` obyektini nusxalang
4. Uni `js/firebase-config.js` faylidagi `firebaseConfig` o'rniga qo'ying
5. Shu faylda `DEMO_MODE = true` qatorini `false` ga o'zgartiring

### 2.3. Authentication yoqish
1. Chap menyudan **Build > Authentication > Get started**
2. **Sign-in method** bo'limida **Email/Password** ni yoqing
3. **Users** bo'limida test uchun 4 ta foydalanuvchi qo'shing (admin, teacher, student, parent)

### 2.4. Firestore Database yaratish
1. **Build > Firestore Database > Create database**
2. **Production mode** ni tanlang, hudud sifatida yaqin regionni tanlang
3. Har bir yangi foydalanuvchi uchun `users/{uid}` hujjatini qo'lda yoki
   admin panel orqali quyidagi formatda yarating:
   ```json
   { "role": "student", "name": "Azizbek Dilshodov", "groupId": "..." }
   ```
4. **Rules** bo'limiga o'tib, ushbu loyihadagi `firestore.rules` faylining
   to'liq matnini joylashtiring va **Publish** qiling

### 2.5. Storage yoqish (rasm/PDF fayllar uchun)
1. **Build > Storage > Get started**
2. Production mode'da davom eting
3. Fayl yuklash misoli:
   ```js
   const ref = storage.ref(`homework/${studentId}/${file.name}`);
   await ref.put(file);
   const url = await ref.getDownloadURL();
   ```

### 2.6. Cloud Messaging (Push Notifications)
1. **Build > Cloud Messaging**
2. **Project settings > Cloud Messaging > Web configuration** bo'limida
   **"Generate key pair"** orqali VAPID kalitini oling
3. `js/firebase-config.js` fayliga quyidagini qo'shing:
   ```js
   const messaging = firebase.messaging();
   messaging.getToken({ vapidKey: "SIZNING_VAPID_KALITINGIZ" });
   ```
4. Loyiha ildiziga `firebase-messaging-sw.js` service worker faylini qo'shish kerak
   (Firebase hujjatida tayyor namuna mavjud: firebase.google.com/docs/cloud-messaging/js/client)

---

## 3. Loyihani ishga tushirish

Bu loyiha toza HTML/CSS/JS bo'lgani uchun build jarayoni talab qilinmaydi.

**Variant A — to'g'ridan-to'g'ri ochish:**
`index.html` faylini brauzerda oching (demo rejimida darhol ishlaydi).

**Variant B — lokal server orqali (Firebase to'liq ishlashi uchun tavsiya etiladi):**
```bash
# Python o'rnatilgan bo'lsa:
python3 -m http.server 8000
# So'ng brauzerda: http://localhost:8000
```

**Variant C — Firebase Hosting orqali joylash:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 4. DEMO rejimi qanday ishlaydi?

`js/firebase-config.js` faylida `DEMO_MODE = true` bo'lsa:
- Login sahifasida istalgan email/parol bilan kirish mumkin
- Barcha ma'lumotlar `js/demo-data.js` fayldan olinadi (haqiqiy Firestore so'rovi yuborilmaydi)
- Bu dizayn va funksionallikni Firebase sozlanmasdan oldin sinab ko'rish uchun qulay

Haqiqiy ma'lumotlar bilan ishlash uchun:
1. `DEMO_MODE = false` qiling
2. Har bir sahifadagi `DEMO.xxx` bilan ishlaydigan qatorlarni
   tegishli Firestore so'roviga almashtiring, masalan:
   ```js
   // Demo:
   const items = DEMO.students;
   // Haqiqiy:
   const snapshot = await db.collection('students').get();
   const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
   ```

---

## 5. Yangi CRUD sahifa qo'shish namunasi

`admin/students.html` — to'liq CRUD namunasi (qidiruv + filtr + pagination +
qo'shish/tahrirlash/o'chirish). Xuddi shu naqshni ishlatib quyidagilarni
qo'shishingiz mumkin:
- `admin/parents.html`, `admin/teachers.html`, `admin/groups.html`,
  `admin/courses.html`, `admin/payments.html`, `admin/exams.html`

Har birida:
1. `students.html` ni nusxalang va nomini o'zgartiring
2. `allStudents` o'rniga tegishli Firestore kolleksiyasini bog'lang
   (masalan `db.collection('parents')`)
3. Jadval ustunlarini shu kolleksiya maydonlariga moslang

---

## 6. Rol asosidagi xavfsizlik (Role-based permissions)

- **Frontend**: `js/auth.js` dagi `guardPage(role)` funksiyasi har bir
  sahifa yuklanganda foydalanuvchi rolini tekshiradi va mos kelmasa
  login sahifasiga qaytaradi
- **Backend (haqiqiy himoya)**: `firestore.rules` — frontendni chetlab
  o'tishga urinishlar (masalan brauzer konsoli orqali) shu qoidalar bilan
  bloklanadi. **Frontend tekshiruvi yetarli emas — Firestore Rules asosiy
  himoya chizig'i hisoblanadi.**

---

## 7. Dizayn tizimi

Barcha ranglar, radius va soyalar `css/style.css` faylidagi
`:root { --color-*, --radius-*, --shadow-* }` o'zgaruvchilarida
markazlashtirilgan — bitta joydan butun loyiha ko'rinishini o'zgartirish
mumkin. Dark mode `body.dark` klassi orqali avtomatik ishlaydi
(yuqori o'ng burchakdagi 🌙 tugmasi).

---

## 8. Keyingi qadamlar (production uchun tavsiyalar)

- [ ] Firebase Authentication'da parolni tiklash (`sendPasswordResetEmail`) qo'shish
- [ ] Admin panelda foydalanuvchi yaratishda Cloud Functions orqali
      `auth.createUser()` chaqirish (frontend'dan to'g'ridan-to'g'ri boshqa
      foydalanuvchi yaratib bo'lmaydi — bu xavfsizlik cheklovi)
  - [ ] Fayllarni yuklashda hajm/format cheklovlarini Storage Rules'da belgilash
- [ ] To'lov tizimini (Payme/Click) haqiqiy API bilan integratsiya qilish
- [ ] Har bir CRUD sahifasiga real-time yangilanish uchun `onSnapshot()` qo'shish
