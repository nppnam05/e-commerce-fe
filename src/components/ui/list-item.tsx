import type { Product } from "@/types/product";
import { ItemSkeleton } from "./item-skeleton";
import { Item } from "./item";

interface ListItemInput extends React.HtmlHTMLAttributes<HTMLDivElement> {
  products: Product[];
  isFetching: boolean;
  isLoading: boolean;
  maxItem: number;
}

export function ListItem({
  isFetching,
  products,
  isLoading,
  maxItem,
  className,
}: ListItemInput) {
  return (
    <div className={`${className}`}>
      {!isLoading &&
        products.map((product, index) => {
          return <Item key={index} product={product} />;
        })}

      {isLoading && Array.from(Array(maxItem), () => <ItemSkeleton />)}

      {!isLoading && isFetching && (
        <div className="inset-0 bg-black opacity-15"></div>
      )}
    </div>
  );
}
