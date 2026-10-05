<div align="center">

  ![Capsule Header](https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,100:06B6D4&height=180&section=header&text=Briefly%20News%20Aggregator&fontSize=42&fontColor=ffffff&animation=twinkling&desc=Multi-Source%20React.js%20and%20Tailwind%20CSS%20News%20Platform)

  <br/>

  [![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![React Router](https://img.shields.io/badge/React_Router-6.28-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
  [![Vitest](https://img.shields.io/badge/Vitest-3.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

<br/>

## 📰 Overview

**Briefly** is a modern, real-time news aggregator web application engineered with **React 18**, **Tailwind CSS v4**, and **Vite**. It aggregates live news feeds across global publishers (**The Guardian**, **BBC News**, and **Hacker News**), delivering an uninterrupted reading experience with in-app distraction-free reader mode, text-to-speech narration, topic personalization, keyboard navigation, and offline caching.

---

## 🌐 Integrated Data Sources

- 📰 **The Guardian Open Platform**: Live world news and editorial coverage (supports custom API keys via `VITE_GUARDIAN_KEY`).
- 🇬🇧 **BBC News RSS Feeds**: Reliable category feeds ensuring continuous news availability.
- ⚡ **Hacker News (Algolia API)**: Technology headlines, developer discussions, and top stories integrated into category views.

---

## ✨ Key Features

- 📰 **Multi-Source Aggregation**: Real-time unified news stream combining Guardian, BBC, and Hacker News with source filter toggles.
- 📖 **In-App Distraction-Free Reader**: Clean reader view with text size adjustments, estimated reading times, and read history tracking.
- 🎧 **Text-to-Speech ("Listen Mode")**: Built-in speech synthesis engine to narrate articles aloud.
- ♾️ **Infinite Scroll & Smart Search**: Infinite feed pagination combined with debounced search and query history suggestions.
- 📌 **Personalized "For You" Feed**: Follow custom topics and generate a tailored news timeline.
- 🏷️ **Trending Topics Bar**: Dynamic headline keyword parser extracting real-time trending tags.
- ⌨️ **Power User Hotkeys**: Press `?` to open the keyboard shortcuts dialog for fast keyboard-driven navigation (`j`/`k` scroll, `b` bookmark).
- 💾 **Offline Fallback & Response Cache**: In-memory API caching with offline status indicators and fallback mechanisms.
- 🌙 **Modern UX & Themes**: Light, Dark, and System theme persistence, Grid vs. List layout toggling, bookmarks, and lazy-loaded routes (`Suspense`).

---

## 🛠️ Project Structure

```
News Aggregator/
├── public/                 # Static assets & favicon
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ArticleCard.jsx     # Article preview card with source badge & bookmark toggle
│   │   ├── ArticleReader.jsx   # In-app full reader modal with text size & speech controls
│   │   ├── CategoryTabs.jsx    # Category filter pills (World, Tech, Business, Science, etc.)
│   │   ├── Navbar.jsx          # Header navigation, search toggle, layout & theme switches
│   │   ├── OfflineBanner.jsx   # Connection status banner
│   │   ├── SearchBox.jsx       # Debounced search bar & recent query history
│   │   ├── ShortcutsDialog.jsx # Keyboard hotkeys reference modal
│   │   ├── SourceFilter.jsx    # Publisher filter dropdown
│   │   ├── StatusMessage.jsx   # Loading, empty, and error feedback indicators
│   │   └── TrendingBar.jsx     # Extracted trending topic tags
│   ├── context/            # Application state contexts
│   │   ├── LibraryContext.jsx  # Bookmarks & reading history state
│   │   ├── PrefsContext.jsx    # Layout view, font size & theme preferences
│   │   └── ReaderContext.jsx   # Active article reader modal state
│   ├── hooks/              # Custom React hooks
│   │   ├── useDebounce.js      # Search query debounce hook
│   │   ├── useHotkeys.js       # Keyboard shortcuts event listener
│   │   ├── useInfiniteFeed.js  # Paginated infinite scroll feed manager
│   │   ├── useLocalStorage.js  # LocalStorage persistence hook
│   │   ├── useOnlineStatus.js  # Network online / offline state listener
│   │   └── useSpeech.js        # Text-to-speech synthesis controller
│   ├── pages/              # Application route pages
│   │   ├── Bookmarks.jsx       # Saved articles collection
│   │   ├── Feed.jsx            # Primary aggregated news feed view
│   │   ├── History.jsx         # Recently read articles history
│   │   └── Topics.jsx          # Followed topics & personalized timeline manager
│   ├── services/           # Data provider services
│   │   ├── bbc.js              # BBC News RSS API client
│   │   ├── guardian.js         # The Guardian Open Platform API client
│   │   ├── hackernews.js       # Hacker News Algolia API client
│   │   └── newsService.js      # Unified multi-source news aggregator orchestrator
│   ├── utils/              # Helper utilities
│   │   ├── cache.js            # In-memory API response cache
│   │   ├── news.test.js        # Unit test suite for article normalization
│   │   └── text.js             # Read time estimator & text cleaning helpers
│   ├── App.jsx             # Route definitions & layout structure
│   ├── constants.js        # Category definitions & fallback configurations
│   ├── index.css           # Global Tailwind CSS styles
│   └── main.jsx            # Application entry point
├── package.json            # Dependencies & script configurations
├── vite.config.js          # Vite build options
└── README.md               # Documentation & overview
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your machine.

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/AahelGupta/News-Aggregator.git

# Navigate into the project directory
cd News-Aggregator

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 🧪 Unit Testing & Production Build

```bash
# Run unit tests with Vitest
npm test

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
