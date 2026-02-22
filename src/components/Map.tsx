import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useLocation } from '../context/LocationContext'
import SearchBar from './SearchBar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

const API_KEY = import.meta.env.VITE_API_KEY

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})


type WeatherLayer =
    | 'none'
    | 'clouds_new'
    | 'precipitation_new'
    | 'pressure_new'
    | 'wind_new'
    | 'temp_new'

const WEATHER_LAYER_OPTIONS: Array<{ value: WeatherLayer; label: string }> = [
    { value: 'none', label: 'None' },
    { value: 'clouds_new', label: 'Clouds' },
    { value: 'precipitation_new', label: 'Precipitation' },
    { value: 'pressure_new', label: 'Sea Level Pressure' },
    { value: 'wind_new', label: 'Wind Speed' },
    { value: 'temp_new', label: 'Temperature' },
]

function LocationMarker() {
    const { coords, setCoords } = useLocation();
    const map = useMapEvents({
        click(e) {
            const next = { lat: e.latlng.lat, lon: e.latlng.lng };
            setCoords(next);
            map.flyTo([next.lat, next.lon], map.getZoom());
        },
    });

    return (
        <Marker position={[coords.lat, coords.lon]}>
        </Marker>
    );
}

function SyncMapToLocation() {
    const { coords } = useLocation();
    const map = useMap();

    useEffect(() => {
        map.flyTo([coords.lat, coords.lon], map.getZoom());
    }, [coords.lat, coords.lon, map]);

    return null;
}

export default function Map() {
    const { coords } = useLocation();
    const [mapLayer, setMapLayer] = useState<WeatherLayer>('none');

    const selectedLabel =
        WEATHER_LAYER_OPTIONS.find((layer) => layer.value === mapLayer)?.label ?? 'None';

    return (
        <div className="relative overflow-hidden rounded-none sm:rounded-xl">
            <div className="absolute top-2 left-1/2 z-1200 -translate-x-1/2">
                <SearchBar />
            </div>

            <div className="absolute bottom-2 left-2 z-1200">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-900 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        >
                            Layer: {selectedLabel}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="top"
                        align="start"
                        className="z-2000 border-zinc-300 bg-zinc-100 text-zinc-900 shadow-xl"
                    >
                        <DropdownMenuLabel className="text-zinc-600">Weather Layer</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={mapLayer}
                            onValueChange={(value) => setMapLayer(value as WeatherLayer)}
                        >
                            {WEATHER_LAYER_OPTIONS.map((layer) => (
                                <DropdownMenuRadioItem
                                    key={layer.value}
                                    value={layer.value}
                                    className="text-zinc-900 focus:bg-zinc-200"
                                >
                                    {layer.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <MapContainer
                center={[coords.lat, coords.lon]}
                zoom={7}
                style={{ width: '100%', height: '500px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {mapLayer !== 'none' && (
                    <TileLayer
                        key={mapLayer}
                        attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a>'
                        opacity={0.90}
                        url={`https://tile.openweathermap.org/map/${mapLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
                    />
                )}

                <LocationMarker />
                <SyncMapToLocation />
            </MapContainer>
        </div>
    )
}
