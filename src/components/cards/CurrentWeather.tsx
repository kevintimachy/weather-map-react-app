import Card from './Card'
import { getCurrentWeather } from '../../api'
import { useQuery } from '@tanstack/react-query'
import WeatherIcon from '../WeatherIcon'
import { useLocation } from '../../context/LocationContext'




export default function CurrentWeather() {
    const { coords } = useLocation()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['currentWeather', coords.lat, coords.lon],
        queryFn: () => getCurrentWeather(coords)
    })

    if (isLoading) {
        return <Card title="Current">Loading...</Card>;
    }

    if (isError || !data) {
        return <Card title="Current">Unable to load current weather.</Card>;
    }

    const precipitationText =
        data.rain?.["1h"] !== undefined ? `${data.rain["1h"].toFixed(1)} mm` : "N/A";
    const locationLabel = [data.name, data.sys.country].filter(Boolean).join(", ") || "Selected location - Unknown";

    return (
        <Card title={locationLabel} childrenClassName='flex h-full flex-col items-center gap-4'>
            {/* empty div for spacing */}
            <div></div>
            <div className='flex gap-4 items-center'>
                <WeatherIcon src={data.weather[0].icon} className='size-16' />
                <h2 className='text-7xl'>{Math.round(data.main.temp)}°C</h2>
                <div className='flex flex-col text-sm'>
                    <p>{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</p>
                    <p>Feels like: {Math.round(data.main.feels_like)}</p>
                    <div className='flex gap-4'>
                        <p>H: {Math.round(data.main.temp_max)}</p>
                        <p>L: {Math.round(data.main.temp_min)}</p>
                    </div>

                </div>
            </div>

            <div className='mt-auto w-full text-center text-xs text-zinc-400 flex items-center justify-center gap-4 whitespace-nowrap'>
                <p>Precipitation: {precipitationText}</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Wind: {Math.round(data.wind.speed * 3.6)} km/h</p>
            </div>
        </Card>
    )
}
