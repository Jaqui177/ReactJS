import './Galeria.css';
import imHumbe from './assets/im_humbe.png';
import imHumbe2 from './assets/im_humbe2.png';
import imHumbe3 from './assets/im_humbe3.png';
import imPaulo from './assets/im_paulo.png';
import imPaulo1 from './assets/im_paulo1.png';
import imPaulo3 from './assets/im_paulo3.png';

function Galeria() {
	return (
		<section className="galeria">
			<div className="galeria__contenedor">
				<h2 className="galeria__titulo">Galería</h2>
				<p className="galeria__descripcion">
					Descubre momentos memorables en nuestra galería de imágenes y eventos de los Artistas Humbe y Paulo Londra.
				</p>
				<div className="galeria__grid">
					<div className="galeria__item">
						<div className="galeria__placeholder">
							<img src={imHumbe} alt="Humbe" className="galeria__imagen" />
							
						</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">
							<img src={imHumbe2} alt="Humbe" className="galeria__imagen" />
							
						</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">
							<img src={imHumbe3} alt="Humbe" className="galeria__imagen" />
							
						</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">
							<img src={imPaulo} alt="Paulo Londra" className="galeria__imagen" />
							
						</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">
							<img src={imPaulo1} alt="Paulo Londra" className="galeria__imagen" />
							
						</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">
							<img src={imPaulo3} alt="Paulo Londra" className="galeria__imagen" />
							
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Galeria;
