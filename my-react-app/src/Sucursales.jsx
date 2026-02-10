import './Sucursales.css';

function Sucursales() {
	return (
		<section className="sucursales">
			<div className="sucursales__contenedor">
				<h2 className="sucursales__titulo">Nuestras Sucursales</h2>
				<p className="sucursales__descripcion">
					Visítanos en cualquiera de nuestras ubicaciones. Estamos cerca de ti para brindarte el mejor servicio.
				</p>
				<div className="sucursales__grid">
					<div className="sucursales__card">
						<div className="sucursales__icono">📍</div>
						<h3>Sucursal Centro</h3>
						<p className="sucursales__direccion">Calle Principal #123, Centro</p>
						<p className="sucursales__horario">Lun - Vie: 9:00 - 20:00</p>
						<p className="sucursales__horario">Sáb: 9:00 - 14:00</p>
						<p className="sucursales__telefono">📞 (123) 456-7890</p>
					</div>
					<div className="sucursales__card">
						<div className="sucursales__icono">📍</div>
						<h3>Sucursal Norte</h3>
						<p className="sucursales__direccion">Av. Norte #456, Col. Norte</p>
						<p className="sucursales__horario">Lun - Vie: 9:00 - 20:00</p>
						<p className="sucursales__horario">Sáb: 9:00 - 14:00</p>
						<p className="sucursales__telefono">📞 (123) 456-7891</p>
					</div>
					<div className="sucursales__card">
						<div className="sucursales__icono">📍</div>
						<h3>Sucursal Sur</h3>
						<p className="sucursales__direccion">Blvd. Sur #789, Col. Sur</p>
						<p className="sucursales__horario">Lun - Vie: 9:00 - 20:00</p>
						<p className="sucursales__horario">Sáb: 9:00 - 14:00</p>
						<p className="sucursales__telefono">📞 (123) 456-7892</p>
					</div>
					<div className="sucursales__card">
						<div className="sucursales__icono">📍</div>
						<h3>Sucursal Plaza</h3>
						<p className="sucursales__direccion">Plaza Comercial, Local 12</p>
						<p className="sucursales__horario">Lun - Dom: 10:00 - 21:00</p>
						<p className="sucursales__telefono">📞 (123) 456-7893</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Sucursales;
