import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Select } from "./components/ui/select";
import { ColorPicker } from "./components/ui/color-picker";
import { useGetAllColorsQuery } from "@/store/api/api-color";
import { useGetAllSizesQuery } from "@/store/api/api-size";
import { useGetAllCategoriesQuery } from "@/store/api/api-category";
import { ImageUpload } from "./components/ui/ImageUpload";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/store/api/api-product";
import { useParams } from "react-router-dom";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  color: string;
}

export const EditProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery(Number(id));

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    size: "",
    color: "",
  });
  const [images, setImages] = useState<File[]>([]);

  const { data: colors = [] } = useGetAllColorsQuery();
  const { data: sizes = [] } = useGetAllSizesQuery();
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: String(product.categoryId),
        size: String(product.sizeId),
        color: product.colorCode,
      });
    }
  }, [product]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoryId = Number(formData.category);
    const sizeId = Number(formData.size);
    const colorId = Number(
      colors.find((c) => c.colorCode === formData.color)?.id,
    );

    try {
      var result = await updateProduct({
        id: Number(id),
        name: formData.name,
        description: formData.description,
        price: formData.price,
        categoryId,
        colorId,
        sizeId,
        images,
      }).unwrap();
      if (result) {
        window.history.back();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardPageLayout title="Update Product">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          {product?.imageUrls && product.imageUrls.length > 0 && (
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-gray-700">
                Ảnh hiện tại
              </p>
              <div className="grid grid-cols-3 gap-2">
                {product.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`product-${index}`}
                    className="h-24 w-full rounded-xl object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                ))}
              </div>
            </div>
          )}

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
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                required
              />
              <Select
                label="Kích cỡ"
                name="size"
                value={formData.size}
                onChange={handleChange}
                options={sizes.map((size) => ({
                  value: size.id,
                  label: size.name,
                }))}
                required
              />
            </div>

            <ColorPicker
              label="Màu sắc"
              value={formData.color}
              onChange={handleColorChange}
              colors={colors.map((color) => color.colorCode)}
            />

            <ImageUpload
              label="Thay ảnh mới (không bắt buộc)"
              onChange={(files) => setImages(files)}
            />

            <div className="flex gap-4 pt-6">
              <Button
                size="md"
                className="flex-1"
                type="button"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                size="md"
                variant="custom"
                type="submit"
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
