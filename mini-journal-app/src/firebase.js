import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBOrG2IavkDkAFIrA_u6ixEdgA59onwhA",
    authDomain: "notebook-app-7a25b.firebaseapp.com",
    projectId: "notebook-app-7a25b",
    storageBucket: "notebook-app-7a25b.firebasestorage.app",
    messagingSenderId: "83097244893",
    appId: "1:83097244893:web:e8ad7099430cd65b6d7734"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);