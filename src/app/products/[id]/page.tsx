import * as React from 'react';
import { Navigation } from '@/components/Navigation';
import { ProductDetailClient } from './ProductDetailClient';

// Принудительно отключаем SSR
export const dynamic = 'force-static';

// Генерируем статические параметры для всех продуктов из API
export async function generateStaticParams() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    
    return products.map((product: { id: number }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching products for static generation:', error);
    // Возвращаем заглушку для основных ID, если API недоступен
    return Array.from({ length: 20 }, (_, i) => ({ id: (i + 1).toString() }));
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
