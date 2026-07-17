// Build-time content source for the static site.
// All public pages read from here (which reads content.json) — no database,
// no server, so the site exports to plain HTML and hosts for free.
import raw from "../../content.json";
import { CONTENT_DEFAULTS } from "@/lib/content";

export interface GalleryImage { id: string; title: string; category: string; url: string; sort: number }
export interface NewsItem {
  id: string; title: string; slug: string; excerpt: string; body: string;
  coverUrl: string | null; category: string; published: boolean; date: string;
}
export interface BoardResult {
  id: string; year: string; classLevel: string; appeared: number; passed: number;
  passPercent: number; topperName: string | null; topperScore: string | null; sort: number;
}
export interface FacultyMember {
  name: string; designation: string; qualification: string; subject: string;
  photoUrl: string | null; sort: number;
}
export interface DisclosureDoc { label: string; fileUrl: string | null; note: string; sort: number }

interface Content {
  settings: Record<string, string>;
  gallery: GalleryImage[];
  news: NewsItem[];
  results: BoardResult[];
  faculty: FacultyMember[];
  disclosureDocs: DisclosureDoc[];
}

const content = raw as Content;

/** Settings merged over defaults (so a missing key never renders blank). */
export function getContent(): Record<string, string> {
  const map: Record<string, string> = { ...CONTENT_DEFAULTS };
  for (const [k, v] of Object.entries(content.settings || {})) {
    if (v !== "") map[k] = v;
  }
  return map;
}

export const getGallery = (): GalleryImage[] =>
  [...content.gallery].sort((a, b) => a.sort - b.sort);

export const getNews = (): NewsItem[] =>
  content.news
    .filter((n) => n.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const getNewsSlugs = (): string[] => content.news.filter((n) => n.published).map((n) => n.slug);

export const getNewsBySlug = (slug: string): NewsItem | undefined =>
  content.news.find((n) => n.slug === slug && n.published);

export const getResults = (): BoardResult[] =>
  [...content.results].sort((a, b) =>
    a.classLevel === b.classLevel ? a.sort - b.sort : a.classLevel.localeCompare(b.classLevel)
  );

export const getResultsByClass = (cls: string): BoardResult[] =>
  getResults().filter((r) => r.classLevel === cls);

export const getFaculty = (): FacultyMember[] =>
  [...content.faculty].sort((a, b) => a.sort - b.sort);

export const getDisclosureDocs = (): DisclosureDoc[] =>
  [...content.disclosureDocs].sort((a, b) => a.sort - b.sort);
