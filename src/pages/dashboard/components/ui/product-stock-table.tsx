import type { ProductStock } from "@/types/product";
import { Edit2, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: ProductStock[];
  onEdit: (product: ProductStock) => void;
  onDelete: (id: number) => void;
}

const ColorDot = ({ color }: { color: string }) => (
  <div
    className="h-5 w-5 rounded-full border border-gray-200 shadow-sm"
    style={{ backgroundColor: color }}
  />
);

export const ProductTable = ({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="w-20 px-6 py-5 text-left text-sm font-medium text-gray-500">
                Image
              </th>
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
                Product Name
              </th>
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
                Category
              </th>
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
                Price
              </th>
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
                Piece
              </th>
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
                Available Color
              </th>
              <th className="w-28 px-6 py-5 text-center text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="h-14 w-14 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>

                <td className="px-6 py-4 text-gray-600">{product.category}</td>

                <td className="px-6 py-4 font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </td>

                <td className="px-6 py-4 font-medium text-gray-700">
                  {product.stock}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <ColorDot key={index} color={color} />
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          Không có sản phẩm nào
        </div>
      )}
    </div>
  );
};
