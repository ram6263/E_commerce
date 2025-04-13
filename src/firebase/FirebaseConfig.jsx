// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCQdqmOZnSMbh6bqB8ZeEQe8V8R8l0GEQs",
  authDomain: "myfirstapp-2f062.firebaseapp.com",
  projectId: "myfirstapp-2f062",
  storageBucket: "myfirstapp-2f062.firebasestorage.app",
  messagingSenderId: "168489312602",
  appId: "1:168489312602:web:7eb591f2c590e4fc9ed363"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firedb = getFirestore(app);
const auth = getAuth(app);

export {firedb,auth}