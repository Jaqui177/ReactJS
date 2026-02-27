import { useMemo, useState } from 'react';
import './RegistrarProductos.css';

const formInicial = {
	nombre: '',
	precio: '',
	categoria: '',
	imagen: '',
	descripcion: '',
	stock: '',
};

function RegistrarProductos() {
	const [formulario, setFormulario] = useState(formInicial);
	const [productos, setProductos] = useState([]);
	const [error, setError] = useState('');
	const [exito, setExito] = useState('');

	const totalProductos = useMemo(() => productos.length, [productos]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormulario((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const validarFormulario = () => {
		if (!formulario.nombre.trim()) {
			return 'Ingresa el nombre del producto.';
		}
		if (!formulario.precio || Number(formulario.precio) <= 0) {
			return 'Ingresa un precio válido.';
		}
		if (!formulario.categoria.trim()) {
			return 'Ingresa la categoría del producto.';
		}
		if (!formulario.stock || Number(formulario.stock) < 0) {
			return 'Ingresa un stock válido.';
		}
		return '';
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const mensajeError = validarFormulario();
		if (mensajeError) {
			setError(mensajeError);
			setExito('');
			return;
		}

		const nuevoProducto = {
			id: Date.now(),
			nombre: formulario.nombre.trim(),
			precio: Number(formulario.precio),
			categoria: formulario.categoria.trim(),
			imagen: formulario.imagen.trim(),
			descripcion: formulario.descripcion.trim(),
			stock: Number(formulario.stock),
		};

		setProductos((prev) => [nuevoProducto, ...prev]);
		setFormulario(formInicial);
		setError('');
		setExito('Producto registrado correctamente.');
	};

	const handleLimpiar = () => {
		setFormulario(formInicial);
		setError('');
		setExito('');
	};

	const handleEliminar = (id) => {
		setProductos((prev) => prev.filter((producto) => producto.id !== id));
	};

	return (
		<section className="registrar-productos">
			<div className="registrar-productos__contenedor">
				<div className="registrar-productos__encabezado">
					<h2>Registrar Productos</h2>
					<p>Agrega nuevos productos al catálogo de forma rápida y sencilla.</p>
				</div>

				<div className="registrar-productos__contenido">
					<form className="registrar-productos__formulario" onSubmit={handleSubmit}>
						<div className="registrar-productos__grupo">
							<label htmlFor="nombre">Nombre del producto</label>
							<input
								type="text"
								id="nombre"
								name="nombre"
								value={formulario.nombre}
								onChange={handleChange}
								placeholder="Ej. Camiseta oversize"
								required
							/>
						</div>
						<div className="registrar-productos__fila">
							<div className="registrar-productos__grupo">
								<label htmlFor="precio">Precio</label>
								<input
									type="number"
									id="precio"
									name="precio"
									value={formulario.precio}
									onChange={handleChange}
									placeholder="0.00"
									min="0"
									required
								/>
							</div>
							<div className="registrar-productos__grupo">
								<label htmlFor="stock">Stock</label>
								<input
									type="number"
									id="stock"
									name="stock"
									value={formulario.stock}
									onChange={handleChange}
									placeholder="0"
									min="0"
									required
								/>
							</div>
						</div>
						<div className="registrar-productos__grupo">
							<label htmlFor="categoria">Categoría</label>
							<input
								type="text"
								id="categoria"
								name="categoria"
								value={formulario.categoria}
								onChange={handleChange}
								placeholder="Ej. Moda, Accesorios"
								required
							/>
						</div>
						<div className="registrar-productos__grupo">
							<label htmlFor="imagen">Imagen (URL)</label>
							<input
								type="url"
								id="imagen"
								name="imagen"
								value={formulario.imagen}
								onChange={handleChange}
								placeholder="https://"
							/>
						</div>
						<div className="registrar-productos__grupo">
							<label htmlFor="descripcion">Descripción</label>
							<textarea
								id="descripcion"
								name="descripcion"
								rows="4"
								value={formulario.descripcion}
								onChange={handleChange}
								placeholder="Escribe una descripción corta"
							></textarea>
						</div>

						{error && <p className="registrar-productos__mensaje registrar-productos__mensaje--error">{error}</p>}
						{exito && <p className="registrar-productos__mensaje registrar-productos__mensaje--exito">{exito}</p>}

						<div className="registrar-productos__acciones">
							<button type="submit" className="registrar-productos__boton registrar-productos__boton--primario">
								Registrar producto
							</button>
							<button type="button" className="registrar-productos__boton" onClick={handleLimpiar}>
								Limpiar
							</button>
						</div>
					</form>

					<div className="registrar-productos__lista">
						<div className="registrar-productos__resumen">
							<h3>Productos registrados</h3>
							<span>{totalProductos} productos</span>
						</div>

						{productos.length === 0 ? (
							<div className="registrar-productos__vacio">
								<p>Aún no hay productos registrados.</p>
								<p>Completa el formulario para agregar tu primer producto.</p>
							</div>
						) : (
							<div className="registrar-productos__grid">
								{productos.map((producto) => (
									<div key={producto.id} className="registrar-productos__card">
										<div className="registrar-productos__card-imagen">
											{producto.imagen ? (
												<img src={producto.imagen} alt={producto.nombre} />
											) : (
												<span>Sin imagen</span>
											)}
										</div>
										<div className="registrar-productos__card-info">
											<h4>{producto.nombre}</h4>
											<p className="registrar-productos__card-categoria">{producto.categoria}</p>
											<p className="registrar-productos__card-descripcion">
												{producto.descripcion || 'Sin descripción.'}
											</p>
											<div className="registrar-productos__card-detalles">
												<span>${producto.precio.toFixed(2)}</span>
												<span>Stock: {producto.stock}</span>
											</div>
											<button
												type="button"
												className="registrar-productos__eliminar"
												onClick={() => handleEliminar(producto.id)}
											>
												Eliminar
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default RegistrarProductos;
