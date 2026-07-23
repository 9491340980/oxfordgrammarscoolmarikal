"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, CONTENT_DOC } from "@/lib/firebase";
import { CONTENT_SOURCE } from "@/lib/config";
import rawContent from "../../content.json";
import { selectSite, type Content, type SiteData } from "@/lib/content-helpers";

const INITIAL = rawContent as Content;
const SiteContext = createContext<SiteData>(selectSite(INITIAL));

/**
 * Provides site content to every public page.
 *
 * CONTENT_SOURCE === "local"  (default): render straight from the bundled
 *   content.json — no database calls, no flicker, fastest load.
 * CONTENT_SOURCE === "server": also live-sync from Firestore so /admin edits
 *   appear without a rebuild (1 DB read per visit).
 * See src/lib/config.ts to switch.
 */
export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Content>(INITIAL);

  useEffect(() => {
    // Static mode: never touch the database — content.json is the source of truth.
    if (CONTENT_SOURCE !== "server") return;

    let unsub = () => {};
    try {
      unsub = onSnapshot(
        doc(db, CONTENT_DOC.collection, CONTENT_DOC.id),
        (snap) => {
          if (snap.exists()) setContent(snap.data() as Content);
        },
        () => {} // ignore errors (offline / not enabled yet) — keep fallback
      );
    } catch {
      /* keep fallback */
    }
    return () => unsub();
  }, []);

  return <SiteContext.Provider value={selectSite(content)}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
