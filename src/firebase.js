// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Konfigurasi Firebase Parakelana
const firebaseConfig = {
    apiKey: "AIzaSyBALOe3nuF-vRG3vXPhQEEyapOqjv40OmQ",
    authDomain: "parakelana-rental.firebaseapp.com",
    projectId: "parakelana-rental",
    storageBucket: "parakelana-rental.appspot.com", // ✅ diperbaiki ".app" jadi ".appspot.com"
    messagingSenderId: "396364748994",
    appId: "1:396364748994:web:6ec6cf40216669625e835b",
    measurementId: "G-7H6JRR08FJ"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Inisialisasi Auth
export const auth = getAuth(app);
