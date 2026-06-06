import type { ProductOrder } from "./product";

export interface Order {
  id: number;
  status: string;
  customerName: string;
  address: string;
  code: string;
  createdOn: Date;
}

export interface OrderDetail extends Order {
  totalAmount: number;
  products: ProductOrder[];
}