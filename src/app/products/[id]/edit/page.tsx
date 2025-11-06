import * as React from 'react';
import { Navigation } from '@/components/Navigation';
import { EditProductClient } from './EditProductClient';

// Пустая функция для соответствия требованиям статического экспорта
export async function generateStaticParams() {
  return [];
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <EditProductClient productId={params.id} />
    </div>
  );
}