import miLogo from './assets/images.png';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import tiktok from './assets/tiktok.png';
import whatsapp from './assets/whatsapp.png';
import youtube from './assets/youtube.png';
import'./Encabezado.css';

function Encabezado ({ onNavigate }) {
    return (
        <div className= "Encabezado">
            <Logo />
            <Menu onNavigate={onNavigate} />
            <Redes />
           <h2></h2>
        </div>
    );
}

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
                <li>Productos</li>
                <li>Contacto</li>
                <li>Sucursales</li>
            </ul>
        </nav>
    )
}

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