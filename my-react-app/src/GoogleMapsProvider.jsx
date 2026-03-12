import { createContext, useContext, useMemo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const GoogleMapsContext = createContext({
    isLoaded: false,
    loadError: null,
});

function GoogleMapsProvider({ children }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const value = useMemo(
        () => ({ isLoaded, loadError }),
        [isLoaded, loadError]
    );

    return (
        <GoogleMapsContext.Provider value={value}>
            {children}
        </GoogleMapsContext.Provider>
    );
}

function useGoogleMaps() {
    return useContext(GoogleMapsContext);
}

export { GoogleMapsProvider, useGoogleMaps };
