import { type RootState } from "@/store";
import { useCreateCartMutation } from "@/store/api/api-cart";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/store/api/api-product";
import { useGetProductChildrenQuery } from "@/store/api/api-product-children";
import type { Product, ProductDetail } from "@/types/product";
import type { ProductChildren } from "@/types/product-children";
import type { ValueChanged } from "@/types/value-change";
import type { VoidCallBack } from "@/types/void-call-back";
import { getErrorMessage } from "@/utils/error-check-type";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

type DetailProviderValue = {
  data: {
    product: ProductDetail | null;
    productChildren: ProductChildren[];
    relateProducts: Product[];
  };
  actions: {
    setSelectedColor: ValueChanged<string | null>;
    setSelectedSize: ValueChanged<string | null>;
    createCart: VoidCallBack;
    setCountOrdered: ValueChanged<number>;
  };
  state: {
    countOrdered: number;
    maxOrdered: number;
    allColors: string[];
    allSizes: string[];
    selectedColor: string | null;
    selectedSize: string | null;
    selectableColors: string[];
    selectableSizes: string[];
    productDetail: {
      isLoading: boolean;
      isError: boolean;
      errorMessage: string | null;
    };
    relatedProduct: {
      isLoading: boolean;
      isFetching: boolean;
      isError: boolean;
      errorMessage: string | null;
    };
    productChildren: {
      isLoading: boolean;
      isFetching: boolean;
      isError: boolean;
      errorMessage: string | null;
    };
  };
  mutation: {
    createCart: {
      isLoading: boolean;
      isSuccess: boolean;
      errorMessage: string | null;
    };
  };
};

const EMPTY_ARRAY = [];

function getSelectedProductChildren({
  color,
  size,
  productChildren,
}: {
  color: string | null;
  size: string | null;
  productChildren: ProductChildren[];
}): ProductChildren | null {
  if (color === null) return null;
  if (size === null) return null;

  return (
    productChildren.find(
      (productChild) =>
        productChild.colorCode === color && productChild.size === size,
    ) ?? null
  );
}

function getColorFromSelectedSize({
  size,
  productChildren,
}: {
  size: string | null;
  productChildren: ProductChildren[];
}): string[] {
  if (size === null) {
    const colors = productChildren.map(
      (productChild) => productChild.colorCode,
    );
    const setColors = new Set(colors);
    return [...setColors];
  }
  const colors = productChildren
    .filter((productChild) => productChild.size === size)
    .map((productChild) => productChild.colorCode);
  const setColors = new Set(colors);
  return [...setColors];
}

function getSizeFromSelectedColor({
  color,
  productChildren,
}: {
  color: string | null;
  productChildren: ProductChildren[];
}): string[] {
  if (color === null) {
    const sizes = productChildren.map((productChild) => productChild.size);
    const setSizes = new Set(sizes);
    return [...setSizes];
  }
  const sizes = productChildren
    .filter((productChild) => productChild.colorCode === color)
    .map((productChild) => productChild.size);
  const setSizes = new Set(sizes);
  return [...setSizes];
}

