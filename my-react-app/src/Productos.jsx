import './Productos.css';

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
						<h3>Camisetas</h3>
						<p>Tenemos una variedad de camisetas con diseños exclusivos de tus artistas favoritos.</p>
					</div>
					<div className="productos__card">
						<h3>Gorras</h3>
						<p>Tenemos una variedad de gorras con diseños exclusivos de tus artistas favoritos.</p>
					</div>
					<div className="productos__card">
						<h3>Posters</h3>
						<p>tenemos los mejores posters de tus artistas favoritos.</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Productos;
