import './Productos.css';
import playeraImg from './assets/playera.png';
import gorraImg from './assets/gorra.png';
import posterImg from './assets/humbe_poster.png';

function Productos() {
	return (
		<section className="productos">
			<div className="productos__contenedor">
				<h2 className="productos__titulo">Nuestros Productos</h2>
				<p className="productos__descripcion">
					Aqui puedes encontrar todo lo que es su merch dede los cantantes que tenemos en nuestra tienda, desde camisetas, gorras, hasta posters y más.
				</p>
				<div className="productos__grid">
					<div className="productos__card">
						<h3>Playeras</h3>
						<img src={playeraImg} alt="Playera HUMBE" className="productos__imagen" />
						<p>Tenemos una variedad de camisetas con diseños exclusivos de tus artistas favoritos.</p>
					</div>
					<div className="productos__card">
						<h3>Gorras</h3>
						<img src={gorraImg} alt="Gorra bordada" className="productos__imagen" />
						<p>Tenemos una variedad de gorras con diseños exclusivos de tus artistas favoritos.</p>
					</div>
					<div className="productos__card">
						<h3>Posters</h3>
						<img src={posterImg} alt="Poster HUMBE" className="productos__imagen" />
						<p>tenemos los mejores posters de tus artistas favoritos.</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Productos;
