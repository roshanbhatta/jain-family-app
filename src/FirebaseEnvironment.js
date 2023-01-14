// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD0FIlcDpvKlnW0SgdbBcvs3kD0HhYQ5vw",
  authDomain: "jain-family-app-5c025.firebaseapp.com",
  databaseURL:
    "https://jain-family-app-5c025-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jain-family-app-5c025",
  storageBucket: "jain-family-app-5c025.appspot.com",
  messagingSenderId: "343373502499",
  appId: "1:343373502499:web:263b845599db285f69f996",
  measurementId: "G-Z5R92Q7F1K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
auth.languageCode = "it";
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  {},
  auth
);
