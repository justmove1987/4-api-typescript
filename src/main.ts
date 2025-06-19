import './styles.scss';

async function fetchJoke(): Promise<void> {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) throw new Error('Error al obtener la broma');

    const data: { joke: string } = await response.json();

    renderJoke(data.joke);
  } catch (error) {
    console.error(error);
    renderJoke('😢 No se pudo cargar una broma. Intenta de nuevo.');
  }
}

function renderJoke(joke: string): void {
  const container = document.getElementById('joke-container');
  if (!container) return;

  container.innerHTML = `<p>${joke}</p>`;
}

const btn = document.getElementById('joke-btn');
btn?.addEventListener('click', fetchJoke);

// Opcional: mostrar una broma al cargar
fetchJoke();
