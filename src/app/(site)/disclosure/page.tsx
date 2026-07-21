"use client";

import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import DocTitle from "@/components/DocTitle";

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <tr className="border-b border-ink/10 last:border-0 even:bg-[#f7f4ec]">
      <td className="w-[45%] px-4 py-3 align-top text-sm font-semibold text-ink">{label}</td>
      <td className="border-l border-ink/10 px-4 py-3 align-top text-sm text-ink/90">{value || "—"}</td>
    </tr>
  );
}

function LinkRow({ label, url }: { label: string; url?: string }) {
  return (
    <tr className="border-b border-ink/10 last:border-0 even:bg-[#f7f4ec]">
      <td className="w-[45%] px-4 py-3 align-top text-sm font-semibold text-ink">{label}</td>
      <td className="border-l border-ink/10 px-4 py-3 align-top text-sm">
        {url ? (
          <a href={url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-bold text-coral underline decoration-2 underline-offset-2">
            Click here – View ↗
          </a>
        ) : (
          <span className="text-ink/60">Available at the school office</span>
        )}
      </td>
    </tr>
  );
}

function SectionTitle({ letter, title }: { letter: string; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-xl border-l-4 border-gold bg-cream px-4 py-3 shadow-soft">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ink text-sm font-bold text-gold-light">{letter}</span>
      <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ink sm:text-xl">{title}</h2>
    </div>
  );
}

const tableWrap = "overflow-x-auto rounded-xl border border-ink/10 bg-white shadow-soft";
const thBase = "border-r border-white/15 px-4 py-3 font-semibold last:border-0";

export default function DisclosurePage() {
  const { content: c, disclosureDocs: docs, results } = useSite();

  return (
    <>
      <DocTitle text="Mandatory Public Disclosure" />
      <PageHero
        eyebrow="Statutory · CBSE Affiliation Bylaws"
        title="Mandatory Public Disclosure"
        subtitle="Published in compliance with the CBSE Affiliation Bylaws. Updated by the school administration."
      />

      <section className="section bg-white">
        <div className="container-x max-w-5xl space-y-12">
          {/* A — General Information */}
          <div>
            <SectionTitle letter="A" title="General Information" />
            <div className={tableWrap}>
              <table className="w-full border-collapse">
                <tbody>
                  <Row label="Name of the School" value={c["school.name"]} />
                  <Row label="Affiliation No." value={c["disc.affiliationNo"]} />
                  <Row label="School Code" value={c["disc.schoolCode"]} />
                  <Row label="Complete Address with Pin Code" value={c["disc.address"]} />
                  <Row label="Principal Name & Qualification" value={`${c["disc.principalName"]}, ${c["disc.principalQual"]}`} />
                  <Row label="School Email ID" value={c["disc.email"]} />
                  <Row label="Contact Details (Landline/Mobile)" value={c["disc.phone"]} />
                  <Row label="Name of Trust / Society" value={c["disc.trustName"]} />
                  <Row label="Affiliation valid up to" value={c["disc.affiliationValid"]} />
                </tbody>
              </table>
            </div>
          </div>

          {/* B — Documents and Information */}
          <div>
            <SectionTitle letter="B" title="Documents and Information" />
            <div className={tableWrap}>
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="bg-ink-950 text-left text-sm text-white">
                    <th className={`${thBase} w-16`}>S. No.</th>
                    <th className={thBase}>Document / Information</th>
                    <th className={`${thBase} w-56`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((d, i) => (
                    <tr key={i} className="border-b border-ink/10 last:border-0 even:bg-[#f7f4ec]">
                      <td className="border-r border-ink/10 px-4 py-3 text-sm font-semibold text-ink">{i + 1}</td>
                      <td className="border-r border-ink/10 px-4 py-3 text-sm text-ink/90">{d.label}</td>
                      <td className="px-4 py-3 text-sm">
                        {d.fileUrl ? (
                          <a href={d.fileUrl} target="_blank" rel="noopener" className="font-bold text-coral underline decoration-2 underline-offset-2">
                            Click here – View ↗
                          </a>
                        ) : (
                          <span className="text-ink/60">{d.note || "Available on request"}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* C — Result and Academics */}
          <div>
            <SectionTitle letter="C" title="Result and Academics" />
            {results.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-ink/70">Board examination results — last three years.</p>
                <div className={tableWrap}>
                  <table className="w-full min-w-[560px] border-collapse">
                    <thead>
                      <tr className="bg-ink-950 text-left text-sm text-white">
                        <th className={thBase}>Year</th>
                        <th className={thBase}>Class</th>
                        <th className={thBase}>No. Registered</th>
                        <th className={thBase}>No. Passed</th>
                        <th className={thBase}>Pass %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r) => (
                        <tr key={r.id} className="border-b border-ink/10 last:border-0 even:bg-[#f7f4ec]">
                          <td className="border-r border-ink/10 px-4 py-3 text-sm font-semibold text-ink">{r.year}</td>
                          <td className="border-r border-ink/10 px-4 py-3 text-sm text-ink/90">{r.classLevel}</td>
                          <td className="border-r border-ink/10 px-4 py-3 text-sm text-ink/90">{r.appeared}</td>
                          <td className="border-r border-ink/10 px-4 py-3 text-sm text-ink/90">{r.passed}</td>
                          <td className="px-4 py-3 text-sm font-bold text-leaf">{r.passPercent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3 text-sm text-ink/80">
                Oxford Grammar School was established in {c["school.estd"]}. The first batch of students is yet to appear for the CBSE board examinations, so board results will be published here in due course.
              </p>
            )}
            <div className={`mt-6 ${tableWrap}`}>
              <table className="w-full border-collapse">
                <tbody>
                  <LinkRow label="Fee Structure of the School" url={c["disc.feeStructureUrl"]} />
                  <LinkRow label="Annual Academic Calendar" url={c["disc.academicCalendarUrl"]} />
                  <LinkRow label="List of School Management Committee (SMC)" url={c["disc.smcUrl"]} />
                  <LinkRow label="List of Parents-Teachers Association (PTA) Members" url={c["disc.ptaUrl"]} />
                </tbody>
              </table>
            </div>
          </div>

          {/* D — Staff */}
          <div>
            <SectionTitle letter="D" title="Staff (Teaching)" />
            <div className={tableWrap}>
              <table className="w-full border-collapse">
                <tbody>
                  <Row label="Principal" value="1" />
                  <Row label="Total No. of Teachers" value={c["disc.totalTeachers"]} />
                  <Row label="PGT (Post Graduate Teachers)" value={c["disc.pgt"]} />
                  <Row label="TGT (Trained Graduate Teachers)" value={c["disc.tgt"]} />
                  <Row label="PRT (Primary Teachers)" value={c["disc.prt"]} />
                  <Row label="PET (Physical Education Teacher)" value={c["disc.pet"]} />
                  <Row label="Special Educator" value={c["disc.specialEducator"]} />
                  <Row label="Counsellor & Wellness Teacher" value={c["disc.counsellor"]} />
                  <Row label="Teacher–Student Ratio" value={c["disc.ratio"]} />
                </tbody>
              </table>
            </div>
          </div>

          {/* E — Infrastructure */}
          <div>
            <SectionTitle letter="E" title="School Infrastructure" />
            <div className={tableWrap}>
              <table className="w-full border-collapse">
                <tbody>
                  <Row label="Total Campus Area of the School (sq. mtr.)" value={c["disc.totalArea"]} />
                  <Row label="Built-up Area (sq. mtr.)" value={c["disc.builtArea"]} />
                  <Row label="Area of Playground (sq. mtr.)" value={c["disc.playground"]} />
                  <Row label="No. and size of Classrooms" value={c["disc.classrooms"]} />
                  <Row label="No. and size of Laboratories (incl. Computer Labs)" value={c["disc.labs"]} />
                  <Row label="Number of Books in Library" value={c["disc.libraryBooks"]} />
                  <Row label="Internet Facility (Y/N)" value={c["disc.internet"]} />
                  <Row label="No. of Girls Toilets" value={c["disc.girlsToilets"]} />
                  <Row label="No. of Boys Toilets" value={c["disc.boysToilets"]} />
                  <LinkRow label="Link of YouTube Video of School Inspection" url={c["disc.inspectionVideo"]} />
                </tbody>
              </table>
            </div>
          </div>

          <p className="rounded-xl border border-gold/30 bg-gold-soft/50 p-4 text-xs text-ink/70">
            This disclosure is maintained as per the CBSE Affiliation Bylaws. For any clarification or to obtain
            certified copies of the listed documents, please contact the school office at {c["disc.phone"]} or {c["disc.email"]}.
          </p>
        </div>
      </section>
    </>
  );
}
