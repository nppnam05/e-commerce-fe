import type { ProductChildren } from "@/types/product";
import { ProductChildrenRow } from "./productchildren-row";

interface ProductTableProps {
  products: ProductChildren[];
}

export const ProductChildrenTable = ({ products }: ProductTableProps) => {
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
              <th className="w-28 px-6 py-5 text-center text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <ProductChildrenRow key={product.id} product={product} />
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
