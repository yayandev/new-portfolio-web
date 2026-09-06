import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { PORTFOLIO_API, type PortfolioItem } from "@/lib/constants";
import { getDictionary, t, type Locale } from "@/lib/i18n";

async function loadPortfolio(): Promise<PortfolioItem[] | null> {
  try {
    const res = await fetch(PORTFOLIO_API, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.status === "success" && Array.isArray(json.data)) {
      return json.data as PortfolioItem[];
    }
    return null;
  } catch (error) {
    console.error("Portfolio fetch failed:", error);
    return null;
  }
}

export async function Portfolio({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const items = await loadPortfolio();

  return (
    <section id="projects" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow={t(dict, "projects.eyebrow")}
          title={t(dict, "projects.title")}
          subtitle={t(dict, "projects.subtitle")}
        />
        <PortfolioGrid items={items} />
      </div>
    </section>
  );
}
