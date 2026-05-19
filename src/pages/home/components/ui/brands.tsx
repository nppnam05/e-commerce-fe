import LogoGucci from "@/assets/svgs/gucci-logo.svg?react";
import LogoCalvinKlein from "@/assets/svgs/calvin-klein-logo.svg?react";
import LogoPrada from "@/assets/svgs/prada-logo.svg?react";
import LogoVersac from "@/assets/svgs/versace-logo.svg?react";
import LogoZara from "@/assets/svgs/zara-logo.svg?react";

export function Brands() {
  const height = 40;

  return (
    <div className="bg-black flex justify-around flex-row py-4">
      <LogoGucci height={height} className="inline" />
      <LogoCalvinKlein height={height} className="inline" />
      <LogoPrada height={height} className="inline" />
      <LogoVersac height={height} className="inline" />
      <LogoZara height={height} className="inline" />
    </div>
  );
}
