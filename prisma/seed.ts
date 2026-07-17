import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { CONTENT_DEFAULTS } from "../src/lib/content";

const prisma = new PrismaClient();

async function main() {
  // --- Admin user ---
  const email = "admin@oxfordgrammar.edu.in";
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { name: "School Admin", email, passwordHash, role: "admin" },
  });

  // --- Editable content (settings) ---
  for (const [key, value] of Object.entries(CONTENT_DEFAULTS)) {
    await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }

  // --- Gallery ---
  const gallery = [
    ["Central Library", "Academics", "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80&auto=format&fit=crop"],
    ["Science Laboratories", "Academics", "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&q=80&auto=format&fit=crop"],
    ["Art & Design Studio", "Arts", "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80&auto=format&fit=crop"],
    ["Sports Arena", "Sports", "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80&auto=format&fit=crop"],
    ["Robotics & AI Lab", "Academics", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80&auto=format&fit=crop"],
    ["Annual Day Celebrations", "Events", "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80&auto=format&fit=crop"],
    ["Smart Classrooms", "Campus", "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80&auto=format&fit=crop"],
    ["Green Campus", "Campus", "https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80&auto=format&fit=crop"],
  ];
  await prisma.galleryImage.deleteMany();
  for (let i = 0; i < gallery.length; i++) {
    const [title, category, url] = gallery[i];
    await prisma.galleryImage.create({ data: { title, category, url, sort: i } });
  }

  // --- News ---
  const news = [
    {
      title: "Admissions Open for 2026–27",
      slug: "admissions-open-2026-27",
      category: "Announcement",
      excerpt: "Applications are now open for Nursery to Grade 10. Limited seats — book a campus visit today.",
      body: "We are delighted to announce that admissions for the academic year 2026–27 are now open across all grades from Nursery to Grade 10. Prospective parents are invited to book a guided campus visit and meet our faculty. Seats are limited and offered on a first-come basis subject to an interaction.",
      coverUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&q=80&auto=format&fit=crop",
    },
    {
      title: "Vidya Niketan Wins State Science Olympiad",
      slug: "state-science-olympiad-winners",
      category: "Achievement",
      excerpt: "Our students swept the top three positions at the State Science Olympiad 2025.",
      body: "A proud moment for the Vidya Niketan family — our young scientists secured the top three positions at the State Science Olympiad 2025, competing against more than 200 schools. Congratulations to our students and mentors for this outstanding achievement.",
      coverUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1000&q=80&auto=format&fit=crop",
    },
    {
      title: "Annual Sports Meet 2025",
      slug: "annual-sports-meet-2025",
      category: "Event",
      excerpt: "Three days of athletics, team spirit and record-breaking performances on the field.",
      body: "Our Annual Sports Meet brought the whole campus alive with three days of athletics, relays and inter-house championships. Thank you to all the parents who cheered from the stands and to our PE department for a flawlessly organised event.",
      coverUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1000&q=80&auto=format&fit=crop",
    },
  ];
  await prisma.news.deleteMany();
  for (const n of news) await prisma.news.create({ data: n });

  // --- Board results (last 3 years) ---
  await prisma.boardResult.deleteMany();
  const results = [
    { year: "2024-25", classLevel: "X", appeared: 218, passed: 218, passPercent: 100, topperName: "Ananya Reddy", topperScore: "98.6%", sort: 0 },
    { year: "2023-24", classLevel: "X", appeared: 205, passed: 203, passPercent: 99.0, topperName: "Rohan Verma", topperScore: "98.2%", sort: 1 },
    { year: "2022-23", classLevel: "X", appeared: 196, passed: 192, passPercent: 97.9, topperName: "Sahithi Rao", topperScore: "97.8%", sort: 2 },
  ];
  for (const r of results) await prisma.boardResult.create({ data: r });

  // --- Faculty ---
  await prisma.faculty.deleteMany();
  const faculty = [
    ["Dr. Lakshmi Prasad", "Principal", "M.Sc., M.Ed., Ph.D.", "Administration", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop"],
    ["Mr. Suresh Kumar", "Vice Principal", "M.A., B.Ed.", "English", "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop"],
    ["Mrs. Padma Nair", "Head of Science", "M.Sc., B.Ed.", "Physics", "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80&auto=format&fit=crop"],
    ["Mr. Arjun Menon", "Senior Teacher", "M.Sc., B.Ed.", "Mathematics", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop"],
    ["Mrs. Sneha Iyer", "Coordinator — Primary", "M.A., B.Ed.", "Primary", "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80&auto=format&fit=crop"],
    ["Mr. David Thomas", "Sports Director", "M.P.Ed.", "Physical Education", "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80&auto=format&fit=crop"],
  ];
  for (let i = 0; i < faculty.length; i++) {
    const [name, designation, qualification, subject, photoUrl] = faculty[i];
    await prisma.faculty.create({ data: { name, designation, qualification, subject, photoUrl, sort: i } });
  }

  // --- CBSE Disclosure documents ---
  await prisma.disclosureDoc.deleteMany();
  const docs = [
    "Copy of Affiliation / Upgradation Letter and recent extension of affiliation, if any",
    "Copy of societal/trust/company registration / renewal certificate, as applicable",
    "Copy of No Objection Certificate (NOC) issued, if applicable, by the State Govt./UT",
    "Copy of recognition certificate under RTE Act, 2009",
    "Copy of valid Building Safety Certificate as per the national building code",
    "Copy of valid Fire Safety Certificate issued by the competent authority",
    "Copy of the DEO certificate submitted by the school for affiliation/upgradation/extension",
    "Copies of valid Water, Health and Sanitation certificates",
  ];
  for (let i = 0; i < docs.length; i++) {
    await prisma.disclosureDoc.create({ data: { label: docs[i], sort: i, note: "Available on request at the school office" } });
  }

  // --- Sample enquiries ---
  await prisma.enquiry.deleteMany();
  await prisma.enquiry.create({
    data: { name: "Ramya Krishnan", phone: "+91 98480 11111", email: "ramya@example.com", grade: "Grade 1–5", message: "Interested in admission for my daughter to Grade 3." },
  });

  console.log("✓ Seed complete. Login: admin@oxfordgrammar.edu.in / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
