// js/managers/DragManager.js
import { StorageService } from '../modules/StorageService.js';
import { DomHelper } from '../modules/DomHelper.js';
import { STORAGE_KEYS } from '../modules/Constants.js';

export class DragManager {
    constructor() {
        this.draggedElement = null;
        this.placeholder = null;
        this.dashboard = document.querySelector('.dashboard');
        this.init();
    }

    init() {
        this.createStyles();
        this.bindEvents();
        this.restorePositions();
    }

    createStyles() {
        if (document.getElementById('drag-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'drag-styles';
        style.textContent = this.getDragStyles();
        document.head.appendChild(style);
    }

    getDragStyles() {
        return `
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
        `;
    }

    bindEvents() {
        const events = [
            ['dragstart', this.handleDragStart.bind(this)],
            ['dragend', this.handleDragEnd.bind(this)],
            ['dragover', this.handleDragOver.bind(this)],
            ['dragenter', this.handleDragEnter.bind(this)],
            ['dragleave', this.handleDragLeave.bind(this)],
            ['drop', this.handleDrop.bind(this)]
        ];
        
        events.forEach(([event, handler]) => {
            document.addEventListener(event, handler);
        });
    }

    handleDragStart(e) {
        if (!e.target.classList.contains('widget')) return;
        
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        this.createPlaceholder();
        this.setDragData(e);
        
        setTimeout(() => {
            e.target.style.opacity = '0.4';
        }, 0);
    }

    createPlaceholder() {
        this.placeholder = DomHelper.createElement('div', ['widget', 'drag-placeholder']);
    }

    setDragData(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.draggedElement.dataset.type);
    }

    handleDragEnd() {
        if (!this.draggedElement) return;
        
        this.cleanupDragState();
        this.removePlaceholder();
        this.removeDragOverClasses();
        
        this.draggedElement = null;
        this.placeholder = null;
    }

    cleanupDragState() {
        this.draggedElement.classList.remove('dragging');
        this.draggedElement.style.opacity = '1';
        this.draggedElement.style.transform = '';
    }

    removePlaceholder() {
        if (this.placeholder?.parentNode) {
            this.placeholder.parentNode.removeChild(this.placeholder);
        }
    }

    removeDragOverClasses() {
        document.querySelectorAll('.widget.drag-over').forEach(widget => {
            widget.classList.remove('drag-over');
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    handleDragEnter(e) {
        e.preventDefault();
        const target = e.target.closest('.widget');
        
        if (this.isValidDragTarget(target)) {
            target.classList.add('drag-over');
            this.insertPlaceholder(target, e.clientY);
        }
    }

    isValidDragTarget(target) {
        return target && 
               target !== this.draggedElement && 
               target !== this.placeholder;
    }

    insertPlaceholder(target, mouseY) {
        if (!this.placeholder || this.placeholder.parentNode) return;
        
        const rect = target.getBoundingClientRect();
        const insertBefore = mouseY < rect.top + rect.height / 2;
        
        if (insertBefore) {
            this.dashboard.insertBefore(this.placeholder, target);
        } else {
            this.dashboard.insertBefore(this.placeholder, target.nextSibling);
        }
    }

    handleDragLeave(e) {
        const target = e.target.closest('.widget');
        if (target && !target.contains(e.relatedTarget)) {
            target.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        
        const target = e.target.closest('.widget');
        if (this.isValidDropTarget(target)) {
            this.performDrop(target);
        }
        
        this.removePlaceholder();
    }

    isValidDropTarget(target) {
        return target && 
               this.draggedElement && 
               target !== this.draggedElement;
    }

    performDrop(target) {
        target.classList.remove('drag-over');
        this.swapWidgets(this.draggedElement, target);
        this.savePositions();
    }

    swapWidgets(widget1, widget2) {
        const widgets = Array.from(this.dashboard.children);
        const index1 = widgets.indexOf(widget1);
        const index2 = widgets.indexOf(widget2);
        
        if (index1 < index2) {
            this.dashboard.insertBefore(widget1, widget2.nextSibling);
        } else {
            this.dashboard.insertBefore(widget1, widget2);
        }
        
        this.animateSwap(widget1, widget2);
    }

    animateSwap(widget1, widget2) {
        widget1.style.transform = 'scale(1.05)';
        widget2.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            widget1.style.transform = '';
            widget2.style.transform = '';
        }, 300);
    }

    savePositions() {
        const widgets = Array.from(this.dashboard.children);
        const positions = widgets
            .filter(widget => widget.classList.contains('widget'))
            .map(widget => widget.dataset.type);
        
        StorageService.set(STORAGE_KEYS.WIDGET_POSITIONS, positions);
    }

    restorePositions() {
        const positions = StorageService.get(STORAGE_KEYS.WIDGET_POSITIONS);
        if (!positions) return;
        
        const widgets = Array.from(this.dashboard.children)
            .filter(widget => widget.classList.contains('widget'));
        
        const widgetMap = this.createWidgetMap(widgets);
        this.reorderWidgets(positions, widgetMap);
    }

    createWidgetMap(widgets) {
        const map = {};
        widgets.forEach(widget => {
            map[widget.dataset.type] = widget;
        });
        return map;
    }

    reorderWidgets(positions, widgetMap) {
        positions.forEach(type => {
            const widget = widgetMap[type];
            if (widget) {
                this.dashboard.appendChild(widget);
            }
        });
    }
}