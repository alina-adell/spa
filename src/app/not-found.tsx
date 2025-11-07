export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f9fafb'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0', color: '#1f2937' }}>404</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#666' }}>Страница не найдена</p>
      <a 
        href="/" 
        style={{ 
          background: '#3b82f6', 
          color: 'white', 
          padding: '0.5rem 1rem',
          textDecoration: 'none',
          borderRadius: '0.25rem'
        }}
      >
        Вернуться на главную
      </a>
    </div>
  );
}
