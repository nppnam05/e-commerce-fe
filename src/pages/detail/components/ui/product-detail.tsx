import { Button } from "@/components/ui/button";
import { CountSelector } from "@/components/ui/count-selector";
import { RowDivident } from "@/components/ui/row-divident";
import { Star } from "@/components/ui/stars";
import { useDetailPage } from "../../hooks/use-detail-page";
import { formatVND } from "@/utils/format";
import { ColorSelector } from "./color-selector";
import { SelectSize } from "./select-size";
import { StockDisplay } from "./stock-display";
export const ProductDetail = () => {
  const { data, state, actions } = useDetailPage();
  const {
    product,
    colors = [],
    sizes = [],
    selectedColorCode,
    selectedSizeName,
    selectedColorId,
    selectedSizeId,
    quantity,
    countOrdered,
  } = data || {};

  if (!product) {
    return (
      <div className="flex h-96 items-center justify-center text-lg font-medium">
        Đang tải thông tin sản phẩm...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 grid-rows-7 gap-2 lg:grid-cols-9 lg:grid-rows-3">
      <img
        src={product?.imageUrls[0]}
        className="col-start-1 row-start-4 aspect-square lg:col-start-1 lg:row-start-1"
      />
      <img
        src={product?.imageUrls[0]}
        className="col-start-2 row-start-4 aspect-square lg:col-start-1 lg:row-start-2"
      />
      <img
        src={product?.imageUrls[0]}
        className="col-start-3 row-start-4 aspect-square lg:col-start-1 lg:row-start-3"
      />
      <img
        src={product?.imageUrls[0]}
        className="col-span-3 col-start-1 row-span-3 row-start-1 aspect-square lg:col-start-2 lg:row-start-1"
      />
      <div className="col-start-1 -col-end-1 row-start-5 -row-end-1 flex flex-col justify-between gap-2 px-4 lg:col-start-5 lg:row-start-1">
        <h1 className="text-5xl font-bold uppercase">{product?.name}</h1>
        <div className="flex items-center gap-2">
          <Star count={4.5} widthSize={30} className="text-yellow-300" />
          <span className="text-xl font-medium text-zinc-500">|</span>
          <span className="text-xl font-medium">100 reviews</span>
        </div>
        <span className="text-4xl font-bold">
          {formatVND(product?.price ?? 0)}
        </span>
        <span className="text-lg">{product?.description}</span>
        <RowDivident />

        <ColorSelector
          colors={colors}
          selectedColorCode={selectedColorCode}
          onChange={(colorCode) => {
            const color = colors.find((c) => c.colorCode === colorCode);
            actions.selectColor(color?.id ?? null);
          }}
        />

        <RowDivident />

        <SelectSize
          sizes={sizes}
          selectedSize={selectedSizeName}
          onChange={(sizeName) => {
            const size = sizes.find((s) => s.name === sizeName);
            actions.selectSize(size?.id ?? null);
          }}
        />

        <StockDisplay quantity={quantity} />

        <RowDivident />
        <div className="flex flex-row gap-4">
          <CountSelector
            value={countOrdered}
            onChanged={actions.setCountOrdered}
          />
          <Button
            variant="superBlack"
            className="w-full"
            onClick={() => actions.addToCart(countOrdered)}
            disabled={
              state.isAddingToCart ||
              !selectedColorId ||
              !selectedSizeId ||
              !quantity ||
              quantity <= 0
            }
          >
            {state.isAddingToCart ? "Đang thêm..." : "Add To Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};
