import { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import type { ProductChildren } from "@/types/product";
import { useGetAllColorsQuery } from "@/store/api/api-color";
import { useGetAllSizesQuery } from "@/store/api/api-size";
import { useUpdateProductChildrenMutation } from "@/store/api/api-product-children";

interface ProductRowProps {
  product: ProductChildren;
}

const ColorDot = ({ color }: { color: string }) => (
  <div
    className="h-5 w-5 rounded-full border border-gray-200 shadow-sm"
    style={{ backgroundColor: color }}
  />
);

export const ProductChildrenRow = ({ product }: ProductRowProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const [editSize, setEditSize] = useState(product.size);
  const [editColorCode, setEditColorCode] = useState(product.colorCode);

  const { data: colors } = useGetAllColorsQuery();
  const { data: sizes } = useGetAllSizesQuery();
  const [updateProductChildren] = useUpdateProductChildrenMutation();

  const handleSave = () => {
    const sizeId = sizes?.find((s) => s.name === editSize)?.id;
    const colorId = colors?.find((c) => c.colorCode === editColorCode)?.id;

    if (sizeId == undefined || colorId == undefined) {
      console.error("Size or Color not found");
      return;
    }

    updateProductChildren({
      id: product.id,
      sizeId: sizeId,
      colorId: colorId,
    });
    setIsEdit(false);
  };

  const handleCancel = () => {
    setEditSize(product.size);
    setEditColorCode(product.colorCode);
    setIsEdit(false);
  };

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="h-14 w-14 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
      <td className="px-6 py-4 text-gray-600">{product.category}</td>
      <td className="px-6 py-4 font-semibold text-gray-900">
        ${product.price.toFixed(2)}
      </td>
      <td className="px-6 py-4 font-medium text-gray-700">
        {product.quantity}
      </td>
      <td className="px-6 py-4 font-medium text-gray-700">
        {isEdit ? (
          <select
            value={editSize}
            onChange={(e) => setEditSize(e.target.value)}
            className="w-24 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm outline-none focus:border-blue-500"
          >
            {sizes?.map((s: any) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        ) : (
          product.size
        )}
      </td>

      <td className="px-6 py-4">
        {isEdit ? (
          <div className="flex items-center gap-2">
            <select
              value={editColorCode}
              onChange={(e) => setEditColorCode(e.target.value)}
              className="w-32 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm outline-none focus:border-blue-500"
            >
              {colors?.map((c: any) => (
                <option key={c.id} value={c.colorCode}>
                  {c.name}
                </option>
              ))}
            </select>

            <ColorDot color={editColorCode} />
          </div>
        ) : (
          <div className="flex gap-2">
            <ColorDot color={product.colorCode} />
          </div>
        )}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          {isEdit ? (
            <>
              <button
                onClick={handleSave}
                className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
              >
                <Check size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
            >
              <Edit2 size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
