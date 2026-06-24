import {
  BreadcrumbNavigation,
  type BreadcrumbItem,
} from "@/components/ui/breadcrumb-navigation";
// import RatingAndReviewSection from "./components/ui/rating-review-section";
import { useDetailController } from "./components/hooks/use-detail-controller";
import { BadgeSelector } from "@/components/ui/badge-selector";
import { Button } from "@/components/ui/button";
import { ColorPallete, type ColorInput } from "@/components/ui/color-pallete";
import { CountSelector } from "@/components/ui/count-selector";
import { RowDivident } from "@/components/ui/row-divident";
import { Star } from "@/components/ui/stars";
import colors from "tailwindcss/colors";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/home" },
  { label: "Detail" },
];

function createColorInput(color: string): ColorInput {
  if (color === "#FFFFFF") {
    return {
      backgroundColor: color,
      checkColor: colors.black,
      outlineColor: colors.black,
    };
  }
  return {
    backgroundColor: color,
    checkColor: colors.white,
    outlineColor: color,
  };
}

export function DetailPage() {
  const { data, actions, state, mutation } = useDetailController();
  const colorsInput = state.allColors.map((color) => createColorInput(color));

  return (
    <div className="mx-8 lg:mx-16">
      <BreadcrumbNavigation breadcumbItems={breadcrumbItems} className="mb-4" />

      {/*product detail */}
      {state.productDetail.isLoading ? (
        <div></div>
      ) : (
        <div className="grid grid-cols-3 grid-rows-7 gap-2 lg:grid-cols-9 lg:grid-rows-3">
          <img
            src={data.product?.imageUrls[0]}
            className="col-start-1 row-start-4 aspect-square lg:col-start-1 lg:row-start-1"
          />
          <img
            src={data.product?.imageUrls[0]}
            className="col-start-2 row-start-4 aspect-square lg:col-start-1 lg:row-start-2"
          />
          <img
            src={data.product?.imageUrls[0]}
            className="col-start-3 row-start-4 aspect-square lg:col-start-1 lg:row-start-3"
          />
          <img
            src={data.product?.imageUrls[0]}
            className="col-span-3 col-start-1 row-span-3 row-start-1 aspect-square lg:col-start-2 lg:row-start-1"
          />
          <div className="col-start-1 -col-end-1 row-start-5 -row-end-1 flex flex-col justify-between gap-2 px-4 lg:col-start-5 lg:row-start-1">
            <h1 className="text-5xl font-bold uppercase">
              {data.product?.name}
            </h1>
            <Star count={4.5} widthSize={30} className="text-yellow-300" />
            <span className="text-4xl font-bold">${data.product?.price}</span>
            <span className="text-lg">{data.product?.description}</span>
            <RowDivident />
            <div>
              <div className="mb-2 text-2xl text-zinc-400">Select Colors</div>
              <ColorPallete
                notFadingColors={state.selectableColors}
                colors={colorsInput}
                valueChanged={actions.setSelectedColor}
                selectColor={state.selectedColor}
                className="flex flex-row flex-wrap gap-4"
                colorWidthHeight={32}
              />
            </div>
            <RowDivident />
            <div>
              <div className="mb-2 text-2xl text-zinc-400">Select Size</div>
              <BadgeSelector
                notFading={state.selectableSizes}
                value={state.selectedSize}
                texts={state.allSizes}
                defaultTextColor={colors.zinc[800]}
                defaultBackgroundColor={colors.zinc[100]}
                selectedTextColor="#FFFFFF"
                selectedBackgroundColor="#000000"
                fontSize={20}
                gap={8}
                onChanged={actions.setSelectedSize}
              />
            </div>
            <RowDivident />
            <div className="flex flex-row gap-4">
              <CountSelector
                value={state.countOrdered > state.maxOrdered ? state.maxOrdered : state.countOrdered}
                onChanged={actions.setCountOrdered}
              />
              <Button
                variant="superBlack"
                className="w-full"
                onClick={actions.createCart}
                isLoading={
                  mutation.createCart.isLoading ||
                  state.selectedColor === null ||
                  state.selectedSize === null
                }
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      )}

      {/*rating and review */}
      {/* <RatingAndReviewSection /> */}
    </div>
  );
}
