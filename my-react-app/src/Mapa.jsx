import PropTypes from "prop-types";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { useGoogleMaps } from "./GoogleMapsProvider";

const containerStyle = {
    width: "100%",
    height: "350px"
};

const markerStyle = {
    transform: "translate(-50%, -100%)",
    backgroundColor: "#dc2626",
    borderRadius: "999px",
    width: "18px",
    height: "18px",
    border: "3px solid #fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
};

const markerPulseStyle = {
    position: "absolute",
    inset: "-8px",
    borderRadius: "999px",
    backgroundColor: "rgba(220, 38, 38, 0.25)",
    zIndex: -1
};

function Mapa( { lat, lng, nombre_sucursal } ){
    const { isLoaded, loadError } = useGoogleMaps();

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
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        > 
            <OverlayView
                position={center}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div style={markerStyle} aria-label={nombre_sucursal}>
                    <div style={markerPulseStyle} />
                </div>
            </OverlayView>
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
