// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChv9PWQDHX_khFlWCENyL4Ld0iYR0BGxA",
  authDomain: "helmet-nepal-e8c26.firebaseapp.com",
  projectId: "helmet-nepal-e8c26",
  storageBucket: "helmet-nepal-e8c26.appspot.com",
  messagingSenderId: "556548425764",
  appId: "1:556548425764:web:51aa268538211dd2e8b0b1",
  measurementId: "G-Q72Z5F9CKY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
