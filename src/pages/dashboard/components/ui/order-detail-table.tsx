import type { ProductOrder } from "@/types/product";
import { formatVND } from "@/utils/format";

interface ProductTableProps {
  products: ProductOrder[];
}

const ColorDot = ({ color }: { color: string }) => (
  <div
    className="h-5 w-5 rounded-full border border-gray-200 shadow-sm"
    style={{ backgroundColor: color }}
  />
);

export const ProductOrderDetailTable = ({ products }: ProductTableProps) => {
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
                Quantity
              </th>
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
                Size
              </th>
              <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">
                Color
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
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/600x400?text=No+Image";
                      }}
                    />
                  </div>
                </td>

                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>

                <td className="px-6 py-4 text-gray-600">{product.category}</td>

                <td className="px-6 py-4 font-semibold text-gray-900">
                  ${formatVND(product.price)}
                </td>

                <td className="px-6 py-4 font-medium text-gray-700">
                  {product.quantity}
                </td>

                <td className="px-6 py-4 font-medium text-gray-700">
                  {product.size}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <ColorDot color={product.colorCode} />
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
