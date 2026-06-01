import { Button } from "@/components/ui/button";
import { formatVND } from "@/utils/format";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className="rounded-2xl bg-white p-3">
      <div className="">
        <img
          src={img}
          alt={name}
          className="rounded-xl object-cover"
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
        <Button size="sm" onClick={() => navigate(`/dashboard/product/${id}`)}>
          Edit Product
        </Button>
      </div>
    </div>
  );
};
