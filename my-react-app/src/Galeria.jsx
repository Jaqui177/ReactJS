import './Galeria.css';

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
						<div className="galeria__placeholder">Imagen 1</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">Imagen 2</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">Imagen 3</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">Imagen 4</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">Imagen 5</div>
					</div>
					<div className="galeria__item">
						<div className="galeria__placeholder">Imagen 6</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Galeria;
