// Generates a clean, branded Fee Structure PDF → public/fee-structure-2026-27.pdf
import PDFDocument from "pdfkit";
import fs from "fs";

const NAVY = "#0a1f3c";
const NAVY2 = "#12325c";
const GOLD = "#e2a018";
const CREAM = "#fff4e2";
const ALT = "#faf7f0";
const LINE = "#dcdcdc";
const MUTE = "#666666";

const left = 50, right = 545;
const W = right - left;
// column boundaries: Class | Admission | Tuition | IIT
const colX = [50, 235, 340, 440, 545];
const heads = ["Class", "Admission Fee", "Tuition Fee", "IIT Foundation"];

const DATA = [
  { group: "Pre-Primary" },
  { c: "Nursery", a: "1,500", t: "22,000", iit: "—" },
  { c: "LKG", a: "1,500", t: "23,000", iit: "—" },
  { c: "UKG", a: "1,500", t: "24,000", iit: "—" },
  { group: "Primary" },
  { c: "Grade 1", a: "1,500", t: "25,000", iit: "—" },
  { c: "Grade 2", a: "1,500", t: "28,000", iit: "—" },
  { c: "Grade 3", a: "1,500", t: "31,000", iit: "—" },
  { c: "Grade 4", a: "1,500", t: "34,000", iit: "—" },
  { c: "Grade 5", a: "1,500", t: "37,000", iit: "—" },
  { group: "Middle School" },
  { c: "Grade 6", a: "1,500", t: "41,000", iit: "15,000" },
  { c: "Grade 7", a: "1,500", t: "45,000", iit: "15,000" },
  { c: "Grade 8", a: "1,500", t: "50,000", iit: "15,000" },
];

const doc = new PDFDocument({ size: "A4", margin: 50 });
doc.pipe(fs.createWriteStream("public/fee-structure-2026-27.pdf"));

// ---- Header ----
try { doc.image("public/logo.png", left, 42, { width: 62, height: 62 }); } catch { /* no logo */ }
doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(21).text("Oxford Grammar School", left + 74, 46);
doc.fillColor(GOLD).font("Helvetica-Bold").fontSize(9.5).text("CBSE  ·  MARIKAL, NARAYANPET  ·  TELANGANA", left + 74, 73);
doc.fillColor(MUTE).font("Helvetica").fontSize(9).text("Raichur Road, Marikal (V & M), Narayanpet District, Telangana 509351", left + 74, 88);
doc.fillColor(MUTE).fontSize(9).text("Phone: +91 94905 02838, +91 95533 40707", left + 74, 100);

// ---- Title band ----
let y = 128;
doc.rect(left, y, W, 30).fill(NAVY);
doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(14).text("FEE STRUCTURE   ·   2026 – 27", left, y + 8, { width: W, align: "center" });
y += 30;
doc.fillColor(MUTE).font("Helvetica-Oblique").fontSize(8).text("All amounts in Indian Rupees (Rs.)", left, y + 4, { width: W, align: "right" });
y += 18;

function cell(text, i, yy, { align = "left", color = NAVY, font = "Helvetica", size = 10 } = {}) {
  const x = colX[i], w = colX[i + 1] - colX[i];
  doc.fillColor(color).font(font).fontSize(size).text(String(text), x + 10, yy + 7, { width: w - 20, align });
}
function borders(yy, h) {
  doc.strokeColor(LINE).lineWidth(0.6);
  doc.moveTo(left, yy + h).lineTo(right, yy + h).stroke();
  colX.forEach((x) => doc.moveTo(x, yy).lineTo(x, yy + h).stroke());
}

// ---- Table header ----
const rh = 26;
doc.rect(left, y, W, rh).fill(NAVY2);
heads.forEach((h, i) => cell(h, i, y, { align: i === 0 ? "left" : "center", color: "#ffffff", font: "Helvetica-Bold", size: 10 }));
y += rh;

// ---- Rows ----
let alt = false;
for (const row of DATA) {
  if (row.group) {
    doc.rect(left, y, W, 22).fill(CREAM);
    doc.fillColor(GOLD).font("Helvetica-Bold").fontSize(9.5).text(row.group.toUpperCase(), left + 10, y + 6);
    doc.strokeColor(LINE).lineWidth(0.6).moveTo(left, y + 22).lineTo(right, y + 22).stroke();
    doc.moveTo(left, y).lineTo(left, y + 22).stroke();
    doc.moveTo(right, y).lineTo(right, y + 22).stroke();
    y += 22;
    alt = false;
    continue;
  }
  if (alt) doc.rect(left, y, W, rh).fill(ALT);
  cell(row.c, 0, y, { font: "Helvetica-Bold", color: NAVY });
  cell(row.a, 1, y, { align: "center", color: "#333" });
  cell(row.t, 2, y, { align: "center", color: "#333" });
  cell(row.iit, 3, y, { align: "center", color: row.iit === "—" ? "#999" : "#12832f", font: row.iit === "—" ? "Helvetica" : "Helvetica-Bold" });
  borders(y, rh);
  y += rh;
  alt = !alt;
}

// ---- Notes ----
y += 16;
doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(10).text("Notes", left, y);
y += 16;
const notes = [
  "Fees shown are for the academic year 2026-27 and are subject to revision by the school management.",
  "IIT Foundation applies to Grades 6 to 8 only.",
  "Admission fee is a one-time payment at the time of admission.",
  "For any clarification, please contact the school office.",
];
doc.font("Helvetica").fontSize(9).fillColor("#444");
for (const n of notes) { doc.text("•  " + n, left, y, { width: W }); y += 15; }

// ---- Footer ----
doc.strokeColor(LINE).lineWidth(0.6).moveTo(left, 762).lineTo(right, 762).stroke();
doc.fillColor(MUTE).font("Helvetica").fontSize(8)
  .text("Oxford Grammar School, Marikal  ·  www.oxfordgrammarschoolmarikal.in", left, 770, { width: W, align: "center" });

doc.end();
console.log("✓ Generated public/fee-structure-2026-27.pdf");
