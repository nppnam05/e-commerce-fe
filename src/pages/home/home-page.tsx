import { type ItemType } from "@/components/ui/item";
import { Brands } from "./components/ui/brands";
import { HeroSection } from "./components/ui/hero-section";
import { HomeItemsSection } from "./components/ui/home-items-section";
import { RowDivident } from "@/components/ui/row-divident";
import Testimonals from "./components/ui/testimonials-section";
import HomeCategorySection from "./components/ui/home-category-section";

const fakeItem: ItemType = {
  image:
    "https://media.canva.com/v2/mockup-template-rasterize-by-design-template/color0:f3f5f8/cropsize:B/designtemplateid:EAE8ylqP0LM/mockuptemplateid:FqXFzEXX7/size:L/usetransparentbgpreview:true?csig=AAAAAAAAAAAAAAAAAAAAAIvruE5wqXnbq48n6vc-yIRm8Z-divpuXBxnnBbmguZq&exp=1778944800&osig=AAAAAAAAAAAAAAAAAAAAALwMQtrNKZC9g_Zsw_RnLf0KP5ia-H9zCkKPq5ULn5NW&seoslug=ch%E1%BB%AF-in-ngh%E1%BB%87-thu%E1%BA%ADt-gia-%C4%91%C3%ACnh-%26-h%E1%BB%8Dp-m%E1%BA%B7t-nh%C3%B3m-%C3%A1o-thun&signer=marketplace-rpc",
  name: "ao thun",
  price: 10000,
  stars: 3.2,
};

export function HomePage() {
  const items = Array.from(Array(4), () => fakeItem);

  return (
    <>
      <HeroSection />
      <Brands />
      <div className="mx-18">
        <HomeItemsSection items={items} name="Top Selling" />
        <RowDivident />
        <HomeItemsSection items={items} name="Top Selling" />
        <HomeCategorySection />
      </div>
      <Testimonals />
    </>
  );
}
