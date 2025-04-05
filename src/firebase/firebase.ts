import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtyxcH2EXtaYehxBllkRi8h0SfJy9IwCc",
  authDomain: "react-invoice-f349b.firebaseapp.com",
  projectId: "react-invoice-f349b",
  storageBucket: "react-invoice-f349b.firebasestorage.app",
  messagingSenderId: "353997432586",
  appId: "1:353997432586:web:11da9f0022f5e9d142fcf3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
