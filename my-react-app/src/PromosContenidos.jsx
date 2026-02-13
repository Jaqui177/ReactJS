import './PromosContenidos.css';

function PromosContenidos() {
	const lat = 20.2379923441745
	const lng =  -97.95707564896917
	const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=1200x600&markers=color:red%7C${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
	const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
	const delta = 0.005;
	const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lng}`;
	return (
		<section className="promos">
			<div className="promos__banner" style={{ backgroundImage: `url(${mapUrl})` }}>
				<div className="promos__overlay">
					<h2 className="promos__titulo"></h2>
					<p className="promos__texto">
						
					</p>
					<a href={mapsLink} target="_blank" rel="noreferrer">
						<img
							src={mapUrl}
							alt="Mapa de ubicación"
							style={{ width: "100%", maxWidth: "900px", borderRadius: "12px", cursor: "pointer", display: "block" }}
						/>
					</a>
					<iframe
						title="Mapa de ubicación"
						src={osmUrl}
						style={{ width: "100%", maxWidth: "900px", height: "300px", border: 0, marginTop: "12px", borderRadius: "12px" }}
						loading="lazy"
					></iframe>
				</div>
			</div>
		</section>
	);
}

export default PromosContenidos;
