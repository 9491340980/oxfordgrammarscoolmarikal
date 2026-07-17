"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DocTitle from "@/components/DocTitle";

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function NewsPage() {
  const { news } = useSite();
  return (
    <>
      <DocTitle text="News & Events" />
      <PageHero
        eyebrow="Newsroom"
        title="News, events & circulars."
        subtitle="Announcements, achievements and everything happening across our campus."
      />
      <section className="section bg-cream">
        <div className="container-x">
          {news.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((n, i) => (
                <Reveal key={n.id} delay={(i % 3) * 0.06}>
                  <Link href={`/article/?slug=${n.slug}`} className="card group block h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
                    {n.coverUrl && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={n.coverUrl} alt={n.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold uppercase tracking-wide text-gold">{n.category}</span>
                        <span className="text-ink/40">· {fmt(n.date)}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-ink group-hover:text-gold">{n.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/60 line-clamp-3">{n.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-ink/60">No news yet — check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
