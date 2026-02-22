# Weather App

A React + TypeScript weather dashboard with:

- Interactive map (click to update location)
- City search with geocoding
- Current weather card
- Forecast card
- Optional OpenWeather map overlays (clouds, precipitation, pressure, wind, temperature)

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4 + shadcn UI
- TanStack Query (React Query)
- React Leaflet + Leaflet
- Zod (API response validation)
- ESLint

## Prerequisites

- Node.js 20+ (recommended)
- npm
- OpenWeather API key

## Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` in the project root and set your key:

```bash
VITE_API_KEY="your_openweather_api_key"
```

Note: `VITE_` variables are exposed to the browser in Vite apps.

## Run Locally

```bash
npm run dev
```

Then open the local URL shown in terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Type-check and create production build in `dist/`
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

- `src/components/Map.tsx` - Leaflet map, click-to-set location, map layer controls
- `src/components/SearchBar.tsx` - Location search and selection
- `src/components/cards/CurrentWeather.tsx` - Current weather UI
- `src/components/cards/ForecastWeather.tsx` - Forecast UI
- `src/api.ts` - OpenWeather API calls
- `src/schemas/weatherSchema.ts` - Zod schemas for API payload validation
- `src/context/LocationContext.tsx` - Shared selected coordinates state

## Data Source

- OpenWeather APIs:
  - Current weather
  - Forecast
  - Geocoding
  - Weather tile overlays
