import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "id";

  return (
    <>
      <Header />
      <main id="home" className="scroll-mt-16">
        <Hero />
        <Services />
        <Portfolio locale={locale} />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
