"use client";

import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import DocTitle from "@/components/DocTitle";

const STEPS = [
  { n: "01", t: "Enquire", d: "Submit the enquiry form or call our admissions office." },
  { n: "02", t: "Campus visit", d: "Tour the campus and meet the faculty and coordinators." },
  { n: "03", t: "Interaction", d: "A friendly, age-appropriate interaction with the child (and parents)." },
  { n: "04", t: "Confirmation", d: "Complete the form, submit documents and secure the seat." },
];

const DOCS = [
  "Birth certificate of the child",
  "Transfer Certificate (for Grade 2 and above)",
  "Previous year's report card / progress report",
  "Aadhaar card of the child",
  "Passport-size photographs (4)",
  "Address proof of parent / guardian",
];

const FEES = [
  ["Nursery – KG", "Registration + Admission + Annual + Tuition"],
  ["Grade 1 – 5", "Registration + Admission + Annual + Tuition"],
  ["Grade 6 – 8", "Registration + Admission + Annual + Tuition"],
  ["Grade 9 – 10", "Registration + Admission + Annual + Tuition"],
];

export default function AdmissionsPage() {
  const { content: c } = useSite();
  return (
    <>
      <DocTitle text="Admissions" />
      <PageHero
        eyebrow="Admissions Open · 2026–27"
        title="Begin your child's journey with us."
        subtitle="Nursery to Grade 10. Limited seats, offered on a first-come basis subject to a friendly interaction."
      />

      {/* Process */}
      <section className="section bg-cream">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="display-h2 mt-3">A simple, four-step process.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={(i % 4) * 0.06}>
                <div className="card h-full p-6">
                  <span className="font-display text-3xl font-semibold text-gold/40">{s.n}</span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Docs + Fees */}
      <section className="section bg-cream-dark">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal className="card p-8">
            <p className="eyebrow">Documents required</p>
            <h3 className="display-h2 mt-3 !text-3xl">What to bring.</h3>
            <ul className="mt-6 space-y-3 text-sm text-ink/70">
              {DOCS.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-0.5 text-gold">✓</span> {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="card p-8">
            <p className="eyebrow">Fee structure</p>
            <h3 className="display-h2 mt-3 !text-3xl">Transparent fees.</h3>
            <div className="mt-6 divide-y divide-ink/10">
              {FEES.map(([g, d]) => (
                <div key={g} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="font-semibold text-ink">{g}</span>
                  <span className="text-right text-ink/50">{d}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-ink/50">
              Detailed, class-wise fee figures are shared at the admissions office and published under our{" "}
              <a href="/disclosure" className="text-gold underline">Mandatory Public Disclosure</a>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Enquiry */}
      <section className="section bg-ink-950 text-cream">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Enquire now</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">Let&apos;s talk.</h2>
            <p className="mt-5 max-w-md text-cream/60">
              Share a few details and our admissions team will call you within one working day.
            </p>
            <div className="mt-8 space-y-2 text-sm text-cream/70">
              <p>📞 <a href={`tel:${c["contact.phone"]}`} className="hover:text-gold">{c["contact.phone"]}</a></p>
              <p>✉️ <a href={`mailto:${c["contact.email"]}`} className="hover:text-gold">{c["contact.email"]}</a></p>
              <p>📍 {c["contact.address"]}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl bg-white/5 p-6 backdrop-blur">
            <EnquiryForm dark accessKey={c["forms.accessKey"]} toEmail={c["contact.email"]} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
