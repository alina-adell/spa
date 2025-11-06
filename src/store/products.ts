import * as React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, ProductFormData, ProductsState, ProductsActions } from '@/types';

// Используем Fake Store API для демо-данных
const FAKE_STORE_API = 'https://fakestoreapi.com/products';

type ProductsStore = ProductsState & ProductsActions;

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      // Состояние
      products: [],
      likedProducts: [],
      filter: 'all',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 12,
      isLoading: false,
      error: null,

      // Действия
      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(FAKE_STORE_API);
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          
          const products: Product[] = data.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            description: item.description,
            image: item.image,
            price: item.price,
            category: item.category,
            isLiked: false,
            isUserCreated: false,
          }));

          set({ products, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
        }
      },

      addProduct: (productData: ProductFormData) => {
        const { products } = get();
        const newProduct: Product = {
          id: Date.now().toString(),
          ...productData,
          isLiked: false,
          isUserCreated: true,
        };
        set({ products: [newProduct, ...products] });
      },

      toggleLike: (productId: string) => {
        const { products, likedProducts } = get();
        const updatedProducts = products.map(product =>
          product.id === productId 
            ? { ...product, isLiked: !product.isLiked }
            : product
        );
        
        const updatedLikedProducts = likedProducts.includes(productId)
          ? likedProducts.filter(id => id !== productId)
          : [...likedProducts, productId];

        set({ 
          products: updatedProducts,
          likedProducts: updatedLikedProducts
        });
      },

      deleteProduct: (productId: string) => {
        const { products, likedProducts } = get();
        const updatedProducts = products.filter(product => product.id !== productId);
        const updatedLikedProducts = likedProducts.filter(id => id !== productId);
        
        set({ 
          products: updatedProducts,
          likedProducts: updatedLikedProducts
        });
      },

      setFilter: (filter: 'all' | 'liked') => {
        set({ filter, currentPage: 1 });
      },

      setSearchQuery: (searchQuery: string) => {
        set({ searchQuery, currentPage: 1 });
      },

      setCurrentPage: (currentPage: number) => {
        set({ currentPage });
      },

      updateProduct: (productId: string, updates: Partial<Product>) => {
        const { products } = get();
        const updatedProducts = products.map(product =>
          product.id === productId 
            ? { ...product, ...updates }
            : product
        );
        set({ products: updatedProducts });
      },
    }),
    {
      name: 'products-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        products: state.products,
        likedProducts: state.likedProducts,
      }),
    }
  )
);
