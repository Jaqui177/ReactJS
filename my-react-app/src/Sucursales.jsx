import './Sucursales.css';
import MapaGeolocalizacion from './MapaGeolocalizacion';

function Sucursales() {
	const getMapSrc = (address) => `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
	const getMapLink = (address) => `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
	return (
		<section className="sucursales">
			<div className="sucursales__contenedor">
				<h2 className="sucursales__titulo">Nuestras Sucursales</h2>
				<p className="sucursales__descripcion">
					Visítanos en cualquiera de nuestras ubicaciones. Estamos cerca de ti para brindarte el mejor servicio.
				</p>
				<div className="sucursales__geolocalizacion">
					<h3 className="sucursales__subtitulo">Tu ubicación</h3>
					<MapaGeolocalizacion />
				</div>
				<div className="sucursales__grid">
					<div className="sucursales__card">
						<div className="sucursales__icono">📍</div>
						<h3>Sucursal Centro</h3>
						<p className="sucursales__direccion">Calle Principal #123, Centro</p>
						<p className="sucursales__horario">Lun - Vie: 9:00 - 20:00</p>
						<p className="sucursales__horario">Sáb: 9:00 - 14:00</p>
						<p className="sucursales__telefono">📞 (123) 456-7890</p>
						<a href={getMapLink("Calle Principal #123, Centro")} target="_blank" rel="noreferrer">
							<iframe
								title="Mapa Sucursal Centro"
								src={getMapSrc("Calle Principal #123, Centro")}
								style={{ width: "100%", height: "200px", border: 0, borderRadius: "12px", marginTop: "12px" }}
								loading="lazy"
							></iframe>
						</a>
					</div>
					<div className="sucursales__card">
						<div className="sucursales__icono">📍</div>
						<h3>Sucursal Norte</h3>
						<p className="sucursales__direccion">Av. Norte #456, Col. Norte</p>
						<p className="sucursales__horario">Lun - Vie: 9:00 - 20:00</p>
						<p className="sucursales__horario">Sáb: 9:00 - 14:00</p>
						<p className="sucursales__telefono">📞 (123) 456-7891</p>
						<a href={getMapLink("Av. Norte #456, Col. Norte")} target="_blank" rel="noreferrer">
							<iframe
								title="Mapa Sucursal Norte"
								src={getMapSrc("Av. Norte #456, Col. Norte")}
								style={{ width: "100%", height: "200px", border: 0, borderRadius: "12px", marginTop: "12px" }}
								loading="lazy"
							></iframe>
						</a>
					</div>
					<div className="sucursales__card">
						<div className="sucursales__icono">📍</div>
						<h3>Sucursal Sur</h3>
						<p className="sucursales__direccion">Blvd. Sur #789, Col. Sur</p>
						<p className="sucursales__horario">Lun - Vie: 9:00 - 20:00</p>
						<p className="sucursales__horario">Sáb: 9:00 - 14:00</p>
						<p className="sucursales__telefono">📞 (123) 456-7892</p>
						<a href={getMapLink("Blvd. Sur #789, Col. Sur")} target="_blank" rel="noreferrer">
							<iframe
								title="Mapa Sucursal Sur"
								src={getMapSrc("Blvd. Sur #789, Col. Sur")}
								style={{ width: "100%", height: "200px", border: 0, borderRadius: "12px", marginTop: "12px" }}
								loading="lazy"
							></iframe>
						</a>
					</div>
					<div className="sucursales__card">
						<div className="sucursales__icono">📍</div>
						<h3>Sucursal Plaza</h3>
						<p className="sucursales__direccion">Plaza Comercial, Local 12</p>
						<p className="sucursales__horario">Lun - Dom: 10:00 - 21:00</p>
						<p className="sucursales__telefono">📞 (123) 456-7893</p>
						<a href={getMapLink("Plaza Comercial, Local 12")} target="_blank" rel="noreferrer">
							<iframe
								title="Mapa Sucursal Plaza"
								src={getMapSrc("Plaza Comercial, Local 12")}
								style={{ width: "100%", height: "200px", border: 0, borderRadius: "12px", marginTop: "12px" }}
								loading="lazy"
							></iframe>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Sucursales;
