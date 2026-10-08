export type Category = 'Electronics' | 'Fashion' | 'Home' | 'Accessories';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  rating?: number;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Delivered' | 'Shipped' | 'Processing';

export interface Order {
  id: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  totalPrice: number;
  status: OrderStatus;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}
