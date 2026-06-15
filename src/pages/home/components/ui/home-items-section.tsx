import { Button } from "@/components/ui/button";
import { ItemSkeleton } from "@/components/ui/item-skeleton";
import { ListItem } from "@/components/ui/list-item";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";

type HomeItemSectionInput = {
  name: string;
  isFetching: boolean; 
  isLoading: boolean; 
  products: Product[]
};

export function HomeItemsSection({ name, isFetching, isLoading, products }: HomeItemSectionInput) {
  const navigation = useNavigate();

  function handleOnClick() {
    navigation("/category");
  }

  return (
    <div className="my-12 flex flex-col items-center gap-12">
      <h2 className="w-fit text-6xl font-bold">{name}</h2>
      {isLoading ? (
        <div className="grid grid-cols-2 justify-items-center gap-4 lg:grid-cols-4">
          {Array.from(Array(4), () => (
            <ItemSkeleton />
          ))}
        </div>
      ) : (
        <ListItem
          products={products}
          isFetching={isFetching}
          isLoading={isLoading}
          maxItem={4}
          className="grid grid-cols-2 justify-items-center gap-4 lg:grid-cols-4"
        />
      )}
      <Button variant="primary" className="inline" onClick={handleOnClick}>
        View all
      </Button>
    </div>
  );
}
