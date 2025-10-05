# 🌤️ NASA Weather Probability Analysis

<p align="center">
  <img src="A_README.md_file_for_a_React_Native_mobile_applica.png" alt="NASA Banner" width="100%">
</p>

<p align="center">
  Leveraging NASA’s open weather datasets for probabilistic forecasting and decision support.
  <br/>
  <a href="https://github.com/yashasrnair/nasa"><strong>Explore the docs »</strong></a>
  <br/>
  <a href="#">View Demo</a> ·
  <a href="https://github.com/yashasrnair/nasa/issues">Report Bug</a> ·
  <a href="https://github.com/yashasrnair/nasa/pulls">Request Feature</a>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232a?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/NASA-API-blue?style=for-the-badge&logo=nasa&logoColor=white"/>
  <img src="https://img.shields.io/github/license/yashasrnair/nasa?style=for-the-badge"/>
</p>

---

## 🚀 Project Overview

**NASA Weather Probability Analysis** is a mobile application that uses NASA’s historical weather data (via the NASA POWER API) to deliver probabilistic weather forecasts.  
The app helps users plan outdoor activities, agricultural operations, and travel schedules based on the likelihood of extreme weather events.

Unlike traditional apps that show deterministic weather predictions, this app provides probability-based insights using decades of NASA climate data and modern visualization.

---

## 📱 App Screenshots

<p align="center">
  <img src="assets/screens/home.png" alt="Home Screen" width="30%">
  <img src="assets/screens/query.png" alt="Query Screen" width="30%">
  <img src="assets/screens/results.png" alt="Results Screen" width="30%">
</p>

---

## 🧩 Resources & Tools Used

### 🌍 Data & APIs
- **NASA POWER API** — Historical weather & climate data  
- **Satellite Observations** — Earth observation datasets  
- **Global Climate Archives** — 30+ years of geospatially indexed weather data  

### 🧠 Technologies
- **Frontend:** React Native (Expo Framework)  
- **Language:** TypeScript  
- **Routing:** Expo Router  
- **Maps:** React Native Maps (Google Maps Provider)  
- **Charts:** React Native Chart Kit  
- **Storage:** Expo FileSystem  
- **Networking:** Axios  
- **UI Framework:** Custom Theming + Context API  
- **Build Tools:** Expo CLI, EAS Build  

---

## ✨ Features

- 🌍 Location-based analysis (interactive world map, GPS auto-detection)  
- 📊 Weather probability insights (heat, cold, wind, rain, humidity)  
- 📈 Historical data visualization with color-coded charts  
- 📤 Exportable results (CSV and social sharing)  
- 🌑 Offline & dark mode UX  
- 🛰️ Built on real NASA POWER API data  

---

## 🎯 Challenge Solution

This project addresses the NASA Space Apps Challenge by:
- Translating raw NASA data into understandable probabilities  
- Promoting data-driven outdoor decision-making  
- Educating users on climate variability  
- Making NASA’s data publicly accessible through a mobile interface  

---

## 🧠 Creative & Technical Considerations

**Creative Aspects**
- Probability-based weather modeling  
- Educational NASA data integration  
- User-friendly data storytelling via charts  
- Multi-condition analysis dashboard  

**Technical Focus**
- Cross-platform React Native architecture  
- Graceful API error fallback & offline caching  
- Secure NASA API calls  
- Optimized battery & data usage  

---

## 🏗️ System Architecture

```
app/
├── (tabs)/
│   ├── index.tsx          # Home screen
│   ├── explore.tsx        # Query builder screen
│   └── _layout.tsx        # Tab navigation
├── modal.tsx              # About NASA data
├── query-builder.tsx      # Modal query builder
├── results.tsx            # Probability results & charts
components/
├── ui/                    # Reusable themed UI elements
├── location-picker.tsx    # Map location selector
├── weather-chart.tsx      # Data visualization component
contexts/
├── ThemeContext.tsx       # Dark/light theme context
services/
└── nasa-api.tsx           # NASA API integration logic
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v16+
- npm or yarn
- Expo CLI

### Setup
```bash
git clone https://github.com/yashasrnair/nasa.git
cd nasa
npm install
npx expo start
```

### Run on Device
```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

### Build for Production
```bash
npx expo prebuild
npx eas build --platform android
npx eas build --platform ios
```

---

## 📈 Impact & Benefits

- Improved safety for outdoor planning  
- Reduced weather-related risks  
- Encourages understanding of climate data  
- Accessible scientific insight for everyone  

---

## 🔮 Future Enhancements

- Real-time alert system  
- 30-day extended forecasts  
- ML-based trend prediction  
- IoT integration for localized sensor data  
- Multi-language support  

---

## 🤝 Contribution

We welcome contributions!  
Fork → Modify → PR 💫

```bash
git fork https://github.com/yashasrnair/nasa.git
git checkout -b feature/amazing-idea
git commit -m "Add amazing new feature"
git push origin feature/amazing-idea
```

---

## 📜 License
This project is licensed under the **MIT License** — see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **NASA POWER API** – For providing global weather datasets  
- **Expo & React Native** – For an exceptional mobile dev experience  
- **NASA Space Apps Challenge** – For inspiring open innovation  
- Built with ❤️ by [@yashasrnair](https://github.com/yashasrnair)

---

<p align="center">
  <b>Transforming NASA weather data into actionable insights for a safer, smarter world 🌍</b>
</p>
