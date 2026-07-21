/**
 * Editable site content. These defaults define the known keys, their labels
 * (for the Super-Admin studio form), and seed values. Grouped into tidy
 * sections. The live values live in content.json (see src/lib/data.ts).
 */
export type FieldType = "text" | "textarea";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  group: string;
  hint?: string;
}

export const CONTENT_FIELDS: FieldDef[] = [
  // Identity
  { key: "school.name", label: "School name", type: "text", group: "Identity" },
  { key: "school.estd", label: "Established (year)", type: "text", group: "Identity" },
  { key: "school.tagline", label: "Tagline", type: "text", group: "Identity" },
  { key: "school.affiliation", label: "Affiliation line", type: "text", group: "Identity", hint: "e.g. CBSE Affiliated · Aff. No. 130xxxx" },

  // Hero
  { key: "hero.kicker", label: "Hero kicker", type: "text", group: "Homepage hero" },
  { key: "hero.title", label: "Hero title", type: "text", group: "Homepage hero" },
  { key: "hero.titleAccent", label: "Hero title — accent word", type: "text", group: "Homepage hero" },
  { key: "hero.subtitle", label: "Hero subtitle", type: "textarea", group: "Homepage hero" },
  { key: "hero.image", label: "Hero image URL", type: "text", group: "Homepage hero" },

  // Stats (shown as 4 counters)
  { key: "stats.s1.value", label: "Stat 1 value", type: "text", group: "Stats" },
  { key: "stats.s1.label", label: "Stat 1 label", type: "text", group: "Stats" },
  { key: "stats.s2.value", label: "Stat 2 value", type: "text", group: "Stats" },
  { key: "stats.s2.label", label: "Stat 2 label", type: "text", group: "Stats" },
  { key: "stats.s3.value", label: "Stat 3 value", type: "text", group: "Stats" },
  { key: "stats.s3.label", label: "Stat 3 label", type: "text", group: "Stats" },
  { key: "stats.s4.value", label: "Stat 4 value", type: "text", group: "Stats" },
  { key: "stats.s4.label", label: "Stat 4 label", type: "text", group: "Stats" },

  // About
  { key: "about.eyebrow", label: "About eyebrow", type: "text", group: "About" },
  { key: "about.title", label: "About title", type: "text", group: "About" },
  { key: "about.body1", label: "About paragraph 1", type: "textarea", group: "About" },
  { key: "about.body2", label: "About paragraph 2", type: "textarea", group: "About" },
  { key: "about.image", label: "About image URL", type: "text", group: "About" },

  // Principal's message
  { key: "principal.name", label: "Principal name", type: "text", group: "Principal" },
  { key: "principal.message", label: "Principal message", type: "textarea", group: "Principal" },
  { key: "principal.photo", label: "Principal photo URL", type: "text", group: "Principal" },

  // Contact
  { key: "contact.address", label: "Address", type: "textarea", group: "Contact" },
  { key: "contact.phone", label: "Phone", type: "text", group: "Contact" },
  { key: "contact.email", label: "Email", type: "text", group: "Contact" },
  { key: "contact.mapUrl", label: "Google Maps embed URL", type: "text", group: "Contact" },
  { key: "social.instagram", label: "Instagram URL", type: "text", group: "Contact" },
  { key: "social.facebook", label: "Facebook URL", type: "text", group: "Contact" },
  { key: "social.youtube", label: "YouTube URL", type: "text", group: "Contact" },
  { key: "forms.accessKey", label: "Web3Forms access key", type: "text", group: "Contact", hint: "Free key from web3forms.com to receive enquiry emails. Leave blank to use a mailto link instead." },
  { key: "media.imgbbKey", label: "ImgBB upload key", type: "text", group: "Contact", hint: "Optional free key from imgbb.com → enables photo upload in the admin. Without it, paste image URLs." },

  // CBSE Mandatory Public Disclosure — General Information
  { key: "disc.affiliationNo", label: "Affiliation number", type: "text", group: "CBSE: General info" },
  { key: "disc.schoolCode", label: "School code", type: "text", group: "CBSE: General info" },
  { key: "disc.affiliationValid", label: "Affiliation valid till", type: "text", group: "CBSE: General info" },
  { key: "disc.trustName", label: "Name of Trust/Society", type: "text", group: "CBSE: General info" },
  { key: "disc.principalName", label: "Principal name", type: "text", group: "CBSE: General info" },
  { key: "disc.principalQual", label: "Principal qualification", type: "text", group: "CBSE: General info" },
  { key: "disc.email", label: "Official email", type: "text", group: "CBSE: General info" },
  { key: "disc.phone", label: "Official phone", type: "text", group: "CBSE: General info" },
  { key: "disc.address", label: "Complete address", type: "textarea", group: "CBSE: General info" },

  // CBSE — Infrastructure
  { key: "disc.totalArea", label: "Total campus area (sq. mtr.)", type: "text", group: "CBSE: Infrastructure" },
  { key: "disc.builtArea", label: "Built-up area (sq. mtr.)", type: "text", group: "CBSE: Infrastructure" },
  { key: "disc.playground", label: "Area of playground (sq. mtr.)", type: "text", group: "CBSE: Infrastructure" },
  { key: "disc.classrooms", label: "No. of classrooms", type: "text", group: "CBSE: Infrastructure" },
  { key: "disc.labs", label: "No. of laboratories", type: "text", group: "CBSE: Infrastructure" },
  { key: "disc.libraryBooks", label: "Library books", type: "text", group: "CBSE: Infrastructure" },
  { key: "disc.internet", label: "Internet facility", type: "text", group: "CBSE: Infrastructure" },

  // CBSE — Staff
  { key: "disc.totalTeachers", label: "Total teachers", type: "text", group: "CBSE: Staff" },
  { key: "disc.pgt", label: "PGT", type: "text", group: "CBSE: Staff" },
  { key: "disc.tgt", label: "TGT", type: "text", group: "CBSE: Staff" },
  { key: "disc.prt", label: "PRT", type: "text", group: "CBSE: Staff" },
  { key: "disc.pet", label: "PET (Physical Education Teacher)", type: "text", group: "CBSE: Staff" },
  { key: "disc.specialEducator", label: "Special Educator (details)", type: "text", group: "CBSE: Staff" },
  { key: "disc.counsellor", label: "Counsellor / Wellness Teacher (details)", type: "text", group: "CBSE: Staff" },
  { key: "disc.ratio", label: "Teacher–student ratio", type: "text", group: "CBSE: Staff" },

  // CBSE — Infrastructure (extras)
  { key: "disc.girlsToilets", label: "No. of Girls toilets", type: "text", group: "CBSE: Infrastructure" },
  { key: "disc.boysToilets", label: "No. of Boys toilets", type: "text", group: "CBSE: Infrastructure" },
  { key: "disc.inspectionVideo", label: "YouTube video of school inspection (URL)", type: "text", group: "CBSE: Infrastructure" },

  // CBSE — Academic documents (link/PDF URLs)
  { key: "disc.feeStructureUrl", label: "Fee structure (PDF URL)", type: "text", group: "CBSE: Academic documents", hint: "Leave blank to show 'Available at school office'." },
  { key: "disc.academicCalendarUrl", label: "Annual Academic Calendar (PDF URL)", type: "text", group: "CBSE: Academic documents" },
  { key: "disc.smcUrl", label: "School Management Committee list (PDF URL)", type: "text", group: "CBSE: Academic documents" },
  { key: "disc.ptaUrl", label: "PTA members list (PDF URL)", type: "text", group: "CBSE: Academic documents" },
];

