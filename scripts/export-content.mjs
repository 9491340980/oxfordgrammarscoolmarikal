// Dumps the current database into a single content.json that the static
// site reads at build time. Run with: node scripts/export-content.mjs
import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

const [settingsRows, gallery, news, results, faculty, disclosureDocs] = await Promise.all([
  prisma.setting.findMany(),
  prisma.galleryImage.findMany({ orderBy: { sort: "asc" } }),
  prisma.news.findMany({ orderBy: { date: "desc" } }),
  prisma.boardResult.findMany({ orderBy: [{ classLevel: "asc" }, { sort: "asc" }] }),
  prisma.faculty.findMany({ orderBy: { sort: "asc" } }),
  prisma.disclosureDoc.findMany({ orderBy: { sort: "asc" } }),
]);

const settings = {};
for (const s of settingsRows) settings[s.key] = s.value;

const content = {
  settings,
  gallery: gallery.map((g) => ({ id: g.id, title: g.title, category: g.category, url: g.url, sort: g.sort })),
  news: news.map((n) => ({
    id: n.id, title: n.title, slug: n.slug, excerpt: n.excerpt, body: n.body,
    coverUrl: n.coverUrl, category: n.category, published: n.published,
    date: n.date.toISOString(),
  })),
  results: results.map((r) => ({
    id: r.id, year: r.year, classLevel: r.classLevel, appeared: r.appeared,
    passed: r.passed, passPercent: r.passPercent, topperName: r.topperName,
    topperScore: r.topperScore, sort: r.sort,
  })),
  faculty: faculty.map((f) => ({
    name: f.name, designation: f.designation, qualification: f.qualification,
    subject: f.subject, photoUrl: f.photoUrl, sort: f.sort,
  })),
  disclosureDocs: disclosureDocs.map((d) => ({ label: d.label, fileUrl: d.fileUrl, note: d.note, sort: d.sort })),
};

const out = path.join(process.cwd(), "content.json");
writeFileSync(out, JSON.stringify(content, null, 2));
console.log("✓ Wrote", out);
await prisma.$disconnect();
