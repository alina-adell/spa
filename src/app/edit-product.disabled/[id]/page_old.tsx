'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Navigation } from '@/components/Navigation';
import { useProductsStore } from '@/store/products';
import { Product, ProductFormData } from '@/types';
import { ArrowLeft, Upload } from 'lucide-react';

// Генерируем статические параметры для динамических страниц
export async function generateStaticParams() {
  // Получаем продукты из Fake Store API
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    
    // Возвращаем ID всех продуктов
    return products.map((product: { id: number }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching products for static generation:', error);
    return [];
  }
}

const categories = [
  'electronics',
  'clothing',
  'books',
  'home',
  'sports',
  'beauty',
  'toys',
  'food',
  'other'
];

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { products, updateProduct } = useProductsStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productId = params.id as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProductFormData>();

  const imageUrl = watch('image');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      reset({
        title: foundProduct.title,
        description: foundProduct.description,
        image: foundProduct.image,
        price: foundProduct.price,
        category: foundProduct.category,
      });
    }
  }, [products, productId, reset]);

  const onSubmit = async (data: ProductFormData) => {
    if (!product) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProduct(product.id, {
        ...data,
        price: Number(data.price),
      });
      
      router.push(`/products/${product.id}`);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
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
      </div>
    );
  }

  if (!product.isUserCreated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-gray-400 text-xl mb-4">
              Можно редактировать только пользовательские продукты
            </div>
            <button
              onClick={() => router.push(`/products/${product.id}`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Вернуться к продукту
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Назад
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Редактировать продукт
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Название */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Название продукта *
              </label>
              <input
                type="text"
                id="title"
                {...register('title', {
                  required: 'Название продукта обязательно',
                  minLength: {
                    value: 3,
                    message: 'Название должно содержать минимум 3 символа'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Введите название продукта"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Описание */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Описание *
              </label>
              <textarea
                id="description"
                rows={4}
                {...register('description', {
                  required: 'Описание продукта обязательно',
                  minLength: {
                    value: 10,
                    message: 'Описание должно содержать минимум 10 символов'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Введите описание продукта"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* URL изображения */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                URL изображения *
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="image"
                  {...register('image', {
                    required: 'URL изображения обязателен',
                    pattern: {
                      value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                      message: 'Введите корректный URL изображения'
                    }
                  })}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="https://example.com/image.jpg"
                />
                <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
              
              {/* Превью изображения */}
              {imageUrl && !errors.image && (
                <div className="mt-3">
                  <img
                    src={imageUrl}
                    alt="Превью"
                    className="w-32 h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Цена */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Цена (USD) *
              </label>
              <input
                type="number"
                id="price"
                step="0.01"
                min="0"
                {...register('price', {
                  required: 'Цена продукта обязательна',
                  min: {
                    value: 0.01,
                    message: 'Цена должна быть больше 0'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            {/* Категория */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Категория *
              </label>
              <select
                id="category"
                {...register('category', {
                  required: 'Выберите категорию продукта'
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Выберите категорию</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            {/* Кнопки */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
