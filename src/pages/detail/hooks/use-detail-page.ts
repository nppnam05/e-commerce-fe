import type { RootState } from "@/store";
import { useCreateCartMutation } from "@/store/api/api-cart";
import {
  useGetColorsWithStockByProductIdQuery,
} from "@/store/api/api-color";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/store/api/api-product";
import { useGetProductChildrenQuantityQuery } from "@/store/api/api-product-children";
import { useGetSizesWithStockByProductIdQuery } from "@/store/api/api-size";
import type { Color } from "@/types/color";
import type { Product, ProductDetail } from "@/types/product";
import type { Size } from "@/types/size";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export interface DetailPage {
  data: {
    colors: Color[];
    sizes: Size[];
    product: ProductDetail;
    relatedProducts: Product[];
    quantity: number | undefined;
    selectedColorId: number | null;
    selectedSizeId: number | null;
    selectedColorCode: string;
    selectedSizeName: string;
  };
  state: {
    isLoading: boolean;
    isFetching: boolean;
    isAddingToCart: boolean;
  };
  actions: {
    selectColor: (colorId: number | null) => void;
    selectSize: (sizeId: number | null) => void;
    addToCart: (quantity: number) => Promise<void>;
  };
}

export const useDetailPage = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const { id: productId } = useParams();
  const [createCart, { isLoading: isAddingToCart }] = useCreateCartMutation();
  const colors = useGetColorsWithStockByProductIdQuery(Number(productId));
  const sizes = useGetSizesWithStockByProductIdQuery(Number(productId));
  const getProductById = useGetProductByIdQuery(Number(productId));
  const getAllProducts = useGetAllProductsQuery({
    pageNumber: 1,
    pageSize: 10,
    keyword: undefined,
  });

  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [countOrdered, setCountOrdered] = useState<number>(1);

  useEffect(() => {
    setSelectedColorId(null);
    setSelectedSizeId(null);
  }, [productId]);

  useEffect(() => {
    if (colors.data && colors.data.length > 0 && selectedColorId === null) {
      setSelectedColorId(colors.data[0].id);
    }
  }, [colors.data, selectedColorId]);

  useEffect(() => {
    if (sizes.data && sizes.data.length > 0 && selectedSizeId === null) {
      setSelectedSizeId(sizes.data[0].id);
    }
  }, [sizes.data, selectedSizeId]);

  const result = useGetProductChildrenQuantityQuery(
    {
      productId: Number(productId),
      colorId: selectedColorId,
      sizeId: selectedSizeId,
    },
    {
      skip: selectedColorId === null || selectedSizeId === null,
    },
  );

  const data = {
    colors: colors.data ?? [],
    sizes: sizes.data ?? [],
    product: getProductById.data,
    relatedProducts: getAllProducts.data,
    quantity: result.error ? 0 : (result.data?.quantity ?? 0),
    productChildrenId: result.error ? undefined : result.data?.id,
    selectedColorId,
    selectedSizeId,
    selectedColorCode:
      colors.data?.find((c) => c.id === selectedColorId)?.colorCode ?? "",
    selectedSizeName:
      sizes.data?.find((s) => s.id === selectedSizeId)?.name ?? "",
    countOrdered,
  };

  const state = {
    isLoading:
      colors.isLoading ||
      sizes.isLoading ||
      getProductById.isLoading ||
      getAllProducts.isLoading,
    isFetching:
      colors.isFetching ||
      sizes.isFetching ||
      getProductById.isFetching ||
      getAllProducts.isFetching ||
      result.isFetching,
    isAddingToCart,
  };

  const actions = {
    selectColor: (colorId: number | null) => setSelectedColorId(colorId),
    selectSize: (sizeId: number | null) => setSelectedSizeId(sizeId),
    setCountOrdered: (quantity: number) => setCountOrdered(quantity),
    addToCart: async (quantity: number) => {
      if (!userId) {
        alert("Bạn cần đăng nhập để thêm vào giỏ hàng.");
        return;
      }
      if (!selectedColorId || !selectedSizeId) {
        alert("Vui lòng chọn màu sắc và kích cỡ.");
        return;
      }
      if (!data.quantity || data.quantity <= 0) {
        alert("Sản phẩm này hiện đã hết hàng.");
        return;
      }
      await createCart({
        userId: Number(userId),
        productChildrenId: data?.productChildrenId,
        quantity,
      });
    },
  };

  return {
    data,
    state,
    actions,
  };
};
