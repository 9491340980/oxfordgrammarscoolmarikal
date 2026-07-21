"use client";

import { useSite } from "@/lib/site-content";
import PageHero from "@/components/PageHero";
import DocTitle from "@/components/DocTitle";

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <tr className="hover:bg-cream-dark/50">
      <td className="w-1/2 border border-ink/10 px-4 py-3 text-sm font-medium text-ink/80">{label}</td>
      <td className="border border-ink/10 px-4 py-3 text-sm text-ink/70">{value || "—"}</td>
    </tr>
  );
}

function LinkRow({ label, url }: { label: string; url?: string }) {
  return (
    <tr className="hover:bg-cream-dark/50">
      <td className="w-1/2 border border-ink/10 px-4 py-3 text-sm font-medium text-ink/80">{label}</td>
      <td className="border border-ink/10 px-4 py-3 text-sm">
        {url ? (
          <a href={url} target="_blank" rel="noopener" className="font-medium text-gold underline">View / Download ↗</a>
        ) : (
          <span className="text-ink/50">Available at the school office</span>
        )}
      </td>
    </tr>
  );
}

function SectionTitle({ letter, title }: { letter: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink text-sm font-bold text-gold-light">{letter}</span>
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
    </div>
  );
}

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

      <section className="section bg-cream">
        <div className="container-x max-w-5xl space-y-16">
          {/* A — General Information */}
          <div>
            <SectionTitle letter="A" title="General Information" />
            <div className="overflow-x-auto rounded-xl border border-ink/10">
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
            <div className="overflow-x-auto rounded-xl border border-ink/10">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="bg-cream text-left text-sm text-ink">
                    <th className="border border-ink/10 px-4 py-3 font-semibold">S. No.</th>
                    <th className="border border-ink/10 px-4 py-3 font-semibold">Document / Information</th>
                    <th className="border border-ink/10 px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((d, i) => (
                    <tr key={i} className="hover:bg-cream-dark/50">
                      <td className="border border-ink/10 px-4 py-3 text-sm text-ink/70">{i + 1}</td>
                      <td className="border border-ink/10 px-4 py-3 text-sm text-ink/80">{d.label}</td>
                      <td className="border border-ink/10 px-4 py-3 text-sm">
                        {d.fileUrl ? (
                          <a href={d.fileUrl} target="_blank" rel="noopener" className="font-medium text-gold underline">
                            View document ↗
                          </a>
                        ) : (
                          <span className="text-ink/50">{d.note || "Available on request"}</span>
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
                <p className="mb-4 text-sm text-ink/60">Board examination results — last three years.</p>
                <div className="overflow-x-auto rounded-xl border border-ink/10">
                  <table className="w-full min-w-[560px] border-collapse">
                    <thead>
                      <tr className="bg-cream text-left text-sm text-ink">
                        <th className="border border-ink/10 px-4 py-3 font-semibold">Year</th>
                        <th className="border border-ink/10 px-4 py-3 font-semibold">Class</th>
                        <th className="border border-ink/10 px-4 py-3 font-semibold">No. Registered</th>
                        <th className="border border-ink/10 px-4 py-3 font-semibold">No. Passed</th>
                        <th className="border border-ink/10 px-4 py-3 font-semibold">Pass %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r) => (
                        <tr key={r.id} className="hover:bg-cream-dark/50">
                          <td className="border border-ink/10 px-4 py-3 text-sm text-ink/80">{r.year}</td>
                          <td className="border border-ink/10 px-4 py-3 text-sm text-ink/70">{r.classLevel}</td>
                          <td className="border border-ink/10 px-4 py-3 text-sm text-ink/70">{r.appeared}</td>
                          <td className="border border-ink/10 px-4 py-3 text-sm text-ink/70">{r.passed}</td>
                          <td className="border border-ink/10 px-4 py-3 text-sm font-semibold text-ink">{r.passPercent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="rounded-xl border border-ink/10 bg-cream px-4 py-3 text-sm text-ink/70">
                Oxford Grammar School was established in {c["school.estd"]}. The first batch of students is yet to appear for the CBSE board examinations, so board results will be published here in due course.
              </p>
            )}
            <div className="mt-6 overflow-x-auto rounded-xl border border-ink/10">
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
            <div className="overflow-x-auto rounded-xl border border-ink/10">
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
            <div className="overflow-x-auto rounded-xl border border-ink/10">
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

          <p className="rounded-xl border border-gold/30 bg-gold-soft/40 p-4 text-xs text-ink/60">
            This disclosure is maintained as per the CBSE Affiliation Bylaws. For any clarification or to obtain
            certified copies of the listed documents, please contact the school office at {c["disc.phone"]} or {c["disc.email"]}.
          </p>
        </div>
      </section>
    </>
  );
}
