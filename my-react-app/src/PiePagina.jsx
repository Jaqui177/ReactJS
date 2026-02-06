import './PiePagina.css';

function PiePagina() {
	return (
		<footer className="pie">
			<div className="pie__contenido">
				<div className="pie__col">
					<h4 className="pie__titulo">Sobre Nosotros</h4>
					<p className="pie__texto">
						Creamos experiencias digitales con enfoque en diseño, rendimiento y usabilidad.
						Nuestro objetivo es ayudarte a mostrar tu contenido con estilo.
					</p>
				</div>
				<div className="pie__col">
					<h4 className="pie__titulo">Enlaces</h4>
					<ul className="pie__lista">
						<li><a href="#">Inicio</a></li>
						<li><a href="#">Acerca de</a></li>
						<li><a href="#">Productos</a></li>
						<li><a href="#">Contacto</a></li>
					</ul>
				</div>
				<div className="pie__col">
					<h4 className="pie__titulo">Contacto</h4>
					<ul className="pie__lista">
	
					</ul>
				</div>
			</div>
			<div className="pie__barra">
				<span> 240743 Luz Jaquelin Soto.</span>
			</div>
		</footer>
	);
}

export default PiePagina;
