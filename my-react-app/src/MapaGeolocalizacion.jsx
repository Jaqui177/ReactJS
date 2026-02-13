import { useEffect, useState } from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '260px'
};

function MapaGeolocalizacion (){
    const ubicacionPorDefecto = { lat: 20.241995427589828, lng: -97.95859190463108 };
    const [ubicacion, setUbicacion] = useState(ubicacionPorDefecto);
    const [error, setError] = useState("");
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("La geolocalización no está disponible en este navegador.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUbicacion({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                setError("No se pudo obtener tu ubicación. Mostrando ubicación por defecto.");
                console.error("Error al obtener la ubicación:", error);
            }
        );
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            {!error && (
                <p className="mapa__cargando">Obteniendo ubicación...</p>
            )}
            {error && <p className="mapa__error">{error}</p>}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={ubicacion}
                zoom={15}>
                <Marker
                    position={ubicacion}
                    icon="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                />
            </GoogleMap>
        </LoadScript>  
    )

}

export default MapaGeolocalizacion;