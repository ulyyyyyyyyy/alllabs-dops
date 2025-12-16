// js/widgets/DogsWidget.js
import { BaseWidget } from './BaseWidget.js';
import { ApiService } from '../modules/ApiService.js';
import { DOGS_CONFIG } from '../modules/Constants.js';

export class DogsWidget extends BaseWidget {
    constructor() {
        super('dog-image');
        this.dogImageElement = null;
        this.refreshButton = null;
    }

    render() {
        // Dogs widget has different structure, so we override render
        this.dogImageElement = document.getElementById('dog-image');
        this.refreshButton = document.getElementById('refresh-dog');
        
        if (!this.dogImageElement || !this.refreshButton) {
            throw new Error('Required elements for DogsWidget not found');
        }

        this.showPlaceholder();
        this.loadRandomDog();
    }

    bindEvents() {
        this.refreshButton.addEventListener('click', () => {
            this.loadRandomDog();
        });
    }

    showPlaceholder() {
        this.dogImageElement.style.opacity = '0.5';
        this.dogImageElement.src = this.getPlaceholderSVG();
    }

    getPlaceholderSVG() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik03NSA1MEgxMjVWMTUwSDc1VjUwWiIgZmlsbD0iI0RBREVEQSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3NSIgcj0iMTUiIGZpbGw9IiNEQURFREEiLz4KPHBhdGggZD0iTTY1IDE0MEgxMzVWMTU1SDY1VjE0MFoiIGZpbGw9IiNEQURFREEiLz4KPC9zdmc+';
    }

    async loadRandomDog() {
        try {
            this.setLoadingState(true);
            this.showPlaceholder();
            
            const data = await ApiService.fetchData(DOGS_CONFIG.API_URL);
            
            if (data.status === 'success') {
                await this.loadImageWithTransition(data.message);
            } else {
                throw new Error('API returned error');
            }
            
        } catch (error) {
            this.handleError(error);
        } finally {
            this.setLoadingState(false);
        }
    }

    loadImageWithTransition(imageUrl) {
        return new Promise((resolve, reject) => {
            const newImage = new Image();
            
            newImage.onload = () => {
                this.dogImageElement.src = imageUrl;
                this.dogImageElement.style.opacity = '1';
                resolve();
            };
            
            newImage.onerror = () => {
                reject(new Error('Failed to load image'));
            };
            
            newImage.src = imageUrl;
        });
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.refreshButton.textContent = 'Загрузка...';
            this.refreshButton.disabled = true;
        } else {
            this.refreshButton.textContent = 'Другая собака';
            this.refreshButton.disabled = false;
        }
    }

    handleError(error) {
        console.error('Dogs widget error:', error);
        this.dogImageElement.alt = 'Не удалось загрузить изображение собаки';
        this.refreshButton.textContent = 'Попробовать снова';
    }
}