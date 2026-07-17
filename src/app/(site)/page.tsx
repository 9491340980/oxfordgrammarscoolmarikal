"use client";

import Link from "next/link";
import Image from "next/image";
import { useSite } from "@/lib/site-content";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import CategoryChip from "@/components/CategoryChip";

const PILLARS = [
  { icon: "🧑‍🏫", tint: "bg-coral-soft", t: "Teachers who believe", d: "Mentors who know every child by name — and never let a single one slip through." },
  { icon: "🔬", tint: "bg-leaf-soft", t: "Learning by doing", d: "Labs, projects and real questions over rote — concepts that actually stick." },
  { icon: "🎨", tint: "bg-amber-soft", t: "Art & sport for all", d: "Music, dance, cricket, athletics — talent grows outside the textbook too." },
  { icon: "🛡️", tint: "bg-ink-100", t: "A campus that's safe", d: "CCTV, GPS buses, trained staff and a nurse on site. Parents trust us fully." },
  { icon: "🤝", tint: "bg-coral-soft", t: "Values that last", d: "Honesty, empathy and grit — lived every day, not just preached at assembly." },
  { icon: "🎓", tint: "bg-leaf-soft", t: "Results that open doors", d: "Top board scores and alumni in the country's finest colleges." },
];

const JOURNEY = [
  { no: "01", tint: "bg-coral text-white", name: "Primary Wing", grade: "Nursery – Grade 5", desc: "Play, phonics & wonder. Confident readers and joyful learners." },
  { no: "02", tint: "bg-amber text-white", name: "Middle Wing", grade: "Grade 6 – 8", desc: "Concepts deepen across science, maths & languages, with bold projects." },
  { no: "03", tint: "bg-leaf text-white", name: "Secondary Wing", grade: "Grade 9 – 10", desc: "Focused boards, career guidance & one-on-one mentoring." },
];

const STAT_TINTS = ["text-coral", "text-leaf", "text-amber", "text-ink"];

