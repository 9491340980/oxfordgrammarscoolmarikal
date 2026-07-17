"use client";

import Link from "next/link";
import { useSite } from "@/lib/site-content";

export default function SiteFooter() {
  const { content: c } = useSite();
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 bg-ink-950 text-cream/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="font-display text-2xl font-semibold text-cream">{c["school.name"]}</div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
            {c["school.tagline"]} A CBSE-affiliated school nurturing future-ready minds since {c["school.estd"]}.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">{c["school.affiliation"]}</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link href="/academics" className="hover:text-gold">Academics</Link></li>
            <li><Link href="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link href="/faculty" className="hover:text-gold">Faculty</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream">Information</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/admissions" className="hover:text-gold">Admissions</Link></li>
            <li><Link href="/news" className="hover:text-gold">News & Circulars</Link></li>
            <li><Link href="/disclosure" className="hover:text-gold">Mandatory Disclosure</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream">Reach Us</h4>
          <p className="text-sm leading-relaxed text-cream/60">{c["contact.address"]}</p>
          <p className="mt-3 text-sm">
            <a href={`tel:${c["contact.phone"]}`} className="hover:text-gold">{c["contact.phone"]}</a><br />
            <a href={`mailto:${c["contact.email"]}`} className="hover:text-gold">{c["contact.email"]}</a>
          </p>
          <div className="mt-4 flex gap-3 text-xs">
            <a href={c["social.instagram"]} className="hover:text-gold">Instagram</a>
            <a href={c["social.facebook"]} className="hover:text-gold">Facebook</a>
            <a href={c["social.youtube"]} className="hover:text-gold">YouTube</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/50 sm:flex-row">
          <span>© {year} {c["school.name"]}. All rights reserved.</span>
          <span className="text-cream/40">CBSE Affiliated · Marikal</span>
        </div>
      </div>
    </footer>
  );
}
