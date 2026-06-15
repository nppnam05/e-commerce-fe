import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export interface AddressForm {
  street: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
}

interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddressForm) => void;
  initialData?: AddressForm;
}

const emptyForm: AddressForm = {
  street: "",
  ward: "",
  district: "",
  city: "",
  isDefault: false,
};

export const AddressFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AddressFormModalProps) => {
  const [formData, setFormData] = useState<AddressForm>(
    initialData || emptyForm,
  );

  useEffect(() => {
    setFormData(initialData || emptyForm);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border-2 border-gray-300 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {initialData ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
          </h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Số nhà, tên đường"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="112 Đường Nguyễn Trãi"
            required
          />

          <Input
            label="Phường / Xã"
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            placeholder="Phường Bến Thành"
            required
          />

          <Input
            label="Quận / Huyện"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Quận 1"
            required
          />

          <Input
            label="Tỉnh / Thành phố"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Hồ Chí Minh"
            required
          />

          <div className="flex gap-3 pt-2">
            <Button type="button" className="flex-1" onClick={onClose}>
              Hủy
            </Button>
            <Button
              type="submit"
              variant="custom"
              className="flex-1 bg-black text-white hover:bg-gray-800"
            >
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
