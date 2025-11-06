import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SPA Products App',
  description: 'Single Page Application для управления продуктами',
};

// Принудительно отключаем SSR для статического экспорта
export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
