// js/widgets/BaseWidget.js
export class BaseWidget {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = config;
        this.isLoading = false;
        
        if (!this.container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        throw new Error('Render method must be implemented');
    }

    bindEvents() {
        throw new Error('bindEvents method must be implemented');
    }

    showLoading() {
        this.isLoading = true;
        this.container.innerHTML = this.getLoadingHTML();
    }

    hideLoading() {
        this.isLoading = false;
    }

    getLoadingHTML() {
        return '<div class="loading">Загрузка...</div>';
    }

    showError(message) {
        this.container.innerHTML = this.getErrorHTML(message);
    }

    getErrorHTML(message) {
        return `
            <div class="error">
                <div>❌ ${message}</div>
                <button class="retry-btn">Повторить</button>
            </div>
        `;
    }

    destroy() {
        // Cleanup method for child classes to override
    }
}