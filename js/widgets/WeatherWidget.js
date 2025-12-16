// js/widgets/WeatherWidget.js
import { BaseWidget } from './BaseWidget.js';
import { ApiService } from '../modules/ApiService.js';
import { StorageService } from '../modules/StorageService.js';
import { WEATHER_CONFIG, RUSSIAN_CITIES, STORAGE_KEYS, WEATHER_ICONS } from '../modules/Constants.js';

export class WeatherWidget extends BaseWidget {
    constructor() {
        super('weather-content');
        this.currentCity = StorageService.get(STORAGE_KEYS.SELECTED_CITY, 'moscow');
    }

    render() {
        this.container.innerHTML = this.generateWeatherHTML();
    }

    generateWeatherHTML() {
        return `
            <div class="weather-widget">
                <div class="city-selector">
                    <select id="city-select" class="city-select">
                        ${this.generateCityOptions()}
                    </select>
                    <button id="weather-refresh" class="refresh-btn">🔄</button>
                </div>
                <div id="weather-data" class="weather-data">
                    ${this.getLoadingHTML()}
                </div>
            </div>
        `;
    }

    generateCityOptions() {
        return RUSSIAN_CITIES.map(city => 
            `<option value="${city.id}" ${city.id === this.currentCity ? 'selected' : ''}>
                ${city.name}
            </option>`
        ).join('');
    }

    bindEvents() {
        const citySelect = document.getElementById('city-select');
        const refreshBtn = document.getElementById('weather-refresh');

        if (citySelect) {
            citySelect.addEventListener('change', this.handleCityChange.bind(this));
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', this.loadWeather.bind(this));
        }
    }

    handleCityChange(event) {
        this.currentCity = event.target.value;
        StorageService.set(STORAGE_KEYS.SELECTED_CITY, this.currentCity);
        this.loadWeather();
    }

    async loadWeather() {
        const weatherDataElement = document.getElementById('weather-data');
        const city = this.getCurrentCityData();

        if (!weatherDataElement || !city) return;

        try {
            this.showLoading();
            const weatherData = await this.fetchWeatherData(city.name);
            const moonPhase = this.getMoonPhase();
            
            weatherDataElement.innerHTML = this.createWeatherDisplay(weatherData, moonPhase, city.name);
        } catch (error) {
            this.showError('Не удалось загрузить погоду');
        } finally {
            this.hideLoading();
        }
    }

    getCurrentCityData() {
        return RUSSIAN_CITIES.find(c => c.id === this.currentCity);
    }

    async fetchWeatherData(cityName) {
        const url = `${WEATHER_CONFIG.BASE_URL}?q=${cityName},RU&units=${WEATHER_CONFIG.UNITS}&appid=${WEATHER_CONFIG.API_KEY}&lang=${WEATHER_CONFIG.LANG}`;
        return await ApiService.fetchData(url);
    }

    getMoonPhase() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const moonDay = dayOfYear % 29.53;
        
        // Simplified moon phase calculation
        const phases = [
            { phase: "Новолуние", emoji: "🌑" },
            { phase: "Растущий серп", emoji: "🌒" },
            { phase: "Первая четверть", emoji: "🌓" },
            { phase: "Растущая луна", emoji: "🌔" },
            { phase: "Полнолуние", emoji: "🌕" },
            { phase: "Убывающая луна", emoji: "🌖" },
            { phase: "Последняя четверть", emoji: "🌗" },
            { phase: "Убывающий серп", emoji: "🌘" }
        ];
        
        return phases[Math.floor(moonDay / 3.7)] || phases[0];
    }

    createWeatherDisplay(weatherData, moonPhase, cityName) {
        const weather = this.extractWeatherData(weatherData);

        return `
            <div class="weather-display">
                ${this.createWeatherHeader(cityName)}
                ${this.createWeatherMain(weather)}
                ${this.createMoonSection(moonPhase)}
                ${this.createWeatherDetails(weather)}
                ${this.createSunTimes(weather)}
            </div>
        `;
    }

    extractWeatherData(weatherData) {
        return {
            temp: Math.round(weatherData.main.temp),
            feelsLike: Math.round(weatherData.main.feels_like),
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            pressure: Math.round(weatherData.main.pressure * 0.75),
            icon: weatherData.weather[0].icon,
            sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('ru-RU', { 
                hour: '2-digit', minute: '2-digit' 
            }),
            sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('ru-RU', { 
                hour: '2-digit', minute: '2-digit' 
            })
        };
    }

    createWeatherHeader(cityName) {
        return `<div class="city-header"><h4>${cityName}</h4></div>`;
    }

    createWeatherMain(weather) {
        return `
            <div class="weather-main">
                <div class="weather-temp">${weather.temp}°</div>
                <div class="weather-icon">${WEATHER_ICONS[weather.icon] || '🌈'}</div>
            </div>
            <div class="weather-description">${weather.description}</div>
        `;
    }

    createMoonSection(moonPhase) {
        return `
            <div class="moon-section">
                <div class="moon-header">
                    <span class="moon-emoji">${moonPhase.emoji}</span>
                    <span class="moon-phase">${moonPhase.phase}</span>
                </div>
            </div>
        `;
    }

    createWeatherDetails(weather) {
        return `
            <div class="weather-details">
                <div class="weather-detail">
                    <div class="detail-icon">🌡️</div>
                    <div class="detail-value">${weather.feelsLike}°</div>
                    <div class="detail-label">Ощущается</div>
                </div>
                <div class="weather-detail">
                    <div class="detail-icon">💧</div>
                    <div class="detail-value">${weather.humidity}%</div>
                    <div class="detail-label">Влажность</div>
                </div>
                <div class="weather-detail">
                    <div class="detail-icon">💨</div>
                    <div class="detail-value">${weather.windSpeed}</div>
                    <div class="detail-label">Ветер м/с</div>
                </div>
                <div class="weather-detail">
                    <div class="detail-icon">📊</div>
                    <div class="detail-value">${weather.pressure}</div>
                    <div class="detail-label">Давление</div>
                </div>
            </div>
        `;
    }

    createSunTimes(weather) {
        return `
            <div class="sun-times">
                <div class="sun-time">
                    <span class="sun-emoji">🌅</span>
                    <span class="sun-text">Восход: ${weather.sunrise}</span>
                </div>
                <div class="sun-time">
                    <span class="sun-emoji">🌇</span>
                    <span class="sun-text">Закат: ${weather.sunset}</span>
                </div>
            </div>
        `;
    }
}