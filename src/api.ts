import { CurrentWeatherSchema, ForecastWeatherSchema } from "./schemas/weatherSchema"

const API_KEY = import.meta.env.VITE_API_KEY

export type GeoResult = {
    name: string
    country: string
    state?: string
    lat: number
    lon: number
}

export async function getCurrentWeather({ lat, lon }: { lat: number, lon: number }) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data: unknown = await res.json();

    if (!res.ok) {
        const message =
            typeof data === "object" &&
                data !== null &&
                "message" in data &&
                typeof (data as { message: unknown }).message === "string"
                ? (data as { message: string }).message
                : "Current weather request failed";
        throw new Error(message);
    }

    const parsed = CurrentWeatherSchema.safeParse(data);

    if (!parsed.success) {
        console.error("Zod error:", parsed.error);
        console.error("Raw data:", data);
        throw new Error("Weather validation failed");
    }

    return parsed.data;
}

export async function getForecastWeather({ lat, lon }: { lat: number, lon: number }) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json()

    const parsed = ForecastWeatherSchema.safeParse(data);

    if (!parsed.success) {
        console.error("Zod error:", parsed.error);
        console.error("Raw data:", data);
        throw new Error("Forecast weather validation failed");
    }

    return parsed.data
}

export async function searchLocations(query: string, limit = 5): Promise<GeoResult[]> {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        return [];
    }

    if (!API_KEY) {
        throw new Error("Missing OpenWeather API key");
    }

    const cappedLimit = Math.min(Math.max(limit, 1), 5);

    const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(trimmedQuery)}&limit=${cappedLimit}&appid=${API_KEY}`
    );

    if (!res.ok) {
        throw new Error("Location search failed");
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data)) {
        throw new Error("Unexpected geocoding response");
    }

    return data
        .filter(
            (item): item is GeoResult =>
                typeof item === "object" &&
                item !== null &&
                typeof (item as GeoResult).name === "string" &&
                typeof (item as GeoResult).country === "string" &&
                typeof (item as GeoResult).lat === "number" &&
                typeof (item as GeoResult).lon === "number"
        )
        .map((item) => ({
            name: item.name,
            country: item.country,
            state: item.state,
            lat: item.lat,
            lon: item.lon,
        }));
}
