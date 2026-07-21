"use client";

import Image from "next/image";
import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DocTitle from "@/components/DocTitle";

const TINTS = [
  "bg-coral-soft text-coral",
  "bg-leaf-soft text-leaf",
  "bg-amber-soft text-amber",
  "bg-gold-soft text-ink",
];

function initials(name: string) {
  return name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function FacultyPage() {
  const { faculty, content: c } = useSite();
  const leaders = faculty.filter((f) => f.photoUrl);        // Correspondent, then Principal
  const teachers = faculty.filter((f) => !f.photoUrl);

  return (
    <>
      <DocTitle text="Faculty" />
      <PageHero
        eyebrow="Our People"
        title="Teachers who know every child by name."
        subtitle={`A team of ${c["disc.totalTeachers"] || faculty.length} dedicated educators, led with care — and a shared belief in every child.`}
        image={c["about.image"]}
      />

      {/* Leadership — with photos */}
      <section className="section bg-cream">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Leadership</p>
            <h2 className="display-h2 mt-3">Guiding the school.</h2>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {leaders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <article className="card group h-full overflow-hidden text-center">
                  <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                    <Image src={f.photoUrl as string} alt={f.name} fill className="object-cover object-top transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 40vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-ink">{f.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-gold">{f.designation}</p>
                    <p className="mt-2 text-xs text-ink/50">{f.qualification}{f.subject && ` · ${f.subject}`}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching staff — clean text cards, no photos */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our Teachers</p>
            <h2 className="display-h2 mt-3">Meet the teaching team.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((f, i) => (
              <Reveal key={f.name} delay={(i % 3) * 0.05}>
                <div className="card flex h-full items-center gap-4 p-5">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold ${TINTS[i % TINTS.length]}`}>
                    {initials(f.name)}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-ink">{f.name}</div>
                    <div className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-gold">
                      {f.designation}{f.subject && ` · ${f.subject}`}
                    </div>
                    <div className="mt-0.5 text-xs text-ink/50">{f.qualification}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
