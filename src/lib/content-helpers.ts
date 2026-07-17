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

export interface Content {
  settings: Record<string, string>;
  gallery: GalleryImage[];
  news: NewsItem[];
  results: BoardResult[];
  faculty: FacultyMember[];
  disclosureDocs: DisclosureDoc[];
}

/** Everything a page needs, derived from a content object. */
export interface SiteData {
  content: Record<string, string>;
  gallery: GalleryImage[];
  news: NewsItem[];
  results: BoardResult[];
  faculty: FacultyMember[];
  disclosureDocs: DisclosureDoc[];
  newsBySlug: (slug: string) => NewsItem | undefined;
  resultsByClass: (cls: string) => BoardResult[];
}

export function selectSite(c: Content): SiteData {
  const content: Record<string, string> = { ...CONTENT_DEFAULTS };
  for (const [k, v] of Object.entries(c.settings || {})) if (v !== "") content[k] = v;

  const gallery = [...(c.gallery || [])].sort((a, b) => a.sort - b.sort);
  const news = [...(c.news || [])]
    .filter((n) => n.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const results = [...(c.results || [])].sort((a, b) =>
    a.classLevel === b.classLevel ? a.sort - b.sort : a.classLevel.localeCompare(b.classLevel)
  );
  const faculty = [...(c.faculty || [])].sort((a, b) => a.sort - b.sort);
  const disclosureDocs = [...(c.disclosureDocs || [])].sort((a, b) => a.sort - b.sort);

  return {
    content, gallery, news, results, faculty, disclosureDocs,
    newsBySlug: (slug) => news.find((n) => n.slug === slug),
    resultsByClass: (cls) => results.filter((r) => r.classLevel === cls),
  };
}
