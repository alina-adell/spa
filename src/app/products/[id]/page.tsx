import * as React from 'react';
import { Navigation } from '@/components/Navigation';
import { ProductDetailClient } from './ProductDetailClient';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ProductDetailClient productId={params.id} />
    </div>
  );
}
