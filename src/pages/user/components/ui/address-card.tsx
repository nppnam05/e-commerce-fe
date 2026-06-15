import { MapPin, Edit2, Trash2 } from "lucide-react";
import type { Address } from "@/types/address";

interface AddressCardProps {
  address: Address;
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}

export const AddressCard = ({
  address,
  onEdit,
  onRemove,
}: AddressCardProps) => {
  return (
    <div
      key={address.id}
      className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <MapPin className="mt-1 text-gray-400" size={24} />
          <div>
            <div className="flex items-center gap-3">
              {address.isDefault && (
                <span className="rounded-full bg-gray-900 px-3 py-1 text-xs text-white dark:bg-white dark:text-black">
                  Mặc định
                </span>
              )}
            </div>
            <p className="mt-1">
              {address.street + " - " + address.ward + " - " + address.district}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{address.city}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(address.id)}
            className="rounded-xl p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Edit2 size={20} />
          </button>
          {!address.isDefault && (
            <button
              onClick={() => onRemove?.(address.id)}
              className="rounded-xl p-3 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
