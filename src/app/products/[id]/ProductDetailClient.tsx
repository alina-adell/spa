'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductsStore } from '@/store/products';
import { Product } from '@/types';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

interface ProductDetailClientProps {
  productId: string;
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const router = useRouter();
  const { products, toggleLike, deleteProduct } = useProductsStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct || null);
  }, [products, productId]);

  const handleLikeClick = () => {
    if (product) {
      toggleLike(product.id);
      setProduct((prev: Product | null) => prev ? { ...prev, isLiked: !prev.isLiked } : null);
    }
  };

  const handleDeleteClick = () => {
    if (product && window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
      deleteProduct(product.id);
      router.push('/products');
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">Продукт не найден</div>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться к продуктам
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Назад
      </button>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Изображение */}
          <div className="relative h-96 lg:h-full min-h-[400px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.isUserCreated && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Создано пользователем
              </div>
            )}
          </div>

          {/* Информация о продукте */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={handleLikeClick}
                  className={`p-3 rounded-full transition-colors ${
                    product.isLiked
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart 
                    size={24} 
                    fill={product.isLiked ? 'currentColor' : 'none'}
                  />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {product.category}
              </span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Описание
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Добавить в корзину
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Купить сейчас
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
