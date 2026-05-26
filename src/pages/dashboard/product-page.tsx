import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select } from "./components/ui/select";
import { ColorPicker } from "./components/ui/color-picker";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  color: string;
}

export const ProductPage = ({ title }: { title: string }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    size: "",
    color: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Data:", formData);
    alert("Sản phẩm đã được lưu thành công!");
  };

  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "home", label: "Home & Kitchen" },
  ];

  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  return (
    <DashboardPageLayout title={title}>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Tên sản phẩm"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm"
              variant="primary"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Mô tả
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Mô tả chi tiết về sản phẩm..."
                required
              />
            </div>

            <Input
              label="Giá (VND)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              required
            />

            <div className="grid grid-cols-1 gap-6">
              <Select
                label="Danh mục"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
                required
              />

              <Select
                label="Kích cỡ"
                name="size"
                value={formData.size}
                onChange={handleChange}
                options={sizeOptions}
                required
              />
            </div>

            <ColorPicker
              label="Màu sắc"
              value={formData.color}
              onChange={handleColorChange}
            />

            <div className="flex gap-4 pt-6">
              <Button
                size="md"
                className="flex-1"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                size="md"
                variant="custom"
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardPageLayout>
  );
};
