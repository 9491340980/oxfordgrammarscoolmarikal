// Pull the latest content from Firestore (what staff edited in /admin) into
// content.json, so it ships with the next static build.
//
//   Usage:  npm run sync-from-db      then  npm run build  &&  deploy
//
// Reads the public `site/content` doc with the browser SDK (public read is
// allowed by the security rules) — no service-account key needed.

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.join(__dirname, "..", "content.json");

const firebaseConfig = {
  apiKey: "AIzaSyAnEF5jqjfA4r1ruePVM3f6Blh15TYPnw0",
  authDomain: "oxford-grammar-school-146cb.firebaseapp.com",
  projectId: "oxford-grammar-school-146cb",
  storageBucket: "oxford-grammar-school-146cb.firebasestorage.app",
  messagingSenderId: "523380388874",
  appId: "1:523380388874:web:34a54504ed81b19e499bf3",
};

// Bail out if the DB hangs (offline, etc.) so the command never sticks.
const guard = setTimeout(() => {
  console.error("✖ Timed out reaching Firestore. content.json left unchanged.");
  process.exit(1);
}, 20000);

try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const snap = await getDoc(doc(db, "site", "content"));

  if (!snap.exists()) {
    clearTimeout(guard);
    console.log("ℹ No edits in the database (site/content is empty). content.json is already the source of truth — nothing to sync.");
    process.exit(0);
  }

  const data = snap.data();
  if (!data.settings) {
    clearTimeout(guard);
    console.error("✖ The database doc has an unexpected shape (no 'settings'). Aborting to avoid corrupting content.json.");
    process.exit(1);
  }

  // Back up the current file, then write the DB content.
  fs.copyFileSync(contentPath, contentPath + ".bak");
  fs.writeFileSync(contentPath, JSON.stringify(data, null, 2) + "\n");

  clearTimeout(guard);
  console.log("✓ Synced Firestore (site/content) → content.json  (previous saved as content.json.bak)");
  console.log("  Next:  npm run build   then deploy.");
  process.exit(0);
} catch (e) {
  clearTimeout(guard);
  console.error("✖ Sync failed:", e.message);
  process.exit(1);
}
