import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKLZX7h5DnZa2sPmaWDj3cHpOOk-1WxcE",
  authDomain: "community-hero-ai-8409b.firebaseapp.com",
  projectId: "community-hero-ai-8409b",
  storageBucket: "community-hero-ai-8409b.firebasestorage.app",
  messagingSenderId: "744822069184",
  appId: "1:744822069184:web:8aa1c6c7080f87ebf65a25",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;