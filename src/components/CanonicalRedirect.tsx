"use client";

import { useEffect } from "react";
import { SITE_URL } from "@/lib/seo";

/**
 * Sends visitors who land on the default Firebase URLs
 * (…web.app / …firebaseapp.com) to the real domain, so oxfordgrammarschoolmarikal.in
 * is the only address anyone uses. Does nothing on the real domain or localhost.
 */
export default function CanonicalRedirect() {
  useEffect(() => {
    const host = window.location.hostname;
    if (host.endsWith(".web.app") || host.endsWith(".firebaseapp.com")) {
      window.location.replace(SITE_URL + window.location.pathname + window.location.search);
    }
  }, []);
  return null;
}
