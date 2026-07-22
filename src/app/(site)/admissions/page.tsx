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
  { c: "Nursery", a: "1,500", t: "22,000", iit: "—" },
  { c: "LKG", a: "1,500", t: "23,000", iit: "—" },
  { c: "UKG", a: "1,500", t: "24,000", iit: "—" },
  { c: "Grade 1", a: "1,500", t: "25,000", iit: "—" },
  { c: "Grade 2", a: "1,500", t: "28,000", iit: "—" },
  { c: "Grade 3", a: "1,500", t: "31,000", iit: "—" },
  { c: "Grade 4", a: "1,500", t: "34,000", iit: "—" },
  { c: "Grade 5", a: "1,500", t: "37,000", iit: "—" },
  { c: "Grade 6", a: "1,500", t: "41,000", iit: "15,000" },
  { c: "Grade 7", a: "1,500", t: "45,000", iit: "15,000" },
  { c: "Grade 8", a: "1,500", t: "50,000", iit: "15,000" },
];

export default function AdmissionsPage() {
  const { content: c } = useSite();
  return (
    <>
      <DocTitle text="Admissions" />
      <PageHero
        eyebrow="Admissions Open · 2026–27"
        title="Begin your child's journey with us."
        subtitle="Nursery to Grade 8. Limited seats, offered on a first-come basis subject to a friendly interaction."
        image={c["hero.image"]}
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
                <div className="card h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <span className="font-display text-3xl font-semibold text-gold/40">{s.n}</span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section bg-mint">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Documents required</p>
            <h2 className="display-h2 mt-3">What to bring.</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {DOCS.map((d) => (
              <div key={d} className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4 text-sm text-ink/70 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="mt-0.5 text-leaf">✓</span> {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee structure */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Fee Structure · 2026–27</p>
              <h2 className="display-h2 mt-3">Transparent, class-wise fees.</h2>
            </div>
            <a href="/fee-structure-2026-27.pdf" target="_blank" rel="noopener" className="btn-outline">
              ⬇ Download PDF
            </a>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 overflow-x-auto rounded-2xl border border-ink/10 shadow-soft">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-ink-950 text-cream">
                <tr>
                  <th className="px-5 py-4 font-semibold">Class</th>
                  <th className="px-5 py-4 font-semibold">Admission Fee (₹)</th>
                  <th className="px-5 py-4 font-semibold">Tuition Fee (₹)</th>
                  <th className="px-5 py-4 font-semibold">IIT Foundation (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 bg-white text-ink/70">
                {FEES.map((f) => (
                  <tr key={f.c} className="hover:bg-cream/60">
                    <td className="px-5 py-3 font-semibold text-ink">{f.c}</td>
                    <td className="px-5 py-3">₹ {f.a}</td>
                    <td className="px-5 py-3">₹ {f.t}</td>
                    <td className="px-5 py-3">{f.iit === "—" ? "—" : `₹ ${f.iit}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-4 text-xs text-ink/50">
            Fees are for the academic year 2026–27 and are subject to revision. IIT Foundation applies to Grades 6–8.
            For the latest details, please contact the school office or{" "}
            <a href="/fee-structure-2026-27.pdf" target="_blank" rel="noopener" className="text-gold underline">download the fee structure</a>.
          </p>
        </div>
      </section>

      {/* Enquiry */}
      <section className="section bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Enquire now</p>
            <h2 className="display-h2 mt-3">Let&apos;s talk.</h2>
            <p className="mt-5 max-w-md text-ink/60">
              Share a few details and our admissions team will call you within one working day.
            </p>
            <div className="mt-8 space-y-2 text-sm text-ink/70">
              <p>📞 <a href={`tel:${c["contact.phone"]}`} className="hover:text-gold">{c["contact.phone"]}</a></p>
              <p>✉️ <a href={`mailto:${c["contact.email"]}`} className="hover:text-gold">{c["contact.email"]}</a></p>
              <p>📍 {c["contact.address"]}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="card p-6">
            <EnquiryForm accessKey={c["forms.accessKey"]} toEmail={c["contact.email"]} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
