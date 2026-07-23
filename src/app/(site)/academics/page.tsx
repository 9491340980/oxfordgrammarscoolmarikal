"use client";

import Link from "next/link";
import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DocTitle from "@/components/DocTitle";

const WINGS = [
  {
    name: "Pre-Primary",
    grade: "Nursery – UKG",
    desc: "A play-based, activity-rich foundation where children fall in love with learning.",
    points: ["Phonics & early literacy", "Hands-on numeracy", "Rhymes, storytelling & art", "Caring, joyful classrooms"],
  },
  {
    name: "Primary",
    grade: "Grade 1 – 5",
    desc: "Strong foundations across languages, maths, science and social studies.",
    points: ["Reading & writing skills", "Concept-based maths", "Activity-led science", "Computer basics"],
  },
  {
    name: "Middle School",
    grade: "Grade 6 – 8",
    desc: "Concepts deepen across science, maths and languages, with an IIT foundation.",
    points: ["Lab-based science", "Maths & IIT foundation", "Computer education", "Sports & activities"],
  },
];

const FACILITIES = [
  ["Science, Maths & Computer Labs", "Well-equipped labs for hands-on science, maths and computer learning, as per CBSE norms."],
  ["Library", "A growing library of storybooks, references, encyclopaedias and periodicals."],
  ["Smart Classrooms", "Interactive digital panels for blended, engaging learning."],
  ["IIT Foundation", "An early foundation for competitive exams from Grade 6 onwards."],
  ["Sports & Games", "Cricket, athletics and outdoor games on our school playground."],
  ["Music & Dance", "Annual Day, cultural programmes and stage performances for every child."],
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
              <article className="card flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
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
                <div className="card h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <h3 className="text-lg font-semibold text-ink">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Board Results */}
      {results.length > 0 && (
      <section className="section bg-white">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Board Results</p>
            <h2 className="display-h2 mt-3">Our board results.</h2>
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
      )}

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
