import * as React from 'react';
import { Navigation } from '@/components/Navigation';
import { EditProductClient } from './EditProductClient';

// Принудительно отключаем SSR
export const dynamic = 'force-dynamic';

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <EditProductClient productId={params.id} />
    </div>
  );
}