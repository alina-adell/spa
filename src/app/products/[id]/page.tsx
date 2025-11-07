import * as React from 'react';
import { Navigation } from '@/components/Navigation';
import { ProductDetailClient } from './ProductDetailClient';

// Генерируем статические страницы для первых 20 продуктов
export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ProductDetailClient productId={params.id} />
    </div>
  );
}
