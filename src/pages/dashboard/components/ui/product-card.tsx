import { Button } from "@/components/ui/button";
import { formatVND } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "@/store/api/api-product";

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
  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
