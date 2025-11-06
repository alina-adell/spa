import * as React from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isLiked?: boolean;
  isUserCreated?: boolean;
}

export interface ProductFormData {
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export interface ProductsState {
  products: Product[];
  likedProducts: string[];
  filter: 'all' | 'liked';
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  error: string | null;
}

export interface ProductsActions {
  fetchProducts: () => Promise<void>;
  addProduct: (product: ProductFormData) => void;
  toggleLike: (productId: string) => void;
  deleteProduct: (productId: string) => void;
  setFilter: (filter: 'all' | 'liked') => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
}
