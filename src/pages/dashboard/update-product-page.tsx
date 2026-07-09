import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Select } from "./components/ui/select";
import { useGetAllCategoriesQuery } from "@/store/api/api-category";
import { ImageUpload } from "./components/ui/ImageUpload";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/store/api/api-product";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
}

export const EditProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery(Number(id));

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
  });
  const [images, setImages] = useState<File[]>([]);

  const { data: categories = [] } = useGetAllCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: String(product.categoryId),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryId = Number(formData.category);

    var result = updateProduct({
      id: Number(id),
      name: formData.name,
      description: formData.description,
      price: formData.price,
      categoryId,
      images,
    }).unwrap();
    
    toast.promise(result, {
      loading: "Đang xử lý cập nhật sản phẩm...",
      success: () => {
        window.history.back();
        return "Cập nhật sản phẩm thành công!";
      },
      error: (err) => {
        return (
          err?.data?.message || "Cập nhật sản phẩm thất bại. Vui lòng thử lại!"
        );
      },
    });
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
            </div>

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
