import { useQuery } from "@tanstack/react-query"
import { getForecastWeather } from "../../api"
import Card from "./Card"
import WeatherIcon from "../WeatherIcon"
import { useLocation } from "../../context/LocationContext"

function formatForecastTime(dt: number, timezoneOffsetSeconds: number) {
    const localTimestamp = (dt + timezoneOffsetSeconds) * 1000;
    return new Intl.DateTimeFormat([], {
        weekday: "short",
        hour: "numeric",
        timeZone: "UTC",
    }).format(new Date(localTimestamp));
}


export default function ForecastWeather() {
    const { coords } = useLocation()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['forecastWeather', coords.lat, coords.lon],
        queryFn: () => getForecastWeather(coords)
    })

    if (isLoading) {
        return <Card title="Forecast">Loading forecast...</Card>;
    }

    if (isError || !data) {
        return <Card title="Forecast">Unable to load forecast.</Card>;
    }

    const items = data.list.slice(0, 8);

    return (
        <Card title='Forecast' childrenClassName='flex flex-col gap-4'>
            <div className="flex gap-3 overflow-x-auto pb-2">
                {items.map((item) => (
                    <div
                        key={item.dt}
                        className="min-w-36 shrink-0 rounded-lg bg-zinc-800/80 p-2 border border-zinc-700 flex flex-col gap-2"
                    >
                        <p className="text-xs text-zinc-400">
                            {formatForecastTime(item.dt, data.city.timezone)}

                        </p>

                        <div className="flex items-center">
                            <WeatherIcon src={item.weather[0].icon} className="size-10" />
                            <p className="w-[3ch] text-right text-lg font-semibold tabular-nums">
                                {Math.round(item.main.temp)}°
                            </p>
                        </div>

                        <p className="text-sm capitalize text-zinc-200">{item.weather[0].description}</p>

                        <div className="text-xs text-zinc-400 flex flex-col gap-1">
                            <p>Rain: {Math.round((item.pop ?? 0) * 100)}%</p>
                            <p>Wind: {Math.round(item.wind.speed * 3.6)} km/h</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
