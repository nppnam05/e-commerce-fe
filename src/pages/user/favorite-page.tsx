import type { RootState } from "@/store";
import { FavoriteCard } from "./components/ui/favorite-card";
import {
  useGetFavoriteByUserIdQuery,
  useDeleteFavoriteMutation,
} from "@/store/api/api-favorite";
import { useSelector } from "react-redux";
import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";

export const FavoritePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteFavorite] = useDeleteFavoriteMutation();

  const handleRemoveFavorite = async (id: number) => {
    try {
      await deleteFavorite(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (id: number) => {
    console.log(id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const { data } = useGetFavoriteByUserIdQuery({
    userId: user.id,
    params: {
      pageNumber: currentPage,
      pageSize: 6,
    },
  });
  const favoriteItems = data?.data || [];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">
        Sản phẩm yêu thích ({data?.total})
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {favoriteItems.map((item) => (
          <FavoriteCard
            key={item.id}
            item={item}
            onAddToCart={(id) => handleAddToCart(id)}
            onRemove={(id) => handleRemoveFavorite(id)}
          />
        ))}
      </div>

      {favoriteItems.length === 0 && (
        <p className="py-12 text-center text-gray-500">
          Chưa có sản phẩm yêu thích nào
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      ></Pagination>
    </div>
  );
};
