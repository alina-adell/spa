'use client';

import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { Pagination } from '@/components/Pagination';
import { useProductsStore } from '@/store/products';
import { Loader2 } from 'lucide-react';

export default function ProductsPage() {
  const {
    products,
    likedProducts,
    filter,
    searchQuery,
    currentPage,
    itemsPerPage,
    isLoading,
    error,
    fetchProducts,
    setCurrentPage,
  } = useProductsStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Фильтрация по избранному
    if (filter === 'liked') {
      filtered = filtered.filter(product => likedProducts.includes(product.id));
    }

    // Поиск
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, filter, searchQuery, likedProducts]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">Ошибка загрузки данных</div>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Каталог продуктов
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'продукт' : 'продуктов'} найдено
          </p>
        </div>

        <ProductFilters />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Загрузка продуктов...</span>
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              {filter === 'liked' ? 'Нет продуктов в избранном' : 'Продукты не найдены'}
            </div>
            <p className="text-gray-500">
              {filter === 'liked' 
                ? 'Добавьте продукты в избранное, нажав на иконку сердца'
                : 'Попробуйте изменить параметры поиска или фильтрации'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
