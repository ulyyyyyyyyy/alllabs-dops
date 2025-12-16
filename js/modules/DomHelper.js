// js/modules/DomHelper.js
export class DomHelper {
    static createElement(tag, classes = [], attributes = {}) {
        const element = document.createElement(tag);
        
        if (classes.length) {
            element.classList.add(...classes);
        }
        
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        
        return element;
    }

    static showElement(element) {
        element.style.display = 'block';
    }

    static hideElement(element) {
        element.style.display = 'none';
    }

    static toggleElement(element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }

    static addAnimation(element, animationClass) {
        element.classList.add(animationClass);
        element.addEventListener('animationend', () => {
            element.classList.remove(animationClass);
        }, { once: true });
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}