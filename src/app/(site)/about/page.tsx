"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DocTitle from "@/components/DocTitle";

const VALUES = [
  { t: "Curiosity", d: "We protect the instinct to ask 'why' — the engine of every great learner." },
  { t: "Integrity", d: "Honesty and responsibility, practised daily, not just preached at assembly." },
  { t: "Empathy", d: "Children who notice others, include others, and lift others up." },
  { t: "Excellence", d: "Doing ordinary things extraordinarily well — in class, on field and on stage." },
];

const TIMELINE = [
  { y: "1998", t: "The first bell", d: "Oxford Grammar School opens with 84 students and a simple promise: believe in every child." },
  { y: "2006", t: "CBSE affiliation", d: "Formal CBSE affiliation and our first senior secondary batch." },
  { y: "2014", t: "New campus", d: "A 12-acre green campus with labs, library and sports arena." },
  { y: "2021", t: "Future-ready", d: "Robotics, coding and design thinking woven into the curriculum." },
  { y: "Today", t: "2,400+ strong", d: "One of the region's most-loved schools, with alumni across the world." },
];

export default function AboutPage() {
  const { content: c } = useSite();
  return (
    <>
      <DocTitle text="About Us" />
      <PageHero
        eyebrow="About Us"
        title="A school built on belief, not pressure."
        subtitle={`Since ${c["school.estd"]}, ${c["school.name"]} has grown into one of the region's most-loved CBSE schools — by holding on to one idea.`}
        image={c["about.image"]}
      />

      <section className="section bg-cream">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-soft">
              <Image src={c["about.image"]} alt="Campus" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{c["about.eyebrow"]}</p>
            <h2 className="display-h2 mt-3">{c["about.title"]}</h2>
            <div className="prose-ink mt-6 space-y-4">
              <p>{c["about.body1"]}</p>
              <p>{c["about.body2"]}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="section bg-cream">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-gold/25 bg-gold-soft/30 p-8">
            <p className="eyebrow">Our Vision</p>
            <p className="mt-4 font-display text-2xl leading-snug text-ink">
              To raise confident, compassionate and capable young people who think for themselves and act for others.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-gold/25 bg-gold-soft/30 p-8">
            <p className="eyebrow">Our Mission</p>
            <p className="mt-4 font-display text-2xl leading-snug text-ink">
              To blend deep academics with art, sport and real-world learning — in a safe, joyful, future-ready campus.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-cream">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What we stand for</p>
            <h2 className="display-h2 mt-3">Four values, lived daily.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={(i % 4) * 0.06}>
                <div className="card h-full p-6">
                  <h3 className="text-xl font-semibold text-ink">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-cream-dark">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our Journey</p>
            <h2 className="display-h2 mt-3">{new Date().getFullYear() - Number(c["school.estd"])} years in the making.</h2>
          </Reveal>
          <div className="mt-12 space-y-6">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.y} delay={i * 0.05}>
                <div className="flex gap-6 rounded-2xl border border-ink/10 bg-white p-6">
                  <div className="w-20 shrink-0 font-display text-2xl font-semibold text-gold">{t.y}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{t.t}</h3>
                    <p className="mt-1 text-sm text-ink/60">{t.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principal */}
      <section className="section bg-cream">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-square w-60 overflow-hidden rounded-[2rem] shadow-soft lg:w-full">
              <Image src={c["principal.photo"]} alt={c["principal.name"]} fill className="object-cover" sizes="320px" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Principal&apos;s Message</p>
            <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">{c["principal.message"]}</p>
            <div className="mt-6">
              <div className="font-semibold text-ink">{c["principal.name"]}</div>
              <div className="text-sm text-ink/50">Principal</div>
            </div>
            <Link href="/admissions" className="btn-gold mt-8">Join Our Family →</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
