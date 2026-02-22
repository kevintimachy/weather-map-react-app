import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { useQuery } from "@tanstack/react-query"
import { SearchIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { searchLocations, type GeoResult } from "../api"
import { useLocation } from "../context/LocationContext"

function formatLocationLabel(location: GeoResult) {
    return [location.name, location.state, location.country].filter(Boolean).join(", ");
}

export default function SearchBar() {
    const { setCoords } = useLocation();
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 250);

        return () => {
            window.clearTimeout(timer);
        };
    }, [query]);

    useEffect(() => {
        function onPointerDown(event: MouseEvent) {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", onPointerDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
        };
    }, []);

    const { data = [], isFetching, isError } = useQuery({
        queryKey: ["geo-search", debouncedQuery],
        queryFn: () => searchLocations(debouncedQuery),
        enabled: debouncedQuery.length >= 2,
        staleTime: 1000 * 60 * 5,
    });

    function handleSelect(location: GeoResult) {
        setCoords({ lat: location.lat, lon: location.lon });
        setQuery(formatLocationLabel(location));
        setIsOpen(false);
    }

    const shouldShowDropdown = isOpen && query.trim().length >= 2;

    return (
        <div ref={containerRef} className="relative w-64 sm:w-72">
            <InputGroup className="border-zinc-300 bg-zinc-100/70 text-zinc-900 shadow-lg backdrop-blur-sm">
                <InputGroupInput
                    id="map-search-input"
                    placeholder="Search city..."
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => {
                        if (query.trim().length >= 2) {
                            setIsOpen(true);
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            setIsOpen(false);
                        }

                        if (event.key === "Enter" && data.length > 0 && shouldShowDropdown) {
                            event.preventDefault();
                            handleSelect(data[0]);
                        }
                    }}
                    className="text-zinc-900 placeholder:text-zinc-900"
                />
                <InputGroupAddon align="inline-start" className="text-zinc-900">
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>

            {shouldShowDropdown && (
                <div className="absolute z-1300 mt-1 max-h-64 w-full overflow-auto rounded-md border border-zinc-300 bg-zinc-100 shadow-lg">
                    {isFetching && (
                        <div className="px-3 py-2 text-sm text-zinc-700">Searching...</div>
                    )}

                    {!isFetching && isError && (
                        <div className="px-3 py-2 text-sm text-red-700">
                            Unable to search locations.
                        </div>
                    )}

                    {!isFetching && !isError && data.length === 0 && (
                        <div className="px-3 py-2 text-sm text-zinc-700">No results</div>
                    )}

                    {!isFetching &&
                        !isError &&
                        data.map((location, index) => (
                            <button
                                key={`${location.lat}-${location.lon}-${index}`}
                                type="button"
                                className="block w-full px-3 py-2 text-left text-sm text-zinc-900 hover:bg-zinc-200"
                                onClick={() => handleSelect(location)}
                            >
                                {formatLocationLabel(location)}
                            </button>
                        ))}
                </div>
            )}
        </div>
    )
}
