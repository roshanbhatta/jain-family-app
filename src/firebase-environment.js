// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {getDatabase,ref,set} from "firebase/database"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0FIlcDpvKlnW0SgdbBcvs3kD0HhYQ5vw",
  authDomain: "jain-family-app-5c025.firebaseapp.com",
  databaseURL: "https://jain-family-app-5c025-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jain-family-app-5c025",
  storageBucket: "jain-family-app-5c025.appspot.com",
  messagingSenderId: "343373502499",
  appId: "1:343373502499:web:263b845599db285f69f996",
  measurementId: "G-Z5R92Q7F1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();


function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
writeUserData(1,"roshan","email","url");
console.log("hello");