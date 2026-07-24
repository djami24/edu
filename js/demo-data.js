/* =========================================================
   DEMO-DATA.JS
   DEMO_MODE = true bo'lganda ishlatiladigan namunaviy
   ma'lumotlar. Haqiqiy loyihada bu ma'lumotlar Firestore'dan
   (masalan db.collection('students').get()) olinadi.
   ========================================================= */

const DEMO = {
  currentUser: {
    uid: 'demo-student-1',
    name: 'Azizbek Dilshodov',
    role: 'student', // admin | teacher | student | parent
    level: 'Intermediate B1',
    group: 'Int-B1 Morning',
    photo: 'https://i.pravatar.cc/100?img=13',
    teacher: 'Mr. Abdurahim',
    parentName: 'Dilshodbek'
  },

  homeworks: [
    { title: 'Past Simple – Exercises', given: '15.07.2026', due: '18.07.2026', status: 'done', score: 90 },
    { title: 'Essay: My Family', given: '14.07.2026', due: '19.07.2026', status: 'checking', score: null },
    { title: 'Listening Practice', given: '13.07.2026', due: '16.07.2026', status: 'done', score: 85 },
    { title: 'Grammar Review', given: '12.07.2026', due: '15.07.2026', status: 'missed', score: null },
  ],

  attendance: {
    percent: 92,
    attended: 22,
    total: 24,
    late: 2,
    absent: 2,
    unexcused: 0,
    month: 'Iyul 2026',
    days: { present: [1,2,3,7,8,9,10,14,15,16,17,21,22], absent: [18] }
  },

  results: {
    average: 87,
    trend: [50, 68, 72, 80, 87],
    trendLabels: ['May', '', 'Iyun', '', 'Iyul'],
    strengths: [ { name:'Grammar', value:92 }, { name:'Reading', value:88 }, { name:'Vocabulary', value:85 } ],
    weaknesses: [ { name:'Listening', value:70 }, { name:'Speaking', value:65 } ]
  },

  teacherComments: [
    { teacher:'Mr. Abdurahim', date:'18.07.2026', photo:'https://i.pravatar.cc/100?img=12',
      text:"Azizbek darslarda faol ishtirok etmoqda. Grammatikani yaxshi tushunadi. Listening va Speaking ko'nikmalarini rivojlantirish uchun ko'proq mashq qilish kerak. Umuman olganda, yaxshi natijalar!" }
  ],

  payments: {
    next: { amount: '500 000', due: '25.07.2026' },
    last: { amount: '500 000', paid: '25.06.2026' }
  },

  dashboardStats: {
    attendance: '22/24', homework: '18/20', testScore: '87%', activity: 'Yuqori'
  },

  // ---- ADMIN uchun demo ma'lumotlar ----
  adminStats: {
    totalStudents: 246, activeGroups: 18, teachers: 14, parents: 231,
    monthlyIncome: '86 500 000', attendanceRate: 91
  },
  students: [
    { id:1, name:'Azizbek Dilshodov', group:'Int-B1 Morning', teacher:'Mr. Abdurahim', attendance:92, status:'active', photo:'https://i.pravatar.cc/100?img=13' },
    { id:2, name:'Malika Yusupova', group:'Beg-A2 Evening', teacher:'Ms. Kamola', attendance:88, status:'active', photo:'https://i.pravatar.cc/100?img=25' },
    { id:3, name:'Jasur Rahimov', group:'Adv-C1 Morning', teacher:'Mr. Sardor', attendance:76, status:'active', photo:'https://i.pravatar.cc/100?img=15' },
    { id:4, name:'Nilufar Xolova', group:'Int-B1 Evening', teacher:'Ms. Kamola', attendance:95, status:'active', photo:'https://i.pravatar.cc/100?img=32' },
    { id:5, name:'Sardor Aliyev', group:'Beg-A2 Morning', teacher:'Mr. Abdurahim', attendance:60, status:'inactive', photo:'https://i.pravatar.cc/100?img=18' },
  ],
  teachers: [
    { id:1, name:'Mr. Abdurahim', subject:'General English', groups:3, students:42, photo:'https://i.pravatar.cc/100?img=12' },
    { id:2, name:'Ms. Kamola', subject:'IELTS Prep', groups:2, students:28, photo:'https://i.pravatar.cc/100?img=47' },
    { id:3, name:'Mr. Sardor', subject:'Business English', groups:2, students:25, photo:'https://i.pravatar.cc/100?img=51' },
  ],
  recentActivities: [
    { text: "Azizbek Dilshodov 'Past Simple' uy vazifasini topshirdi", time:'10 daqiqa oldin' },
    { text: "Yangi talaba ro'yxatdan o'tdi: Nilufar Xolova", time:'1 soat oldin' },
    { text: "Mr. Abdurahim Int-B1 guruhida davomat belgiladi", time:'2 soat oldin' },
    { text: "To'lov qabul qilindi: 500 000 so'm (Azizbek D.)", time:'kecha' },
  ],
  upcomingClasses: [
    { group:'Int-B1 Morning', teacher:'Mr. Abdurahim', time:'09:00 - 10:30', room:'Xona 3' },
    { group:'Adv-C1 Morning', teacher:'Mr. Sardor', time:'11:00 - 12:30', room:'Xona 1' },
    { group:'Beg-A2 Evening', teacher:'Ms. Kamola', time:'17:00 - 18:30', room:'Xona 2' },
  ],

  // ---- ADMIN: Ota-onalar ----
  parents: [
    { id:1, name:'Dilshodbek Dilshodov', child:'Azizbek Dilshodov', phone:'+998 90 123 45 67', status:'active', photo:'https://i.pravatar.cc/100?img=33' },
    { id:2, name:'Gulnora Yusupova', child:'Malika Yusupova', phone:'+998 91 234 56 78', status:'active', photo:'https://i.pravatar.cc/100?img=44' },
    { id:3, name:'Bahodir Rahimov', child:'Jasur Rahimov', phone:'+998 93 345 67 89', status:'active', photo:'https://i.pravatar.cc/100?img=52' },
    { id:4, name:'Zulfiya Xolova', child:'Nilufar Xolova', phone:'+998 94 456 78 90', status:'active', photo:'https://i.pravatar.cc/100?img=29' },
    { id:5, name:'Aliyev Rustam', child:'Sardor Aliyev', phone:'+998 95 567 89 01', status:'inactive', photo:'https://i.pravatar.cc/100?img=8' },
  ],

  // ---- ADMIN: Guruhlar ----
  groups: [
    { id:1, name:'Int-B1 Morning', teacher:'Mr. Abdurahim', level:'Intermediate B1', students:14, schedule:'Du/Ch/Ju 09:00-10:30' },
    { id:2, name:'Int-B1 Evening', teacher:'Ms. Kamola', level:'Intermediate B1', students:12, schedule:'Se/Pa 18:00-19:30' },
    { id:3, name:'Beg-A2 Morning', teacher:'Mr. Abdurahim', level:'Beginner A2', students:16, schedule:'Du/Ch/Ju 11:00-12:30' },
    { id:4, name:'Beg-A2 Evening', teacher:'Ms. Kamola', level:'Beginner A2', students:15, schedule:'Se/Pa 17:00-18:30' },
    { id:5, name:'Adv-C1 Morning', teacher:'Mr. Sardor', level:'Advanced C1', students:11, schedule:'Du/Ch/Ju 11:00-12:30' },
  ],

  // ---- ADMIN: Kurslar ----
  courses: [
    { id:1, name:'General English', level:'A1 - C1', teacher:'Mr. Abdurahim', students:42, price:'500 000' },
    { id:2, name:'IELTS Prep', level:'B1 - C1', teacher:'Ms. Kamola', students:28, price:'700 000' },
    { id:3, name:'Business English', level:'B2 - C1', teacher:'Mr. Sardor', students:25, price:'650 000' },
  ],

  // ---- ADMIN: Davomat (guruhlar kesimida) ----
  attendanceOverview: [
    { group:'Int-B1 Morning', teacher:'Mr. Abdurahim', date:'23.07.2026', present:12, late:1, absent:1, rate:93 },
    { group:'Int-B1 Evening', teacher:'Ms. Kamola', date:'23.07.2026', present:10, late:0, absent:2, rate:83 },
    { group:'Beg-A2 Morning', teacher:'Mr. Abdurahim', date:'23.07.2026', present:15, late:1, absent:0, rate:100 },
    { group:'Adv-C1 Morning', teacher:'Mr. Sardor', date:'23.07.2026', present:9, late:0, absent:2, rate:82 },
  ],

  // ---- ADMIN: Uy vazifalar (barcha guruhlar) ----
  homeworkAdmin: [
    { id:1, title:'Past Simple – Exercises', group:'Int-B1 Morning', given:'15.07.2026', due:'18.07.2026', submitted:12, total:14 },
    { id:2, title:'Essay: My Family', group:'Int-B1 Evening', given:'14.07.2026', due:'19.07.2026', submitted:8, total:12 },
    { id:3, title:'Vocabulary Quiz', group:'Beg-A2 Morning', given:'16.07.2026', due:'20.07.2026', submitted:15, total:16 },
    { id:4, title:'IELTS Speaking Task 2', group:'Adv-C1 Morning', given:'12.07.2026', due:'15.07.2026', submitted:9, total:11 },
  ],

  // ---- ADMIN: Test/Imtihonlar ----
  exams: [
    { id:1, title:'Monthly Progress Test', group:'Int-B1 Morning', date:'20.07.2026', avgScore:87, status:'completed' },
    { id:2, title:'IELTS Mock Exam', group:'Adv-C1 Morning', date:'22.07.2026', avgScore:76, status:'completed' },
    { id:3, title:'Vocabulary Test', group:'Beg-A2 Morning', date:'25.07.2026', avgScore:null, status:'upcoming' },
    { id:4, title:'Final Term Exam', group:'Int-B1 Evening', date:'30.07.2026', avgScore:null, status:'upcoming' },
  ],

  // ---- ADMIN: To'lovlar ----
  paymentsList: [
    { id:1, student:'Azizbek Dilshodov', amount:'500 000', dueDate:'25.07.2026', status:'pending' },
    { id:2, student:'Malika Yusupova', amount:'700 000', dueDate:'24.07.2026', status:'paid' },
    { id:3, student:'Jasur Rahimov', amount:'650 000', dueDate:'20.07.2026', status:'overdue' },
    { id:4, student:'Nilufar Xolova', amount:'500 000', dueDate:'26.07.2026', status:'paid' },
    { id:5, student:'Sardor Aliyev', amount:'500 000', dueDate:'18.07.2026', status:'overdue' },
  ],

  // ---- ADMIN: Bildirishnomalar ----
  notificationsAdmin: [
    { text:"Yangi talaba ro'yxatdan o'tdi: Nilufar Xolova", time:'1 soat oldin', type:'info' },
    { text:"To'lov muddati o'tib ketdi: Jasur Rahimov", time:'3 soat oldin', type:'warning' },
    { text:"Mr. Abdurahim Int-B1 guruhida davomat belgiladi", time:'4 soat oldin', type:'success' },
    { text:"IELTS Mock Exam natijalari e'lon qilindi", time:'kecha', type:'info' },
  ],

  // ---- TEACHER uchun demo ----
  teacherGroups: [
    { name:'Int-B1 Morning', students:14, nextClass:'Bugun, 09:00' },
    { name:'Int-B1 Evening', students:12, nextClass:'Bugun, 18:00' },
  ],

  // ---- PARENT uchun demo ----
  parentChild: { name:'Azizbek Dilshodov', level:'Intermediate B1' }
};
