import { Button } from "@/components/ui/button";
import backgroundImage from "../../../../assets/images/background-home-page.png";

export const HeroSection = () => {
  return (
    <section className="bg-bg grid lg:grid-cols-2 grid-cols-1 px-18 min-h-150">
      <div className="my-20">
        <h1 className="text-7xl uppercase font-extrabold mb-8">
          find clothes that matches your style
        </h1>
        <div className="text-neutral-500 text-sm mb-8">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style
        </div>
        <Button variant="secondary" className="mb-12">
          Shop now
        </Button>
        <ul className="flex justify-between items-stretch split">
          <li>
            <div className="font-bold text-3xl text-neutral-950">200 +</div>
            <div className="text-sm text-neutral-500">International Brands</div>
          </li>
          <li>
            <div className="w-px h-full bg-neutral-300"></div>
          </li>
          <li>
            <div className="font-bold text-3xl text-neutral-950">2,000 +</div>
            <div className="text-sm text-neutral-500">
              High-Quality Products
            </div>
          </li>
          <li>
            <div className="w-px h-full bg-neutral-300"></div>
          </li>
          <li>
            <div className="font-bold text-3xl text-neutral-950">30,000 +</div>
            <div className="text-sm text-neutral-500">Happy Customer</div>
          </li>
        </ul>
      </div>
      <div className="overflow-hidden relative  h-200 lg:h-full">
        <img
          src={backgroundImage}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
