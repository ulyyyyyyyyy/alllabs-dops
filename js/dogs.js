// js/dogs.js
class DogsWidget {
    constructor() {
        this.dogImageElement = document.getElementById('dog-image');
        this.refreshButton = document.getElementById('refresh-dog');
        this.imageWrapper = document.querySelector('.dog-image-wrapper');
        
        this.init();
    }
    
    init() {
        // Показываем плейсхолдер пока грузится изображение
        this.showPlaceholder();
        
        // Загружаем первую собаку
        this.loadRandomDog();
        
        // Добавляем обработчик для кнопки
        this.refreshButton.addEventListener('click', () => {
            this.loadRandomDog();
        });
    }
    
    showPlaceholder() {
        this.dogImageElement.style.opacity = '0.5';
        this.dogImageElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik03NSA1MEgxMjVWMTUwSDc1VjUwWiIgZmlsbD0iI0RBREVEQSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3NSIgcj0iMTUiIGZpbGw9IiNEQURFREEiLz4KPHBhdGggZD0iTTY1IDE0MEgxMzVWMTU1SDY1VjE0MFoiIGZpbGw9IiNEQURFREEiLz4KPC9zdmc+';
    }
    
    async loadRandomDog() {
        try {
            this.refreshButton.textContent = 'Загрузка...';
            this.refreshButton.disabled = true;
            this.showPlaceholder();
            
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            
            if (!response.ok) {
                throw new Error('Ошибка загрузки изображения');
            }
            
            const data = await response.json();
            
            if (data.status === 'success') {
                // Создаем новое изображение для плавной загрузки
                const newImage = new Image();
                
                newImage.onload = () => {
                    this.dogImageElement.src = data.message;
                    this.dogImageElement.style.opacity = '1';
                    this.refreshButton.textContent = 'Другая собака';
                    this.refreshButton.disabled = false;
                };
                
                newImage.onerror = () => {
                    throw new Error('Ошибка загрузки изображения');
                };
                
                newImage.src = data.message;
                
            } else {
                throw new Error('API вернуло ошибку');
            }
            
        } catch (error) {
            console.error('Ошибка:', error);
            this.dogImageElement.alt = 'Не удалось загрузить изображение собаки';
            this.refreshButton.textContent = 'Попробовать снова';
            this.refreshButton.disabled = false;
        }
    }
}

// Инициализация виджета когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new DogsWidget();
});