export function useDetailController() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const customer = useSelector((store: RootState) => store.auth.user?.id);
  const [allColors, setAllColors] = useState<string[]>([]);
  const [allSizes, setAllSizes] = useState<string[]>([]);
  const [selectableColors, setSelectableColors] = useState<string[]>([]);
  const [selectableSizes, setSelectableSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const productId = parseInt(id ?? "0");
  const navigate = useNavigate();

  const {
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error: errorProduct,
    product,
  } = useGetProductByIdQuery(productId, {
    selectFromResult: (data) => ({
      product: data.data ?? null,
      ...data,
    }),
  });

  const {
    isLoading: isLoadingProductRelated,
    isFetching: isFetchingProductRelated,
    isError: isErrorProductRelated,
    error: errorProductRelated,
    relatedProducts,
  } = useGetAllProductsQuery(
    {},
    {
      selectFromResult: (data) => {
        return {
          relatedProducts: data.data?.data ?? EMPTY_ARRAY,
          ...data,
        };
      },
    },
  );

  const {
    isLoading: isLoadingProductChildren,
    isFetching: isFetchingProductChildren,
    isError: isErrorProductChildren,
    error: errorProductChildren,
    productChildren,
  } = useGetProductChildrenQuery(
    { productId: productId },
    {
      selectFromResult: (data) => ({
        productChildren: data.data?.data ?? EMPTY_ARRAY,
        isLoading: data.isLoading,
        isFetching: data.isFetching,
        isError: data.isError,
        error: data.error,
      }),
    },
  );

  useMemo(
    function () {
      console.log("rerender");
      console.log(productChildren);
      const colors = productChildren.map(
        (productChild) => productChild.colorCode,
      );
      const setColors = [...new Set(colors)];
      setSelectableColors(setColors);
      setAllColors(setColors);

      const sizes = productChildren.map((productChild) => productChild.size);
      const setSizes = [...new Set(sizes)];
      setSelectableSizes(setSizes);
      setAllSizes(setSizes);
    },
    [productChildren],
  );

  function handleSelectedSize(size: string | null) {
    if (size === selectedSize) {
      size = null;
    }

    setSelectedSize(size);
    const colors = getColorFromSelectedSize({
      size: size,
      productChildren: productChildren,
    });

    if (
      size !== null &&
      selectedColor !== null &&
      !colors.includes(selectedColor)
    ) {
      handleSelectedColor(null);
    }
    setSelectableColors(colors);
  }

  function handleSelectedColor(color: string | null) {
    if (color === selectedColor) {
      color = null;
    }
    setSelectedColor(color);
    const sizes = getSizeFromSelectedColor({
      color: color,
      productChildren: productChildren,
    });

    if (
      color !== null &&
      selectedSize !== null &&
      !sizes.includes(selectedSize)
    ) {
      handleSelectedSize(null);
    }
    setSelectableSizes(sizes);
  }

  const [
    createCart,
    {
      isLoading: isLoadingCreateCart,
      isSuccess: isSuccessCreateCart,
      error: errorCreateCart,
    },
  ] = useCreateCartMutation();

  const selectedProductChildren = useMemo(
    () =>
      getSelectedProductChildren({
        color: selectedColor,
        size: selectedSize,
        productChildren: productChildren,
      }),
    [selectedColor, selectedSize, productChildren],
  );

  function handleCreateCart() {
    if (selectedProductChildren === null) return;

    createCart({
      userId: parseInt(customer ?? "0"),
      productChildrenId: selectedProductChildren.id,
      quantity: count,
    });
  }

  useEffect(() => {
    if (isSuccessCreateCart) navigate("/cart");
  }, [isSuccessCreateCart]);

  const maxOrdered = useMemo(
    function () {
      return selectedProductChildren?.quantity ?? 1000;
    },
    [selectedProductChildren],
  );

  useMemo(() => {
    console.log(selectedProductChildren);
    console.log(maxOrdered);
  }, [maxOrdered, selectedProductChildren]);

  function handleSetCountOrder(count: number) {
    if (count > maxOrdered) return;

    setCount(count);
  }

  const value: DetailProviderValue = {
    data: {
      relateProducts: relatedProducts,
      productChildren: productChildren,
      product: product,
    },
    state: {
      countOrdered: count,
      allColors: allColors,
      allSizes: allSizes,
      selectableColors: selectableColors,
      selectableSizes: selectableSizes,
      maxOrdered: maxOrdered,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      productChildren: {
        isError: isErrorProductChildren,
        isLoading: isLoadingProductChildren,
        isFetching: isFetchingProductChildren,
        errorMessage: getErrorMessage(errorProductChildren),
      },
      relatedProduct: {
        isError: isErrorProductRelated,
        isLoading: isLoadingProductRelated,
        isFetching: isFetchingProductRelated,
        errorMessage: getErrorMessage(errorProductRelated),
      },
      productDetail: {
        isError: isErrorProduct,
        isLoading: isLoadingProduct,
        errorMessage: getErrorMessage(errorProduct),
      },
    },
    actions: {
      setCountOrdered: handleSetCountOrder,
      createCart: handleCreateCart,
      setSelectedColor: handleSelectedColor,
      setSelectedSize: handleSelectedSize,
    },
    mutation: {
      createCart: {
        isLoading: isLoadingCreateCart,
        isSuccess: isSuccessCreateCart,
        errorMessage: getErrorMessage(errorCreateCart),
      },
    },
  };

  return value;
}
