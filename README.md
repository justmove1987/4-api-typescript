# 🌐 Random Joke Web App

A modern and dynamic web application that displays random jokes from multiple sources, allows users to rate them, and shows current weather conditions using icons. Built with Vite, TypeScript, and SCSS.

## 🚀 Features

- Displays random jokes from:
  - [icanhazdadjoke.com](https://icanhazdadjoke.com/)
  - [api.chucknorris.io](https://api.chucknorris.io/)
- Automatically alternates between joke sources
- Users can rate jokes from 1 (😐) to 3 (😂)
- Votes are modifiable before fetching a new joke
- All joke ratings are stored in an array (`reportJokes`) with joke text, score, and ISO date
- Weather is displayed as an icon (e.g., ☀️, 🌧️) with temperature via [Open-Meteo API](https://open-meteo.com/)
- Clean UI styled with SCSS: background image, emoji buttons, visual shapes using `clip-path`
- Built with Vite + TypeScript for fast development

## 🧰 Technologies

- Vite
- TypeScript
- SCSS
- Fetch API
- icanhazdadjoke API
- Chuck Norris API
- Open-Meteo API

## 📁 Structure

- `/public/index.html` → Base HTML
- `/src/main.ts` → Core app logic (fetch, vote, render)
- `/src/styles.scss` → SCSS styling
- `/src/assets/background.jpg` → Background image

## 🛠️ Setup

```bash
git clone https://github.com/justmove1987/4-api-typescript.git
cd 4-api-typescript
npm install
npm run dev
```

## 🛠️ Screenshoots

![alt text](assets/image.png)

![alt text](assets/image-1.png)
