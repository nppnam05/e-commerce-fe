import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProductStock } from "@/types/product-stock";

interface StockEditModalProps {
  product: ProductStock | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, newQuantity: number) => void;
}

export const StockEditModal = ({
  product,
  isOpen,
  onClose,
  onSave,
}: StockEditModalProps) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (product) {
      setQuantity(product.quantity);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSave = () => {
    onSave(product.id, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Chỉnh sửa số lượng
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex gap-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
              <p className="mt-1 font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>

          <Input
            label="Số lượng (Piece)"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={0}
            className="text-center text-2xl font-semibold"
          />
        </div>

        <div className="flex gap-3 border-t bg-gray-50 p-6">
          <Button type="button" size="md" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="md"
            variant="custom"
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
