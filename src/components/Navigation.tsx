'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Plus, ShoppingBag } from 'lucide-react';

export const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Главная',
      icon: Home,
    },
    {
      href: '/products',
      label: 'Продукты',
      icon: ShoppingBag,
    },
    {
      href: '/create-product',
      label: 'Создать продукт',
      icon: Plus,
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              SPA Products
            </Link>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href === '/products' && pathname.startsWith('/products'));
              
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
