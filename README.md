# 🌐 Random Joke Web App

A modern and dynamic web application that displays random jokes to users, tracks their reactions, and shows current weather conditions — all within a visually engaging interface.

---

## 🚀 Features

- 🎭 **Random Jokes** from two different APIs:
  - [icanhazdadjoke.com](https://icanhazdadjoke.com/)
  - [api.chucknorris.io](https://api.chucknorris.io/)
- 🔁 Alternates joke sources automatically to keep content fresh
- 🎯 **User Rating System** (1 = 😐, 2 = 🙂, 3 = 😂)
- 📝 Ratings are saved to a `reportJokes` array with:
  - Joke text
  - Score (1–3)
  - Date (in ISO format)
- ✨ Ratings are not final until user requests the next joke (modifiable)
- ☀️ **Current Weather Info** via [Open-Meteo API](https://open-meteo.com/)
  - Shows temperature and weather condition as an icon (e.g., 🌧️ 18°C)
- 🎨 SCSS styling with:
  - Responsive layout
  - Emoji-based feedback
  - Dynamic visual containers (`clip-path` blobs)
  - Background image and smooth interactions
- ⚡ Built with **Vite** and **TypeScript**

---

## 🧰 Technologies Used

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [icanhazdadjoke API](https://icanhazdadjoke.com/)
- [Chuck Norris API](https://api.chucknorris.io/)
- [Open-Meteo API](https://open-meteo.com/)

---

## 📁 Project Structure

/public
└── index.html # HTML page

/src
├── main.ts # App logic (jokes, voting, weather)
├── styles.scss # SCSS styles
└── assets/
└── background.jpg # Background image

yaml
Copia
Modifica

---

## 🛠️ Installation & Running Locally

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/random-joke-app.git
cd random-joke-app
Install dependencies:

bash
Copia
Modifica
npm install
Start the development server:

bash
Copia
Modifica
npm run dev
Open your browser at:

arduino
Copia
Modifica
http://localhost:5173
📊 Data Tracking
Each time a user rates a joke and requests a new one, the app stores an entry in the reportJokes array, like this:

json
Copia
Modifica
{
  "joke": "Chuck Norris doesn’t read books. He stares them down until he gets the information he wants.",
  "score": 3,
  "date": "2025-06-19T07:45:00.000Z"
}
These are logged in the console and can be expanded to localStorage or server storage.

💡 Future Improvements (Optional)
Save reportJokes to localStorage

Show joke history or user statistics

Add sound effects or animations on vote

Let users choose the joke source manually

Add dark/light mode toggle