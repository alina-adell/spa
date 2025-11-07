'use client';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 1rem 0' }}>404</h2>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', margin: '0 0 1rem 0' }}>
          Страница не найдена
        </h3>
        <p style={{ color: '#6b7280', margin: '0 0 2rem 0' }}>
          К сожалению, запрашиваемая страница не существует.
        </p>
        <a
          href="/"
          style={{ 
            backgroundColor: '#2563eb', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Вернуться на главную
        </a>
      </div>
    </div>
  );
}
