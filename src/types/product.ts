export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string[];
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrls: string[];
}

export interface ProductOrder {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  size: string;
  colorCode: string;
  imageUrls: string[];
}

export interface ProductStock {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  size: string;
  colorCode: string;
  imageUrls: string[];
}

export interface ProductFilter {
  id: number;
  name: string;
}

export interface ProductChildren extends ProductStock {}
