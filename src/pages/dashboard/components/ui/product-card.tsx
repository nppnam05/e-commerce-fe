import { Button } from "@/components/ui/button";
import { formatVND } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "@/store/api/api-product";
import { SelectableModal } from "@/components/ui/modal/selectable-modal";
import { useState } from "react";
import { toast } from "sonner";

export const ProductCard = ({
  id,
  img,
  name,
  money,
}: {
  id: number;
  img: string;
  name: string;
  money: number;
}) => {
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteConfirm = async (confirmed: boolean) => {
    if (confirmed) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Xóa sản phẩm thành công!");
      } catch (err) {
        toast.error(
          err?.data?.message || "Xóa sản phẩm thất bại. Vui lòng thử lại!",
        );
      }
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="rounded-2xl bg-white p-3">
        <div className="h-52 w-full overflow-hidden rounded-xl">
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
        </div>
        <div className="mt-5">
          <h1 className="text-xl font-semibold">{name}</h1>
          <div className="mb-5 flex">
            <p className="font-semibold text-blue-500">{formatVND(money)}</p>
          </div>
          <div className="flex justify-between">
            <Button
              size="sm"
              onClick={() => navigate(`/dashboard/update-product/${id}`)}
            >
              Edit Product
            </Button>
            <Button
              size="sm"
              variant="custom"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <SelectableModal
        isOpen={isDeleteModalOpen}
        toggleModal={() => setIsDeleteModalOpen(false)}
        onSelected={handleDeleteConfirm}
        selectableMessage={`Bạn có chắc chắn muốn xóa sản phẩm "${name}" không? Hành động này không thể hoàn tác.`}
      />
    </>
  );
};
