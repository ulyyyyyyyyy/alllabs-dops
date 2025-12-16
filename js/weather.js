const WEATHER_API_KEY = '2da0d2e0f27eddddfe94819692bd6c4d';

// Список городов России
const RUSSIAN_CITIES = [
    { name: "Москва", id: "moscow" },
    { name: "Санкт-Петербург", id: "saint-petersburg" },
    { name: "Новосибирск", id: "novosibirsk" },
    { name: "Екатеринбург", id: "yekaterinburg" },
    { name: "Казань", id: "kazan" },
    { name: "Нижний Новгород", id: "nizhny-novgorod" },
    { name: "Челябинск", id: "chelyabinsk" },
    { name: "Самара", id: "samara" },
    { name: "Омск", id: "omsk" },
    { name: "Ростов-на-Дону", id: "rostov-on-don" },
    { name: "Уфа", id: "ufa" },
    { name: "Красноярск", id: "krasnoyarsk" },
    { name: "Воронеж", id: "voronezh" },
    { name: "Пермь", id: "perm" },
    { name: "Волгоград", id: "volgograd" }
];

class WeatherWidget {
    constructor() {
        this.currentCity = this.getSavedCity() || "moscow";
        this.init();
    }

    init() {
        this.renderCitySelector();
        this.loadWeather();
        this.bindEvents();
    }

    getSavedCity() {
        return localStorage.getItem('selectedCity');
    }

    saveCity(city) {
        localStorage.setItem('selectedCity', city);
    }

    renderCitySelector() {
        const element = document.getElementById('weather-content');
        element.innerHTML = `
            <div class="weather-widget">
                <div class="city-selector">
                    <select id="city-select" class="city-select">
                        ${RUSSIAN_CITIES.map(city => 
                            `<option value="${city.id}" ${city.id === this.currentCity ? 'selected' : ''}>
                                ${city.name}
                            </option>`
                        ).join('')}
                    </select>
                    <button onclick="weatherWidget.loadWeather()" class="refresh-btn">🔄</button>
                </div>
                <div id="weather-data" class="weather-data">
                    <div class="loading">🌤️ Загрузка погоды...</div>
                </div>
            </div>
        `;
    }

    async loadWeather() {
        const weatherDataElement = document.getElementById('weather-data');
        const citySelect = document.getElementById('city-select');
        
        this.currentCity = citySelect.value;
        this.saveCity(this.currentCity);
        
        const city = RUSSIAN_CITIES.find(c => c.id === this.currentCity);
        
        weatherDataElement.innerHTML = '<div class="loading">🌤️ Загрузка погоды для ' + city.name + '...</div>';

        try {
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city.name},RU&units=metric&appid=${WEATHER_API_KEY}&lang=ru`
            );
            
            if (!weatherResponse.ok) {
                throw new Error(`Ошибка погоды: ${weatherResponse.status}`);
            }
            
            const weatherData = await weatherResponse.json();
            const moonPhase = this.getMoonPhase();
            
            weatherDataElement.innerHTML = this.createWeatherDisplay(weatherData, moonPhase, city.name);
            
        } catch (error) {
            console.error('Ошибка загрузки погоды:', error);
            weatherDataElement.innerHTML = this.createErrorWeather();
        }
    }

    getMoonPhase() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        
        const moonDay = dayOfYear % 29.53;
        
        if (moonDay < 1) return { phase: "Новолуние", emoji: "🌑" };
        if (moonDay < 7) return { phase: "Растущий серп", emoji: "🌒" };
        if (moonDay < 8) return { phase: "Первая четверть", emoji: "🌓" };
        if (moonDay < 14) return { phase: "Растущая луна", emoji: "🌔" };
        if (moonDay < 15) return { phase: "Полнолуние", emoji: "🌕" };
        if (moonDay < 22) return { phase: "Убывающая луна", emoji: "🌖" };
        if (moonDay < 23) return { phase: "Последняя четверть", emoji: "🌗" };
        return { phase: "Убывающий серп", emoji: "🌘" };
    }

    createWeatherDisplay(weatherData, moonPhase, cityName) {
        const temp = Math.round(weatherData.main.temp);
        const feelsLike = Math.round(weatherData.main.feels_like);
        const description = weatherData.weather[0].description;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const pressure = Math.round(weatherData.main.pressure * 0.75);
        const icon = weatherData.weather[0].icon;

        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('ru-RU', { 
            hour: '2-digit', minute: '2-digit' 
        });
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('ru-RU', { 
            hour: '2-digit', minute: '2-digit' 
        });

        return `
            <div class="weather-display">
                <div class="city-header">
                    <h4>${cityName}</h4>
                </div>
                <div class="weather-main">
                    <div class="weather-temp">${temp}°</div>
                    <div class="weather-icon">${this.getWeatherIcon(icon)}</div>
                </div>
                <div class="weather-description">${description}</div>
                
                <div class="moon-section">
                    <div class="moon-header">
                        <span class="moon-emoji">${moonPhase.emoji}</span>
                        <span class="moon-phase">${moonPhase.phase}</span>
                    </div>
                </div>
                
                <div class="weather-details">
                    <div class="weather-detail">
                        <div class="detail-icon">🌡️</div>
                        <div class="detail-value">${feelsLike}°</div>
                        <div class="detail-label">Ощущается</div>
                    </div>
                    <div class="weather-detail">
                        <div class="detail-icon">💧</div>
                        <div class="detail-value">${humidity}%</div>
                        <div class="detail-label">Влажность</div>
                    </div>
                    <div class="weather-detail">
                        <div class="detail-icon">💨</div>
                        <div class="detail-value">${windSpeed}</div>
                        <div class="detail-label">Ветер м/с</div>
                    </div>
                    <div class="weather-detail">
                        <div class="detail-icon">📊</div>
                        <div class="detail-value">${pressure}</div>
                        <div class="detail-label">Давление</div>
                    </div>
                </div>
                
                <div class="sun-times">
                    <div class="sun-time">
                        <span class="sun-emoji">🌅</span>
                        <span class="sun-text">Восход: ${sunrise}</span>
                    </div>
                    <div class="sun-time">
                        <span class="sun-emoji">🌇</span>
                        <span class="sun-text">Закат: ${sunset}</span>
                    </div>
                </div>
            </div>
        `;
    }

    getWeatherIcon(weatherCode) {
        const icons = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌦️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return icons[weatherCode] || '🌈';
    }

    createErrorWeather() {
        return `
            <div class="weather-error">
                <div style="text-align: center;">
                    <div style="font-size: 3rem;">😕</div>
                    <div style="color: #e74c3c; margin-bottom: 10px;">Не удалось загрузить погоду</div>
                    <button onclick="weatherWidget.loadWeather()" class="retry-btn">
                        🔄 Попробовать снова
                    </button>
                </div>
            </div>
        `;
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            const citySelect = document.getElementById('city-select');
            if (citySelect) {
                citySelect.addEventListener('change', () => {
                    this.loadWeather();
                });
            }
        });
    }
}

// Создаем глобальный экземпляр
const weatherWidget = new WeatherWidget();