import * as React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, ProductFormData, ProductsState, ProductsActions } from '@/types';

// Используем JSONPlaceholder API для демо-данных
const JSONPLACEHOLDER_POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
const JSONPLACEHOLDER_USERS_API = 'https://jsonplaceholder.typicode.com/users';

// Типы для JSONPlaceholder API
interface ApiPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

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
          // Получаем посты и пользователей параллельно
          const [postsResponse, usersResponse] = await Promise.all([
            fetch(JSONPLACEHOLDER_POSTS_API),
            fetch(JSONPLACEHOLDER_USERS_API)
          ]);
          
          if (!postsResponse.ok || !usersResponse.ok) {
            throw new Error('Failed to fetch data');
          }
          
          const posts: ApiPost[] = await postsResponse.json();
          const users: ApiUser[] = await usersResponse.json();
          
          // Создаем карту пользователей для быстрого поиска
          const usersMap = new Map(users.map((user: ApiUser) => [user.id, user]));
          
          const products: Product[] = posts.map((post: ApiPost) => {
            const user = usersMap.get(post.userId);
            return {
              id: post.id.toString(),
              title: post.title,
              description: post.body,
              image: `https://picsum.photos/400/300?random=${post.id}`, // Случайные изображения
              price: Math.floor(Math.random() * 1000) + 10, // Случайная цена от 10 до 1010
              category: user?.company?.bs || 'general', // Используем бизнес пользователя как категорию
              isLiked: false,
              isUserCreated: false,
            };
          });

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
