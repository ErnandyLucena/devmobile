import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnZJQQ0ymJwnubNK-tLGMmnGfDB8vb3WY",
  authDomain: "devmobile-6e1b3.firebaseapp.com",
  projectId: "devmobile-6e1b3",
  storageBucket: "devmobile-6e1b3.firebasestorage.app",
  messagingSenderId: "221967527088",
  appId: "1:221967527088:android:26d1da75b3ad1f87855f75"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