export const CONTENT_DEFAULTS: Record<string, string> = {
  "school.name": "Oxford Grammar School",
  "school.estd": "2024",
  "school.tagline": "Strive for Excellence, Shine with Confidence",
  "school.affiliation": "CBSE Affiliated · Marikal, Narayanpet",

  "hero.kicker": "CBSE Affiliated · Marikal, Telangana",
  "hero.title": "Raise minds that change the",
  "hero.titleAccent": "world.",
  "hero.subtitle":
    "A bold, joyful CBSE school where children think for themselves, create fearlessly, and grow into the people the world needs.",
  "hero.image":
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1100&q=80&auto=format&fit=crop",

  "stats.s1.value": "2024", "stats.s1.label": "Established",
  "stats.s2.value": "CBSE", "stats.s2.label": "Curriculum",
  "stats.s3.value": "Co-Ed", "stats.s3.label": "Day School",
  "stats.s4.value": "Marikal", "stats.s4.label": "Telangana",

  "about.eyebrow": "Our Belief",
  "about.title": "We don't fill buckets. We light fires.",
  "about.body1":
    "Founded in 2024, Oxford Grammar School is a CBSE school in Marikal, Narayanpet — built on one belief: every child is extraordinary when someone truly believes in them.",
  "about.body2":
    "Our classrooms blend deep academics with art, sport, and real-world projects — so students leave us curious, kind, and unstoppable.",
  "about.image":
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80&auto=format&fit=crop",

  "principal.name": "Dr. Lakshmi Prasad",
  "principal.message":
    "At Oxford Grammar School we believe education is not preparation for life — it is life itself. Every member of our faculty is committed to nurturing confident, compassionate and capable young people who will lead with integrity.",
  "principal.photo":
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop",

  "contact.address": "Oxford Grammar School, Marikal, Narayanpet District, Telangana 509210",
  "contact.phone": "+91 90000 00001",
  "contact.email": "hello@oxfordgrammar.edu.in",
  "contact.mapUrl": "https://www.google.com/maps?q=Marikal,Telangana&output=embed",
  "social.instagram": "#",
  "social.facebook": "#",
  "social.youtube": "#",

  "disc.affiliationNo": "",
  "disc.schoolCode": "",
  "disc.affiliationValid": "",
  "disc.trustName": "",
  "disc.principalName": "Suvarna Raju N",
  "disc.principalQual": "M.A., B.Ed.",
  "disc.email": "oxfordgrammarschoolcbsemarikal@gmail.com",
  "disc.phone": "+91 94905 02838",
  "disc.address": "Raichur Road, Marikal (Village & Mandal), Narayanpet District, Telangana 509351",

  "disc.totalArea": "",
  "disc.builtArea": "",
  "disc.playground": "",
  "disc.classrooms": "",
  "disc.labs": "",
  "disc.libraryBooks": "",
  "disc.internet": "",

  "disc.totalTeachers": "21",
  "disc.pgt": "6",
  "disc.tgt": "6",
  "disc.prt": "8",
  "disc.pet": "",
  "disc.specialEducator": "",
  "disc.counsellor": "",
  "disc.ratio": "",
  "disc.girlsToilets": "",
  "disc.boysToilets": "",
  "disc.inspectionVideo": "",
  "disc.feeStructureUrl": "/fee-structure-2026-27.pdf",
  "disc.academicCalendarUrl": "",
  "disc.smcUrl": "",
  "disc.ptaUrl": "",
};
