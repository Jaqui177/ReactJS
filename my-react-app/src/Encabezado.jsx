import PropTypes from 'prop-types';
import miLogo from './assets/images.png';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import tiktok from './assets/tiktok.png';
import whatsapp from './assets/whatsapp.png';
import youtube from './assets/youtube.png';
import Clima from './clima.jsx';
import'./Encabezado.css';

function Encabezado ({ onNavigate }) {
    return (
        <div className= "Encabezado">
            <Logo />
            <Menu onNavigate={onNavigate} />
            <Redes />
            <Clima />
           <h2></h2>
        </div>
    );
}

Encabezado.propTypes = {
    onNavigate: PropTypes.func,
};

function Logo(){
    return (
       <div className="Logo">
        <img src={miLogo} alt="React Logo" />
       </div>
    )
}


function Menu({ onNavigate }){
    return (
        <nav className="menu">
            <ul>
                <li onClick={() => onNavigate?.("inicio")}>Inicio</li>
                <li onClick={() => onNavigate?.("acerca")}>Acerca de</li>
                <li onClick={() => onNavigate?.("productos")}>Productos</li>
                <li onClick={() => onNavigate?.("registrarProductos")}>Registrar Productos</li>
                <li onClick={() => onNavigate?.("contacto")}>Contacto</li>
                <li onClick={() => onNavigate?.("conciertos")}>Conciertos</li>
                <li onClick={() => onNavigate?.("galeria")}>Galeria</li>
                <li onClick={() => onNavigate?.("sucursales")}>Sucursales</li>
                <li onClick={() => onNavigate?.("usuarios")}>Usuarios</li>
                <li onClick={() => onNavigate?.("carrito")}>Carrito</li>
            </ul>
        </nav>
    )
}

Menu.propTypes = {
    onNavigate: PropTypes.func,
};

function Redes(){
    return (
        <nav className="redes">
            <ul>
                <li><img src={facebook} alt="React facebook" /></li>
                <li><img src={instagram} alt="React instagram" /></li>
                <li><img src={tiktok} alt="React tiktok" /></li>
                <li><img src={whatsapp} alt="React whatsapp" /></li>
                <li><img src={youtube} alt="React youtube" /></li>
            </ul>
        </nav>
    )
}

export default Encabezado;