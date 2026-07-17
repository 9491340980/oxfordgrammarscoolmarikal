// Firebase client (browser) — these values are public by design and safe to ship.
// Access is controlled by Firestore Security Rules, not by hiding this config.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnEF5jqjfA4r1ruePVM3f6Blh15TYPnw0",
  authDomain: "oxford-grammar-school-146cb.firebaseapp.com",
  projectId: "oxford-grammar-school-146cb",
  storageBucket: "oxford-grammar-school-146cb.firebasestorage.app",
  messagingSenderId: "523380388874",
  appId: "1:523380388874:web:34a54504ed81b19e499bf3",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Where the whole editable content object lives in Firestore.
export const CONTENT_DOC = { collection: "site", id: "content" } as const;
