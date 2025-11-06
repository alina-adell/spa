import * as React from 'react';
import { Navigation } from '@/components/Navigation';
import { ProductDetailClient } from './ProductDetailClient';

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

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ProductDetailClient productId={params.id} />
    </div>
  );
}
