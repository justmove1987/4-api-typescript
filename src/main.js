import './styles.scss';
const ICANHAZ_URL = import.meta.env.VITE_ICANHAZ_URL;
const CHUCKNORRIS_URL = import.meta.env.VITE_CHUCKNORRIS_URL;
const WEATHER_URL = import.meta.env.VITE_WEATHER_URL;
let currentJoke = '';
let selectedScore = null;
const reportJokes = [];
let lastUsedSource = 0; // 0 = icanhaz, 1 = chuck
const blobClasses = ['shape-1', 'shape-2', 'shape-3', 'shape-4', 'shape-5', 'shape-6', 'shape-7'];
function getRandomBlobClass() {
    const index = Math.floor(Math.random() * blobClasses.length);
    return blobClasses[index];
}
async function fetchRandomJoke() {
    if (currentJoke && selectedScore !== null) {
        reportJokes.push({
            joke: currentJoke,
            score: selectedScore,
            date: new Date().toISOString()
        });
        console.log('📊 reportJokes:', reportJokes);
    }
    selectedScore = null;
    const fetchFunc = lastUsedSource === 0 ? fetchChuckNorris : fetchIcanhaz;
    lastUsedSource = 1 - lastUsedSource;
    try {
        const joke = await fetchFunc();
        currentJoke = joke;
        renderJoke(joke);
    }
    catch (err) {
        renderJoke('😢 Error loading joke.');
    }
}
async function fetchIcanhaz() {
    const res = await fetch(ICANHAZ_URL, {
        headers: { Accept: 'application/json' }
    });
    const data = await res.json();
    return data.joke;
}
async function fetchChuckNorris() {
    const res = await fetch(CHUCKNORRIS_URL);
    const data = await res.json();
    return data.value;
}
function renderJoke(joke) {
    const block = document.querySelector('.block-container');
    const jokeContainer = document.getElementById('joke-container');
    if (!block || !jokeContainer)
        return;
    block.className = 'block-container joke-shape';
    block.classList.add(getRandomBlobClass());
    jokeContainer.innerHTML = `
    <p>${joke}</p>
    <div id="score-buttons">
      <button data-score="1">😐</button>
      <button data-score="2">🙂</button>
      <button data-score="3">😂</button>
    </div>
  `;
    const buttons = jokeContainer.querySelectorAll('button[data-score]');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedScore = parseInt(btn.dataset.score);
        });
    });
}
function getWeatherIcon(code) {
    if (code === 0)
        return '☀️';
    if ([1, 2, 3].includes(code))
        return '🌤️';
    if ([45, 48].includes(code))
        return '🌫️';
    if (code >= 51 && code <= 57)
        return '🌦️';
    if (code >= 61 && code <= 67)
        return '🌧️';
    if (code >= 71 && code <= 77)
        return '❄️';
    if (code >= 80 && code <= 86)
        return '🌧️';
    if (code >= 95 && code <= 99)
        return '⛈️';
    return '❓';
}
async function fetchWeather() {
    const lat = 41.39, lon = 2.15;
    try {
        const res = await fetch(`${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        const weather = data.current_weather;
        const container = document.getElementById('weather-container');
        if (container) {
            const icon = getWeatherIcon(weather.weathercode);
            container.innerHTML = `<p>${icon} | ${weather.temperature}°C</p>`;
        }
    }
    catch (error) {
        console.error('Weather error:', error);
    }
}
document.getElementById('joke-btn')?.addEventListener('click', fetchRandomJoke);
fetchWeather();
fetchRandomJoke();
