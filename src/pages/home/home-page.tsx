import { Brands } from "./components/ui/brands";
import { HeroSection } from "./components/ui/hero-section";
import Testimonals from "./components/ui/testimonials-section";
import { HomeProvider } from "./components/context/home-context";
import ReviewProductSection from "./components/ui/preview-product-section";

export function HomePage() {
  return (
    <HomeProvider>
      <HeroSection />
      <Brands />
      <ReviewProductSection className="mx-18"></ReviewProductSection>
      <Testimonals />
    </HomeProvider>
  );
}
