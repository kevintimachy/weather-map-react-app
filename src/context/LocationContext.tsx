// src/context/LocationContext.tsx
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Coords = { lat: number; lon: number };
type LocationValue = {
    coords: Coords;
    setCoords: (next: Coords) => void;
};

const LocationContext = createContext<LocationValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
    const [coords, setCoords] = useState<Coords>({ lat: 51.505, lon: -0.09 }); // fallback

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (p) => setCoords({ lat: p.coords.latitude, lon: p.coords.longitude }),
            () => { }
        );
    }, []);

    const value = useMemo(() => ({ coords, setCoords }), [coords]);
    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocation() {
    const ctx = useContext(LocationContext);
    if (!ctx) throw new Error("useLocation must be used inside LocationProvider");
    return ctx;
}
