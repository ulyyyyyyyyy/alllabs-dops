// js/modules/Constants.js
export const WEATHER_CONFIG = {
    API_KEY: '2da0d2e0f27eddddfe94819692bd6c4d',
    BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
    UNITS: 'metric',
    LANG: 'ru'
};

export const DOGS_CONFIG = {
    API_URL: 'https://dog.ceo/api/breeds/image/random'
};

export const STORAGE_KEYS = {
    SELECTED_CITY: 'selectedCity',
    WIDGET_POSITIONS: 'widgetPositions'
};

export const WEATHER_ICONS = {
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

export const RUSSIAN_CITIES = [
    { name: "Москва", id: "moscow" },
    { name: "Санкт-Петербург", id: "saint-petersburg" },
    { name: "Новосибирск", id: "novosibirsk" },
    { name: "Екатеринбург", id: "yekaterinburg" },
    { name: "Казань", id: "kazan" }
];