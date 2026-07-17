import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SiteContentProvider } from "@/lib/site-content";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteContentProvider>
      <SiteHeader />
      <main className="relative z-10 min-h-screen">{children}</main>
      <SiteFooter />
    </SiteContentProvider>
  );
}
