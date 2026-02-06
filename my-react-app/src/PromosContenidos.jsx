import promoImg from './assets/humbe7.png';
import './PromosContenidos.css';

function PromosContenidos() {
	return (
		<section className="promos">
			<div className="promos__banner" style={{ backgroundImage: `url(${promoImg})` }}>
				<div className="promos__overlay">
					<h2 className="promos__titulo">Promociones</h2>
					<p className="promos__texto">
						Descubre nuestras ofertas exclusivas y promociones especiales pensadas para brindarte el mejor valor en tus compras.
						Aprovecha estas oportunidades únicas antes de que se acaben.
					</p>
				</div>
			</div>
		</section>
	);
}

export default PromosContenidos;
