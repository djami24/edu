const firebaseConfig = {
  apiKey: "AIzaSyC5bBFBQazCBRjQrk_osvy1zJ1pYoUtwZI",
  authDomain: "education-59079.firebaseapp.com",
  projectId: "education-59079",
  storageBucket: "education-59079.firebasestorage.app",
  messagingSenderId: "965021154196",
  appId: "1:965021154196:web:34b88dc4eb71584b412d81"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const DEMO_MODE = false;
