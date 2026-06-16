import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { Portfolio } from "@/components/sections/portfolio";
import { WhyUs } from "@/components/sections/why-us";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Capabilities />
        <Portfolio />
        <WhyUs />
      </main>
      <Footer />
    </>
  );
}
