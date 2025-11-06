'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { ShoppingBag, Plus, Heart } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Добро пожаловать в SPA Products
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Современное приложение для управления продуктами с возможностью просмотра, 
            создания, редактирования и добавления в избранное.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Просмотр продуктов
              </h3>
              <p className="text-gray-600 mb-6">
                Просматривайте каталог продуктов с возможностью фильтрации и поиска
              </p>
              <button
                onClick={() => router.push('/products')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Перейти к продуктам
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Создание продукта
              </h3>
              <p className="text-gray-600 mb-6">
                Добавляйте новые продукты с подробной информацией и изображениями
              </p>
              <button
                onClick={() => router.push('/create-product')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Создать продукт
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Избранное
              </h3>
              <p className="text-gray-600 mb-6">
                Добавляйте продукты в избранное для быстрого доступа к ним
              </p>
              <button
                onClick={() => router.push('/products?filter=liked')}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Просмотреть избранное
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