export default function HomePage() {
  const s = useSite();
  const c = s.content;
  const gallery = s.gallery.slice(0, 6);
  const news = s.news.slice(0, 3);
  const results = s.resultsByClass("X").slice(0, 3);

  const stats = [1, 2, 3, 4].map((i) => ({
    value: c[`stats.s${i}.value`],
    label: c[`stats.s${i}.label`],
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream pt-[72px]">
        <div className="pointer-events-none absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full bg-amber/35 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-40 h-[380px] w-[380px] rounded-full bg-coral/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-1/3 h-[300px] w-[300px] rounded-full bg-leaf/25 blur-3xl" />
        <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> {c["hero.kicker"]}</p>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl">
              {c["hero.title"]}{" "}
              <span className="relative inline-block text-gold">
                {c["hero.titleAccent"]}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9C50 3 150 3 198 9" stroke="#e2a018" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">{c["hero.subtitle"]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/admissions" className="btn-gold">Begin Admission</Link>
              <Link href="/gallery" className="btn-outline">Explore Campus</Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-semibold text-ink">{s.value}</div>
                  <div className="text-xs uppercase tracking-wide text-ink/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <Reveal className="relative" y={28}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
              <Image src={c["hero.image"]} alt="Students at Oxford Grammar School" fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div className="absolute -left-4 bottom-10 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-card backdrop-blur">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-soft text-lg">🏆</span>
              <div>
                <div className="text-sm font-bold text-ink">{c["stats.s3.value"]} Board Results</div>
                <div className="text-xs text-ink/50">Class X · {results[0]?.year ?? "2024-25"}</div>
              </div>
            </div>
            <div className="absolute -right-3 top-8 rotate-3 rounded-full bg-coral px-4 py-2 text-xs font-bold text-white shadow-card">
              Admissions Open 2026–27
            </div>
          </Reveal>
        </div>

        {/* Marquee */}
        <div className="border-y border-ink/10 bg-cream py-3 text-ink/70">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-sm font-medium uppercase tracking-wider">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex items-center gap-10">
                <span>CBSE Affiliated</span><span className="text-gold">✦</span>
                <span>{c["stats.s1.value"]} Years of Excellence</span><span className="text-gold">✦</span>
                <span>{c["stats.s2.value"]} Students</span><span className="text-gold">✦</span>
                <span>{c["disc.totalTeachers"]} Mentors</span><span className="text-gold">✦</span>
                <span>State Sports Champions</span><span className="text-gold">✦</span>
                <span>12-Acre Green Campus</span><span className="text-gold">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BELIEF / ABOUT */}
      <section className="section bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-soft">
              <Image src={c["about.image"]} alt="A class at Oxford Grammar School" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{c["about.eyebrow"]}</p>
            <h2 className="display-h2 mt-3">{c["about.title"]}</h2>
            <div className="prose-ink mt-6 space-y-4">
              <p>{c["about.body1"]}</p>
              <p>{c["about.body2"]}</p>
            </div>
            <Link href="/about" className="btn-ink mt-8">Our Story →</Link>
          </Reveal>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-cream py-16">
        <div className="container-x grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-ink/10 bg-white p-6 text-center shadow-soft">
                <div className={`font-display text-4xl font-semibold sm:text-5xl ${STAT_TINTS[i % 4]}`}>{s.value}</div>
                <div className="mt-2 text-sm text-ink/50">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Why Oxford Grammar School</p>
            <h2 className="display-h2 mt-3">Six fires we keep lit.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} delay={(i % 3) * 0.08}>
                <article className="card group h-full p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <span className={`badge ${p.tint} transition group-hover:scale-110`}>{p.icon}</span>
                  <h3 className="mt-4 text-xl font-semibold text-ink">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="section bg-mint">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">The Journey</p>
            <h2 className="display-h2 mt-3">From first steps to graduation.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {JOURNEY.map((r, i) => (
              <Reveal key={r.no} delay={i * 0.08}>
                <Link href="/academics" className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl font-display text-lg font-bold ${r.tint}`}>
                    {r.no}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-ink">{r.name}</h3>
                  <p className="mt-1 text-sm font-medium text-gold">{r.grade}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{r.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink transition group-hover:gap-2 group-hover:text-gold">
                    Explore <span>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS GALLERY */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Campus Life</p>
              <h2 className="display-h2 mt-3">Twelve acres to explore.</h2>
            </div>
            <Link href="/gallery" className="btn-outline">Full Gallery →</Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((g, i) => (
              <Reveal key={g.id} delay={(i % 3) * 0.06} className={i === 0 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-2" : ""}>
                <figure className="group relative h-full min-h-[180px] overflow-hidden rounded-2xl">
                  <Image src={g.url} alt={g.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 50vw, 33vw" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gold-light">{g.category}</span>
                    <p className="text-sm font-semibold text-cream">{g.title}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section bg-cream">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Proven Results</p>
            <h2 className="display-h2 mt-3">Three years. Outstanding boards.</h2>
            <p className="mt-5 max-w-md text-ink/60">
              Our Class X students consistently rank among the region's best — built on mentoring, not pressure.
            </p>
            <Link href="/academics" className="btn-gold mt-8">See Academics →</Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-3">
              {results.map((r) => (
                <div key={r.id} className="card overflow-hidden p-0 text-center">
                  <div className="bg-leaf-soft py-2 text-xs font-semibold uppercase tracking-wider text-leaf">{r.year}</div>
                  <div className="p-6">
                    <div className="font-display text-4xl font-semibold text-leaf">{r.passPercent}%</div>
                    <div className="mt-1 text-xs text-ink/50">Pass · Class {r.classLevel}</div>
                    <div className="mt-4 border-t border-ink/10 pt-3 text-sm text-ink/70">
                      🏆 Topper {r.topperScore}<br />
                      <span className="text-ink/50">{r.topperName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPAL */}
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-[2rem] shadow-soft lg:w-full">
              <Image src={c["principal.photo"]} alt={c["principal.name"]} fill className="object-cover" sizes="320px" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-5xl font-display text-gold">“</span>
            <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">{c["principal.message"]}</p>
            <div className="mt-6">
              <div className="font-semibold text-ink">{c["principal.name"]}</div>
              <div className="text-sm text-ink/50">Principal, {c["school.name"]}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEWS */}
      <section className="section bg-sky">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Latest</p>
              <h2 className="display-h2 mt-3">News & happenings.</h2>
            </div>
            <Link href="/news" className="btn-outline">All News →</Link>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {news.map((n, i) => (
              <Reveal key={n.id} delay={i * 0.08}>
                <Link href={`/article/?slug=${n.slug}`} className="card group block h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
                  {n.coverUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={n.coverUrl} alt={n.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                    </div>
                  )}
                  <div className="p-6">
                    <CategoryChip category={n.category} />
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-ink group-hover:text-gold">{n.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60 line-clamp-2">{n.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS CTA */}
      <section id="apply" className="section bg-white">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-coral via-coral to-amber px-6 py-14 shadow-card sm:px-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-amber/40 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="text-white">
                <span className="chip bg-white/20 text-white">🎒 Admissions Open · 2026–27</span>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.08] sm:text-5xl">
                  Let&apos;s build your child&apos;s future together.
                </h2>
                <p className="mt-5 max-w-md text-white/85">
                  Limited seats, Nursery to Grade 10. Book a visit and meet the teachers who&apos;ll change their life.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-card">
                <EnquiryForm accessKey={c["forms.accessKey"]} toEmail={c["contact.email"]} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
