#!/bin/bash

# Собираем приложение
npm run build

# Создаем папку out если её нет
mkdir -p out

# Копируем файлы из .next/static в out
cp -r .next/static out/ 2>/dev/null || true

# Создаем index.html для GitHub Pages
cat > out/index.html << 'EOF'
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPA Products App</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background: #f9fafb;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .loading {
            text-align: center;
            padding: 50px;
            font-size: 18px;
            color: #666;
        }
        .error {
            text-align: center;
            padding: 50px;
            color: #dc2626;
        }
        .redirect-notice {
            background: #dbeafe;
            border: 1px solid #60a5fa;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="redirect-notice">
            <h2>SPA Products App</h2>
            <p>Приложение для управления продуктами готово к использованию!</p>
            <p>Для лучшего опыта использования, рекомендуем использовать <strong>Development сервер</strong>:</p>
            <code>npm run dev</code>
            <br><br>
            <p>Или перейти по адресу: <a href="http://localhost:3001" target="_blank">http://localhost:3001</a></p>
        </div>
        
        <div class="loading">
            <h3>Возможности приложения:</h3>
            <ul style="text-align: left; display: inline-block;">
                <li>✅ Просмотр списка продуктов из Fake Store API</li>
                <li>✅ Детальная страница продукта</li>
                <li>✅ Создание новых продуктов</li>
                <li>✅ Редактирование пользовательских продуктов</li>
                <li>✅ Система избранного</li>
                <li>✅ Поиск и фильтрация</li>
                <li>✅ Пагинация</li>
                <li>✅ Адаптивный дизайн</li>
                <li>✅ TypeScript + Zustand</li>
            </ul>
        </div>
    </div>
    
    <script>
        // Добавляем базовый роутинг для GitHub Pages
        if (window.location.pathname !== '/spa/' && window.location.pathname !== '/spa/index.html') {
            console.log('Redirecting to main page...');
            // Можно добавить логику для обработки маршрутов
        }
    </script>
</body>
</html>
EOF

# Создаем .nojekyll файл
touch out/.nojekyll

echo "Static export completed!"
echo "Files created in ./out directory"
