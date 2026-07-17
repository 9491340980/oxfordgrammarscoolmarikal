"use client";

import Link from "next/link";
import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DocTitle from "@/components/DocTitle";

const WINGS = [
  {
    name: "Primary Wing",
    grade: "Nursery – Grade 5",
    desc: "A play-based, activity-rich foundation where children fall in love with learning.",
    points: ["Phonics & early literacy", "Hands-on numeracy", "Storytelling & art", "No-bag activity days"],
  },
  {
    name: "Middle Wing",
    grade: "Grade 6 – 8",
    desc: "Concepts deepen across science, maths and languages, anchored by bold projects.",
    points: ["Lab-based science", "Coding & robotics", "Debate & public speaking", "Sports & clubs"],
  },
  {
    name: "Secondary Wing",
    grade: "Grade 9 – 10",
    desc: "Focused board preparation with career guidance and one-on-one mentoring.",
    points: ["CBSE board focus", "Career counselling", "Doubt-clearing labs", "Mentor for every student"],
  },
];

const FACILITIES = [
  ["Science Labs", "Physics, Chemistry & Biology labs equipped to CBSE norms."],
  ["Robotics & AI", "Coding, electronics, 3D printing and design thinking."],
  ["Library", "10,000+ books, periodicals and a quiet reading loft."],
  ["Smart Classrooms", "Interactive panels and blended digital learning."],
  ["Sports Arena", "Cricket, athletics, basketball and indoor games."],
  ["Performing Arts", "Music, dance and theatre studios for every child."],
];

export default function AcademicsPage() {
  const { results, gallery } = useSite();
  const heroImg = (gallery.find((g) => g.category === "Academics") ?? gallery[0])?.url;
  return (
    <>
      <DocTitle text="Academics" />
      <PageHero
        eyebrow="Academics"
        title="Deep learning, joyfully delivered."
        subtitle="A CBSE curriculum that balances rigour with creativity — so students leave us curious, confident and college-ready."
        image={heroImg}
      />

      {/* Wings */}
      <section className="section bg-cream">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          {WINGS.map((w, i) => (
            <Reveal key={w.name} delay={i * 0.08}>
              <article className="card flex h-full flex-col p-7">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">{w.grade}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{w.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{w.desc}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink/70">
                  {w.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="text-gold">✦</span> {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="section bg-mint">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Facilities</p>
            <h2 className="display-h2 mt-3">Built for hands-on learning.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 3) * 0.06}>
                <div className="card h-full p-6">
                  <h3 className="text-lg font-semibold text-ink">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Board Results */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Board Results</p>
            <h2 className="display-h2 mt-3">Three years of excellence.</h2>
          </Reveal>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-ink/10 bg-white shadow-soft">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-cream text-ink/60">
                <tr>
                  <th className="px-5 py-4 font-semibold">Year</th>
                  <th className="px-5 py-4 font-semibold">Class</th>
                  <th className="px-5 py-4 font-semibold">Appeared</th>
                  <th className="px-5 py-4 font-semibold">Passed</th>
                  <th className="px-5 py-4 font-semibold">Pass %</th>
                  <th className="px-5 py-4 font-semibold">Topper</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 text-ink/70">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-cream/60">
                    <td className="px-5 py-4 font-medium text-ink">{r.year}</td>
                    <td className="px-5 py-4">{r.classLevel}</td>
                    <td className="px-5 py-4">{r.appeared}</td>
                    <td className="px-5 py-4">{r.passed}</td>
                    <td className="px-5 py-4 font-semibold text-gold">{r.passPercent}%</td>
                    <td className="px-5 py-4">{r.topperName} {r.topperScore && `· ${r.topperScore}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="display-h2">Curious to see it in person?</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">Book a campus visit and walk through our classrooms, labs and library.</p>
            <Link href="/admissions" className="btn-gold mt-8">Book a Visit →</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
