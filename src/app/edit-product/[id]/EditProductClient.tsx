'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useProductsStore } from '@/store/products';
import { Product, ProductFormData } from '@/types';
import { ArrowLeft, Upload } from 'lucide-react';

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

interface EditProductClientProps {
  productId: string;
}

export function EditProductClient({ productId }: EditProductClientProps) {
  const router = useRouter();
  const { products, updateProduct } = useProductsStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ProductFormData>();

  const watchedImage = watch('image');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setValue('title', foundProduct.title);
      setValue('description', foundProduct.description);
      setValue('image', foundProduct.image);
      setValue('price', foundProduct.price);
      setValue('category', foundProduct.category);
    }
  }, [products, productId, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    if (!product) return;

    setIsSubmitting(true);
    try {
      const updatedProduct: Product = {
        ...product,
        title: data.title,
        description: data.description,
        image: data.image,
        price: data.price,
        category: data.category,
      };

      updateProduct(product.id, updatedProduct);
      router.push(`/products/${product.id}`);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsSubmitting(false);
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

  if (!product.isUserCreated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">
            Можно редактировать только созданные пользователем продукты
          </div>
          <button
            onClick={() => router.push(`/products/${product.id}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться к продукту
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              {...register('title', {
                required: 'Название обязательно',
                minLength: {
                  value: 3,
                  message: 'Название должно содержать минимум 3 символа'
                }
              })}
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              {...register('description', {
                required: 'Описание обязательно',
                minLength: {
                  value: 10,
                  message: 'Описание должно содержать минимум 10 символов'
                }
              })}
              id="description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите описание продукта"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Изображение */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              URL изображения *
            </label>
            <div className="flex flex-col gap-3">
              <input
                {...register('image', {
                  required: 'URL изображения обязателен',
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                    message: 'Введите корректный URL изображения (jpg, jpeg, png, gif, webp)'
                  }
                })}
                type="url"
                id="image"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
              
              {/* Предпросмотр изображения */}
              {watchedImage && (
                <div className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
                  <img
                    src={watchedImage}
                    alt="Предпросмотр"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Цена */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Цена *
            </label>
            <input
              {...register('price', {
                required: 'Цена обязательна',
                min: {
                  value: 0.01,
                  message: 'Цена должна быть больше 0'
                },
                max: {
                  value: 999999,
                  message: 'Цена слишком большая'
                }
              })}
              type="number"
              step="0.01"
              id="price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="99.99"
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
              {...register('category', { required: 'Категория обязательна' })}
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/products/${product.id}`)}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}