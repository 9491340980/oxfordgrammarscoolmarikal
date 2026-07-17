"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSite } from "@/lib/site-content";
import DocTitle from "@/components/DocTitle";

function Article() {
  const slug = useSearchParams().get("slug") || "";
  const { newsBySlug } = useSite();
  const n = newsBySlug(slug);

  if (!n) {
    return (
      <div className="container-x pt-[140px] pb-24 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">Article not found</h1>
        <Link href="/news" className="btn-gold mt-6">← Back to News</Link>
      </div>
    );
  }

  const date = new Date(n.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="pt-[72px]">
      <DocTitle text={n.title} />
      <div className="bg-ink-950 text-cream">
        <div className="container-x py-14">
          <Link href="/news" className="text-sm text-cream/60 hover:text-gold">← Back to News</Link>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="font-semibold uppercase tracking-wide text-gold">{n.category}</span>
            <span className="text-cream/40">· {date}</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-5xl">{n.title}</h1>
        </div>
      </div>

      {n.coverUrl && (
        <div className="container-x -mt-8">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] shadow-soft">
            <Image src={n.coverUrl} alt={n.title} fill className="object-cover" sizes="(max-width:1280px) 100vw, 1200px" priority />
          </div>
        </div>
      )}

      <div className="container-x py-14">
        <div className="mx-auto max-w-2xl">
          <p className="text-lg font-medium text-ink/80">{n.excerpt}</p>
          <div className="prose-ink mt-6 space-y-4 whitespace-pre-line text-ink/70">{n.body}</div>
        </div>
      </div>
    </article>
  );
}

export default function ArticlePage() {
  return (
    <Suspense fallback={<div className="pt-[140px] pb-24 text-center text-ink/50">Loading…</div>}>
      <Article />
    </Suspense>
  );
}
