import './Conciertos.css';
import conHumbe1 from './assets/con_humbe1.png';
import conHumbe2 from './assets/con_humbe2.png';
import conPaulo1 from './assets/con_paulo1.png';
import conPaulo2 from './assets/con_paulo2.png';

function Conciertos() {
	return (
		<section className="conciertos">
			<div className="conciertos__contenedor">
				<h2 className="conciertos__titulo">Conciertos</h2>
				<p className="conciertos__descripcion">
					Aqui estan los proximos conciertos de los artistas que tenemos en nuestra tienda, no te pierdas la oportunidad de ver a tus artistas favoritos en vivo y disfrutar de una experiencia única.
                    Pronto anunciaremos las fechas y lugares de los conciertos, así que mantente atento a nuestras redes sociales para no perderte ninguna actualización.
				</p>
				<div className="conciertos__lista">
					<div className="conciertos__evento">
						<h3>Concierto de Humbe 2026 </h3>
						<img src={conHumbe1} alt="Concierto de Humbe" className="conciertos__imagen" />
						<p className="conciertos__fecha">Próximamente</p>
						<p className="conciertos__detalles">Detalles del evento</p>
					</div>
					<div className="conciertos__evento">
						<h3>Concierto de Paulo Londra 2026</h3>
						<img src={conPaulo1} alt="Concierto de Paulo Londra" className="conciertos__imagen" />
						<p className="conciertos__fecha">Próximamente</p>
						<p className="conciertos__detalles">Detalles del evento</p>
					</div>
					<div className="conciertos__evento">
						<h3>Concierto de humbe 2027</h3>
						<img src={conHumbe2} alt="Concierto de Humbe" className="conciertos__imagen" />
						<p className="conciertos__fecha">Próximamente</p>
						<p className="conciertos__detalles">Detalles del evento</p>
					</div>
                    <div className="conciertos__evento">
						<h3>Concierto de Paulo Londra 2027</h3>
						<img src={conPaulo2} alt="Concierto de Paulo Londra" className="conciertos__imagen" />
						<p className="conciertos__fecha">Próximamente</p>
						<p className="conciertos__detalles">Detalles del evento</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Conciertos;
