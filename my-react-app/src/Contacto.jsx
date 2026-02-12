import './Contacto.css';

function Contacto() {
	return (
		<section className="contacto">
			<div className="contacto__contenedor">
				<h2 className="contacto__titulo">Contáctanos</h2>
				<p className="contacto__descripcion">
					¿Tienes preguntas? Nos encantaría saber de ti. Envíanos un mensaje y nos pondremos en contacto lo antes posible.
				</p>
				<div className="contacto__contenido">
					<div className="contacto__formulario">
						<form>
							<div className="contacto__grupo">
								<label htmlFor="nombre">Nombre</label>
								<input type="text" id="nombre" name="nombre" required />
							</div>
							<div className="contacto__grupo">
								<label htmlFor="email">Email</label>
								<input type="email" id="email" name="email" required />
							</div>
							<div className="contacto__grupo">
								<label htmlFor="asunto">Telefono</label>
								<input type="text" id="asunto" name="asunto" required />
							</div>
							<div className="contacto__grupo">
								<label htmlFor="mensaje">Asunto</label>
								<textarea id="mensaje" name="mensaje" rows="6" required></textarea>
							</div>
							<button type="submit" className="contacto__boton">Enviar Mensaje</button>
						</form>
					</div>
					<div className="contacto__info">
						<div className="contacto__item">
							<h3>Dirección</h3>
							<p>puebla, Xicotepec de Juarez av Universidad Tecnologica de Xicotepec de Juarez</p>
						</div>
						<div className="contacto__item">
							<h3>Teléfono</h3>
							<p>+52 7641296813</p>
						</div>
						<div className="contacto__item">
							<h3>Email</h3>
							<p>jaqui_soto@example.com</p>
						</div>
						<div className="contacto__item">
							<h3>Horario</h3>
							<p>Lunes a Viernes: 9:00 - 18:00</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Contacto;
