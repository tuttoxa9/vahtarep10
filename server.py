#!/usr/bin/env python3
"""
Простой HTTP-сервер для отображения структуры проекта
"""

import http.server
import socketserver
import os
import json
from http import HTTPStatus

class ProjectHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            
            # HTML страница для отображения структуры проекта
            html_content = """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Проект vahta2-ver</title>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    h1 {
                        color: #333;
                    }
                    .description {
                        background-color: #f5f5f5;
                        padding: 15px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
                    .file-list {
                        border: 1px solid #ccc;
                        padding: 15px;
                        border-radius: 5px;
                    }
                    ul {
                        list-style-type: none;
                        padding-left: 20px;
                    }
                    li {
                        margin-bottom: 5px;
                    }
                    .folder {
                        font-weight: bold;
                        color: #0066cc;
                    }
                    .file {
                        color: #333;
                    }
                    pre {
                        background-color: #f5f5f5;
                        padding: 10px;
                        border-radius: 5px;
                        overflow-x: auto;
                    }
                </style>
            </head>
            <body>
                <h1>Проект vahta2-ver</h1>
                <div class="description">
                    <h2>Стек и технологии проекта:</h2>
                    <ul>
                        <li>Next.js (React 18)</li>
                        <li>TypeScript</li>
                        <li>Tailwind CSS</li>
                        <li>shadcn/ui</li>
                        <li>GSAP (GreenSock Animation Platform)</li>
                        <li>Framer Motion</li>
                        <li>Firebase (в демо-режиме — mock-данные)</li>
                        <li>Bun</li>
                    </ul>
                </div>
                
                <h2>Структура проекта:</h2>
                <div class="file-list" id="file-structure">
                    Загрузка структуры файлов...
                </div>
                
                <h2>Package.json:</h2>
                <pre id="package-content">Загрузка содержимого package.json...</pre>
                
                <script>
                    // Загрузка структуры файлов
                    fetch('/api/files')
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('file-structure').innerHTML = formatFileStructure(data);
                        });
                    
                    // Загрузка содержимого package.json
                    fetch('/api/package')
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('package-content').textContent = JSON.stringify(data, null, 2);
                        });
                    
                    // Функция для форматирования структуры файлов
                    function formatFileStructure(structure) {
                        if (Array.isArray(structure)) {
                            return '<ul>' + structure.map(item => {
                                if (typeof item === 'string') {
                                    return `<li class="file">📄 ${item}</li>`;
                                } else {
                                    const folderName = Object.keys(item)[0];
                                    return `<li class="folder">📁 ${folderName}</li>${formatFileStructure(item[folderName])}`;
                                }
                            }).join('') + '</ul>';
                        }
                        return '';
                    }
                </script>
            </body>
            </html>
            """
            
            self.wfile.write(html_content.encode('utf-8'))
            return
        
        elif self.path == '/api/files':
            # Метод для получения структуры файлов проекта
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            file_structure = self.get_file_structure('.')
            self.wfile.write(json.dumps(file_structure).encode('utf-8'))
            return
        
        elif self.path == '/api/package':
            # Метод для получения содержимого package.json
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            try:
                with open('package.json', 'r') as f:
                    package_data = json.load(f)
                self.wfile.write(json.dumps(package_data).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return
        
        # По умолчанию обрабатываем запрос как обычный файл
        return http.server.SimpleHTTPRequestHandler.do_GET(self)
    
    def get_file_structure(self, path, max_depth=3, current_depth=0):
        """Рекурсивно получаем структуру файлов и папок"""
        result = []
        
        if current_depth >= max_depth:
            return result
        
        try:
            items = os.listdir(path)
            for item in sorted(items):
                # Игнорируем скрытые файлы и директории
                if item.startswith('.'):
                    continue
                
                # Игнорируем виртуальные окружения и кэш-директории
                if item in ['__pycache__', 'node_modules', 'venv', 'env']:
                    continue
                
                item_path = os.path.join(path, item)
                
                if os.path.isdir(item_path):
                    # Для директорий рекурсивно получаем структуру
                    sub_structure = self.get_file_structure(
                        item_path, 
                        max_depth, 
                        current_depth + 1
                    )
                    result.append({item: sub_structure})
                else:
                    # Для файлов просто добавляем имя
                    result.append(item)
        except Exception as e:
            print(f"Error reading directory {path}: {e}")
        
        return result

def main():
    PORT = 5000
    Handler = ProjectHandler
    
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Сервер запущен на порту {PORT}")
        print(f"Для доступа к проекту откройте: http://localhost:{PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    main()