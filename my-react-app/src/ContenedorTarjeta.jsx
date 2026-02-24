import PropTypes from 'prop-types';
import paulo from './assets/paulo.png';
import paulo1 from './assets/paulo1.png';
import humbe from './assets/humbe.png';
import humbe1 from './assets/humbe1.png';
import './ContenedorTarjeta.css';

function ContenedorTarjeta() {
    return (
        <div className="contenedor-tarjetas">
            <Tarjeta imagen={paulo} titulo="Paulo Londra" descripcion="Es un cantante y compositor argentino de música urbana y trap." />
            <Tarjeta imagen={humbe1} titulo="Humbe" descripcion="Es un artista emergente en la escena musical." />
            <Tarjeta imagen={humbe} titulo="Humbe" descripcion="Es un artista emergente en la escena musical." />
            <Tarjeta imagen={paulo1} titulo="Paulo Londra" descripcion="Es un cantante y compositor argentino de música urbana y trap." />
        </div>
    );
}

function Tarjeta({ imagen, titulo, descripcion }) {
    return (
        <div className="tarjeta">
            <img src={imagen} alt={titulo} className="tarjeta-imagen" />
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            <button className="boton-ver-mas">Ver más</button>
        </div>
    );
}

Tarjeta.propTypes = {
    imagen: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
};

export default ContenedorTarjeta;
