//@page_author: Roshan_Bhatta (Last updated :1/14/23 6:04PM)
/*
  - `npm i firebase` installs firebase
  - firebase.js contains the firebase setup with all the variables on the app 
  - The web app configuratiuon is set up locally in .env.local file 
  - getAuth  is used for user authentication
*/
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

//exported variable for authentication
export const auth = getAuth();

//Exported to use this app everywhere in the program
export default app;
