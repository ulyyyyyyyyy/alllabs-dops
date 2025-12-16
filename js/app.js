// js/app.js
import { WeatherWidget } from './widgets/WeatherWidget.js';
import { DogsWidget } from './widgets/DogsWidget.js';
import { DragManager } from './managers/DragManager.js';

class DashboardApp {
    constructor() {
        this.widgets = new Map();
        this.managers = new Map();
        this.init();
    }

    init() {
        this.initializeWidgets();
        this.initializeManagers();
        this.bindGlobalEvents();
    }

    initializeWidgets() {
        try {
            const weatherWidget = new WeatherWidget();
            weatherWidget.init();
            this.widgets.set('weather', weatherWidget);

            const dogsWidget = new DogsWidget();
            dogsWidget.init();
            this.widgets.set('dogs', dogsWidget);

        } catch (error) {
            console.error('Failed to initialize widgets:', error);
        }
    }

    initializeManagers() {
        try {
            const dragManager = new DragManager();
            this.managers.set('drag', dragManager);
        } catch (error) {
            console.error('Failed to initialize managers:', error);
        }
    }

    bindGlobalEvents() {
        window.addEventListener('beforeunload', () => {
            this.destroy();
        });

        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });
    }

    getWidget(name) {
        return this.widgets.get(name);
    }

    getManager(name) {
        return this.managers.get(name);
    }

    destroy() {
        // Cleanup all widgets and managers
        this.widgets.forEach(widget => {
            if (typeof widget.destroy === 'function') {
                widget.destroy();
            }
        });
        
        this.widgets.clear();
        this.managers.clear();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardApp = new DashboardApp();
});