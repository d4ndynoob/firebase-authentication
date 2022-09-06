// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUiQOSWoN2-cdb7YsrpZp13fE1dDHUpeY",
  authDomain: "react-firebase-authentic-da35e.firebaseapp.com",
  projectId: "react-firebase-authentic-da35e",
  storageBucket: "react-firebase-authentic-da35e.appspot.com",
  messagingSenderId: "816348273216",
  appId: "1:816348273216:web:9ebc81d079dbbd22c7dda5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)