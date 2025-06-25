import './styles.scss';

interface JokeEntry {
  joke: string;
  score: number;
  date: string;
}

let currentJoke = '';
let selectedScore: number | null = null;
const reportJokes: JokeEntry[] = [];

let lastUsedSource = 0; // 0 = icanhaz, 1 = chuck

const blobClasses = ['shape-1', 'shape-2', 'shape-3', 'shape-4', 'shape-5', 'shape-6', 'shape-7'];

function getRandomBlobClass(): string {
  const index = Math.floor(Math.random() * blobClasses.length);
  return blobClasses[index];
}

async function fetchRandomJoke(): Promise<void> {
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
  } catch (err) {
    renderJoke('😢 Error loading joke.');
  }
}

async function fetchIcanhaz(): Promise<string> {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' }
  });
  const data = await res.json();
  return data.joke;
}

async function fetchChuckNorris(): Promise<string> {
  const res = await fetch('https://api.chucknorris.io/jokes/random');
  const data = await res.json();
  return data.value;
}

function renderJoke(joke: string): void {
  const block = document.querySelector('.block-container') as HTMLElement;
  const jokeContainer = document.getElementById('joke-container');
  if (!block || !jokeContainer) return;

  // Assignar forma blob al contenidor sencer
  block.className = 'block-container joke-shape';
  block.classList.add(getRandomBlobClass());

  // Mostrar acudit i botons
  jokeContainer.innerHTML = `
    <p>${joke}</p>
    <div id="score-buttons">
      <button data-score="1">😐</button>
      <button data-score="2">🙂</button>
      <button data-score="3">😂</button>
    </div>
  `;

  const buttons = jokeContainer.querySelectorAll<HTMLButtonElement>('button[data-score]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedScore = parseInt(btn.dataset.score!);
    });
  });
}

function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if ([1, 2, 3].includes(code)) return '🌤️';
  if ([45, 48].includes(code)) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 86) return '🌧️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '❓';
}

async function fetchWeather(): Promise<void> {
  const lat = 41.39, lon = 2.15;
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await res.json();
    const weather = data.current_weather;

    const container = document.getElementById('weather-container');
    if (container) {
      const icon = getWeatherIcon(weather.weathercode);
      container.innerHTML = `<p>${icon} | ${weather.temperature}°C</p>`;
    }
  } catch (error) {
    console.error('Weather error:', error);
  }
}

document.getElementById('joke-btn')?.addEventListener('click', fetchRandomJoke);
fetchWeather();
fetchRandomJoke();
