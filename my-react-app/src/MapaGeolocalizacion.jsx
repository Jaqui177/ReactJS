import { useEffect, useState } from "react";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { useGoogleMaps } from "./GoogleMapsProvider";

const containerStyle = {
    width: "100%",
    height: "260px"
};

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000,
};

const markerStyle = {
    position: "relative",
    transform: "translate(-50%, -100%)",
    width: "18px",
    height: "18px",
    borderRadius: "999px",
    backgroundColor: "#ef4444",
    border: "3px solid #fff",
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.35)",
};

const markerHaloStyle = {
    position: "absolute",
    inset: "-10px",
    borderRadius: "999px",
    backgroundColor: "rgba(59, 130, 246, 0.22)",
    zIndex: -1,
};

function getGeolocationErrorMessage(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return "No se concedió permiso para acceder a tu ubicación. Mostrando ubicación por defecto.";
        case error.POSITION_UNAVAILABLE:
            return "No se pudo determinar tu ubicación actual. Mostrando ubicación por defecto.";
        case error.TIMEOUT:
            return "La solicitud de ubicación tardó demasiado. Mostrando ubicación por defecto.";
        default:
            return "No se pudo obtener tu ubicación. Mostrando ubicación por defecto.";
    }
}

function MapaGeolocalizacion (){
    const ubicacionPorDefecto = { lat: 20.241995427589828, lng: -97.95859190463108 };
    const [ubicacion, setUbicacion] = useState(ubicacionPorDefecto);
    const [error, setError] = useState("");
    const [estadoUbicacion, setEstadoUbicacion] = useState("cargando");
    const { isLoaded, loadError } = useGoogleMaps();

    useEffect(() => {
        let isMounted = true;

        if (!navigator.geolocation) {
            setError("La geolocalización no está disponible en este navegador.");
            setEstadoUbicacion("fallback");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (!isMounted) {
                    return;
                }

                setUbicacion({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setEstadoUbicacion("lista");
                setError("");
            },
            (geolocationError) => {
                if (!isMounted) {
                    return;
                }

                setEstadoUbicacion("fallback");
                setError(getGeolocationErrorMessage(geolocationError));
            },
            geolocationOptions
        );

        return () => {
            isMounted = false;
        };
    }, []);

    if (loadError) {
        return <p className="mapa__error">No se pudo cargar Google Maps.</p>;
    }

    return (
        <>
            {estadoUbicacion === "cargando" && (
                <p className="mapa__cargando">Obteniendo ubicación...</p>
            )}
            {error && <p className="mapa__error">{error}</p>}
            {!isLoaded ? (
                <p className="mapa__cargando">Cargando mapa...</p>
            ) : (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={ubicacion}
                    zoom={15}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: true,
                    }}
                >
                    <OverlayView
                        position={ubicacion}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div
                            style={markerStyle}
                            aria-label={estadoUbicacion === "lista" ? "Tu ubicación actual" : "Ubicación por defecto"}
                            title={estadoUbicacion === "lista" ? "Tu ubicación actual" : "Ubicación por defecto"}
                        >
                            <div style={markerHaloStyle} />
                        </div>
                    </OverlayView>
                </GoogleMap>
            )}
        </>  
    )

}

export default MapaGeolocalizacion;
