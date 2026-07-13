// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loop-clone-c9bec.firebaseapp.com",
  projectId: "loop-clone-c9bec",
  storageBucket: "loop-clone-c9bec.firebasestorage.app",
  messagingSenderId: "213509970837",
  appId: "1:213509970837:web:110b701888df85f4b2f49c",
  measurementId: "G-NR42WYRZ0C"
};

// Initialize Firebase
// 
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);