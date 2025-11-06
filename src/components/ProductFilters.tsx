'use client';

import * as React from 'react';
import { useCallback } from 'react';
import { Search, Filter } from 'lucide-react';
import { useProductsStore } from '@/store/products';
import { debounce } from '@/lib/utils';

export const ProductFilters = () => {
  const { filter, searchQuery, setFilter, setSearchQuery } = useProductsStore();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    [setSearchQuery]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Поиск */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск продуктов..."
            defaultValue={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Фильтры */}
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-gray-500" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Все продукты
            </button>
            <button
              onClick={() => setFilter('liked')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'liked'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Избранное
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
