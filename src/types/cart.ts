export interface Cart {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  singlePrice: number;
  product: {
    name: string;
    size: string;
    colorCode: string;
    price: number;
    imageUrls: string[];
  };
}
