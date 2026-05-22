# Muslim Web App

An Arabic and Multi-language Islamic web application built with Vite, React 19, and TypeScript. The application provides comprehensive Islamic services, utilizing modern state management, advanced routing, testing frameworks, and interactive UI components with full right-to-left (RTL) support.

---

## Features

- Display precise prayer times for the current day based on local or selected coordinates.
- Multi-language support (Arabic / English) with dynamic interface translation.
- Interactive map rendering to display and locate the nearest mosques based on user geolocation.
- Digital publication reader with realistic page-flip animations for reading Islamic texts.
- Dynamic Quran surah browser with multi-reciter selection and playback capabilities.
- Advanced custom audio streaming player with full playback control.
- Real-time responsive design optimized for mobile, tablet, and desktop viewports.
- Non-blocking toast notifications for critical application alerts and prayer reminders.

---

## Tech Stack & Dependencies

### Core Framework & Build Tools
- **React 19 & React-DOM:** Modern UI rendering engine using concurrent features.
- **Vite 6:** Next-generation frontend tooling providing ultra-fast Hot Module Replacement (HMR).
- **TypeScript 6:** Strict syntactical superset of JavaScript ensuring type safety across components.

### Routing & State Management
- **React Router Dom v7:** Declarative client-side routing and layout management.
- **Zustand:** Lightweight, centralized global state management for cross-component data synchronization.

### Internationalization & Localization
- **i18next & react-i18next:** Comprehensive translation framework handling dynamic language switching and locale data.

### Geospatial & Mapping Components
- **Leaflet & React Leaflet v5:** Mobile-friendly interactive maps for parsing and displaying geographical coordinates of nearby mosques.

### UI Media & Animation
- **React Pageflip:** Stencil-based realistic page-turning simulation component for digital reading.
- **React H5 Audio Player:** Customizable HTML5 audio player wrapper for stable audio streaming.
- **React Hot Toast:** Light, responsive, and animated toast notifications.
- **React Icons:** Icon compilation library.

### Styling & Processors
- **Tailwind CSS v4 & @tailwindcss/postcss:** Utility-first CSS framework coupled with modern PostCSS nesting and compilation.

### Data Fetching & Utilities
- **Axios:** Promise-based HTTP client for consuming external REST APIs.
- **Moment & Moment Timezone:** Robust parsing, validation, and manipulation of calendar dates and dynamic geographical timezones.

---

## Development & Test Suite

### Testing Environment
- **Vitest:** Blazing fast unit and integration testing framework native to Vite.
- **React Testing Library & Jest DOM:** Core utilities for testing virtual DOM states and user event interactions.
- **Vitest Mock Axios:** Interceptor library designed to isolate API integration layers by mocking server responses.

### Code Quality Control
- **ESLint v9:** Pluggable linting utility enforcing strict TypeScript and React Hooks development patterns.

---

## API References

### Prayer Times Integration
- **Aladhan API:** Consumed to fetch chronological prayer timings based on specific municipal boundaries or geolocation coordinates.
- Endpoints utilize standard dynamic routing: `https://api.aladhan.com/v1/timingsByCity`

### Quranic Text & Audio Pipelines
- **Al Quran Cloud API:** Metadata engine for retrieving structured surah information, verse text, and translations.
- **The Quran Project:** Cloud infrastructure hosting CDN-delivered audio streams for multiple reciters.