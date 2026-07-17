"use client";

import { useEffect } from "react";

/** Sets the document title on client-rendered pages. */
export default function DocTitle({ text }: { text: string }) {
  useEffect(() => {
    document.title = `${text} · Oxford Grammar School`;
  }, [text]);
  return null;
}
