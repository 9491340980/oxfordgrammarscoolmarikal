"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, CONTENT_DOC } from "@/lib/firebase";
import rawContent from "../../content.json";
import { selectSite, type Content, type SiteData } from "@/lib/content-helpers";

const INITIAL = rawContent as Content;
const SiteContext = createContext<SiteData>(selectSite(INITIAL));

/**
 * Provides site content to every public page.
 * First paint uses the bundled content.json (instant + SEO), then it live-syncs
 * with Firestore so admin edits appear without any rebuild.
 */
export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Content>(INITIAL);

  useEffect(() => {
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
