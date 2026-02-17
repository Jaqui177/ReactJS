//20.27558558128397, -97.95859190463108
import { useEffect, useState } from "react";

function Clima() {
    const [clima, setClima] = useState(null);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const API_KEY = import.meta.env.VITE_OPEWEATHER_API_KEY;
    const lat = 20.287064705908403;
    const lon = -97.9598524293577;

    useEffect(() => {
        if (!API_KEY) {
            setError("Falta la API key de OpenWeather. Revisa VITE_OPEWEATHER_API_KEY en tu archivo .env");
            setCargando(false);
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status} al obtener el clima`);
                }
                return response.json();
            })
            .then((data) => {
                setClima(data);
                setError("");
            })
            .catch((err) => {
                console.error("Error al obtener el clima:", err);
                setError("No se pudo obtener el clima.");
            })
            .finally(() => setCargando(false));
    }, [API_KEY]);

    if (cargando) {
        return <p className="divClima">Cargando clima...</p>;
    }

    if (error) {
        return <p className="divClima">{error}</p>;
    }

    return (
        <div className="divClima">
            <p>
                {clima?.name} Temp: {clima?.main?.temp}°C Hum: {clima?.main?.humidity}%
            </p>
            <p>Descripcion: {clima?.weather?.[0]?.description}</p>
        </div>
    );
}

export default Clima;