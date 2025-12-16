class DragManager {
    constructor() {
        this.draggedElement = null;
        this.placeholder = null;
        this.init();
    }

    init() {
        this.createStyles();
        this.bindEvents();
        this.restorePositions();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .widget.dragging {
                transform: rotate(3deg);
                opacity: 0.8;
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }
            
            .drag-placeholder {
                background: rgba(255, 255, 255, 0.3);
                border: 2px dashed rgba(30, 144, 255, 0.6);
                border-radius: 24px;
                min-height: 200px;
            }
            
            .widget.drag-over {
                border: 2px solid #1E90FF;
                transform: scale(1.02);
            }
            
            .widget {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: grab;
            }
            
            .widget:active {
                cursor: grabbing;
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        document.addEventListener('dragstart', this.handleDragStart.bind(this));
        document.addEventListener('dragend', this.handleDragEnd.bind(this));
        document.addEventListener('dragover', this.handleDragOver.bind(this));
        document.addEventListener('dragenter', this.handleDragEnter.bind(this));
        document.addEventListener('dragleave', this.handleDragLeave.bind(this));
        document.addEventListener('drop', this.handleDrop.bind(this));
    }

    handleDragStart(e) {
        if (e.target.classList.contains('widget')) {
            this.draggedElement = e.target;
            e.target.classList.add('dragging');
            
            // Создаем placeholder
            this.placeholder = document.createElement('div');
            this.placeholder.className = 'widget drag-placeholder';
            this.placeholder.style.gridColumn = e.target.style.gridColumn;
            this.placeholder.style.gridRow = e.target.style.gridRow;
            
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
            
            // Задержка для плавности
            setTimeout(() => {
                e.target.style.opacity = '0.4';
            }, 0);
        }
    }

    handleDragEnd(e) {
        if (this.draggedElement) {
            this.draggedElement.classList.remove('dragging');
            this.draggedElement.style.opacity = '1';
            this.draggedElement.style.transform = '';
            
            // Удаляем placeholder
            if (this.placeholder && this.placeholder.parentNode) {
                this.placeholder.parentNode.removeChild(this.placeholder);
            }
            
            // Убираем все drag-over классы
            document.querySelectorAll('.widget.drag-over').forEach(widget => {
                widget.classList.remove('drag-over');
            });
            
            this.draggedElement = null;
            this.placeholder = null;
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    handleDragEnter(e) {
        e.preventDefault();
        const target = e.target.closest('.widget');
        
        if (target && target !== this.draggedElement && target !== this.placeholder) {
            target.classList.add('drag-over');
            
            // Вставляем placeholder перед целевым элементом
            if (this.placeholder && !this.placeholder.parentNode) {
                const dashboard = document.querySelector('.dashboard');
                const rect = target.getBoundingClientRect();
                const mouseY = e.clientY;
                
                if (mouseY < rect.top + rect.height / 2) {
                    dashboard.insertBefore(this.placeholder, target);
                } else {
                    dashboard.insertBefore(this.placeholder, target.nextSibling);
                }
            }
        }
    }

    handleDragLeave(e) {
        const target = e.target.closest('.widget');
        if (target && target !== this.draggedElement) {
            // Проверяем, не вошли ли мы в дочерний элемент
            if (!target.contains(e.relatedTarget)) {
                target.classList.remove('drag-over');
            }
        }
    }

    handleDrop(e) {
        e.preventDefault();
        
        const target = e.target.closest('.widget');
        if (target && this.draggedElement && target !== this.draggedElement) {
            // Убираем визуальные эффекты
            target.classList.remove('drag-over');
            
            // Меняем виджеты местами
            this.swapWidgets(this.draggedElement, target);
            
            // Сохраняем новую позицию
            this.savePositions();
        }
        
        // Убираем placeholder
        if (this.placeholder && this.placeholder.parentNode) {
            this.placeholder.parentNode.removeChild(this.placeholder);
        }
    }

    swapWidgets(widget1, widget2) {
        const dashboard = document.querySelector('.dashboard');
        const widgets = Array.from(dashboard.children);
        
        const index1 = widgets.indexOf(widget1);
        const index2 = widgets.indexOf(widget2);
        
        if (index1 < index2) {
            dashboard.insertBefore(widget1, widget2.nextSibling);
        } else {
            dashboard.insertBefore(widget1, widget2);
        }
        
        // Анимация перестановки
        this.animateSwap(widget1, widget2);
    }

    animateSwap(widget1, widget2) {
        // Добавляем анимацию
        widget1.style.transform = 'scale(1.05)';
        widget2.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            widget1.style.transform = '';
            widget2.style.transform = '';
        }, 300);
    }

    savePositions() {
        const dashboard = document.querySelector('.dashboard');
        const widgets = Array.from(dashboard.children);
        const positions = widgets.map(widget => widget.dataset.type);
        
        localStorage.setItem('widgetPositions', JSON.stringify(positions));
        console.log('Позиции сохранены:', positions);
    }

    restorePositions() {
        const saved = localStorage.getItem('widgetPositions');
        if (saved) {
            try {
                const positions = JSON.parse(saved);
                const dashboard = document.querySelector('.dashboard');
                const widgets = Array.from(dashboard.children);
                
                // Создаем карту виджетов по типам
                const widgetMap = {};
                widgets.forEach(widget => {
                    widgetMap[widget.dataset.type] = widget;
                });
                
                // Переставляем виджеты согласно сохраненным позициям
                positions.forEach((type, index) => {
                    const widget = widgetMap[type];
                    if (widget && dashboard.children[index] !== widget) {
                        dashboard.appendChild(widget);
                    }
                });
                
                console.log('Позиции восстановлены');
            } catch (error) {
                console.error('Ошибка восстановления позиций:', error);
            }
        }
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    new DragManager();
});