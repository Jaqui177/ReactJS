import PropTypes from "prop-types";
import {GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api";

const containerStyle = {
    width: '100px',
    height: '3500px'
};

function Mapa( { lat, lng, nombre_sucursal } ){
    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })
    if(loadError) return <div>Error al cargar el mapa</div>;
    if(!isLoaded) return <div>Cargando mapa...</div>;

    const center = { lat, lng };
    return (
      <div>
        <h2>{nombre_sucursal}</h2>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
        > 
            <Marker position={center} />
        </GoogleMap>

      </div>
    )
    
}

Mapa.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    nombre_sucursal: PropTypes.string.isRequired,
};

export default Mapa;