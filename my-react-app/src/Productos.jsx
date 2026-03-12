import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import api from './Services/api';
import './Productos.css';


function Productos() {
	const { isLoggedIn } = useAuth();
	const [productos, setProductos] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState("");
	const [cantidades, setCantidades] = useState({});
	const [registroNombre, setRegistroNombre] = useState("");
	const [registroPrecio, setRegistroPrecio] = useState("");
	const [registroDescripcion, setRegistroDescripcion] = useState("");
	const [registros, setRegistros] = useState([]);

	// Estado para formulario de registro de productos (solo formulario)
	const [productoForm, setProductoForm] = useState({
		nombre: '',
		precio: '',
		categoria: '',
		imagen: '',
		descripcion: '',
		stock: '',
	});
	const [productoMensaje, setProductoMensaje] = useState('');

	const handleAgregar = (id) => {
		setCantidades((prev) => ({
			...prev,
			[id]: (prev[id] || 0) + 1,
		}));
	};

	const handleEliminar = (id) => {
		setCantidades((prev) => {
			const actual = prev[id] || 0;
			if (actual <= 0) return prev;
			return {
				...prev,
				[id]: actual - 1,
			};
		});
	};

	const handleEditar = (id) => {
		const producto = productos.find((p) => p.id === id);
		if (!producto) return;
		const nuevoTitulo = window.prompt('Nuevo nombre del producto:', producto.title || '');
		if (nuevoTitulo === null) return;
		const nuevoPrecioRaw = window.prompt('Nuevo precio:', String(producto.price ?? ''));
		if (nuevoPrecioRaw === null) return;
		const nuevoPrecio = Number(nuevoPrecioRaw);
		if (!nuevoTitulo.trim() || Number.isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
			return;
		}
		setProductos((prev) =>
			prev.map((p) =>
				p.id === id ? { ...p, title: nuevoTitulo.trim(), price: nuevoPrecio } : p
			)
		);
	};

	const handleRegistrarProducto = () => {
		const nombre = registroNombre.trim();
		const precio = registroPrecio.trim();
		const descripcion = registroDescripcion.trim();
		if (!nombre || !precio) return;
		setRegistros((prev) => [
			...prev,
			{ id: Date.now(), nombre, precio, descripcion },
		]);
		setRegistroNombre("");
		setRegistroPrecio("");
		setRegistroDescripcion("");
	};

	useEffect(() => {
		const obtenerProductos = async () => {
			setCargando(true);
			try {
				const response = await api.get('/products');
				setProductos(response.data);
				setError("");
			} catch (error) {
				console.error('Error al obtener productos:', error);
				setError("No se pudieron cargar los productos.");
			} finally {
				setCargando(false);
			}
		};

		obtenerProductos();
	}, []);
	if (cargando) {
		return <p>Cargando productos...</p>;
	}

	if (error) {
		return <p className="productos-error">{error}</p>;
	}

	
	return (
		<div className="productos">
			<div className="productos__contenedor">
				<h1 className="productos__titulo">Catálogo de Productos</h1>
				<p className="productos__descripcion">
					Descubre nuestra selección de productos de alta calidad
				</p>


				{/* Formulario de registro de productos (solo el formulario) */}
				{isLoggedIn && (
							<div className="productos__registro-formulario">
								<h2 className="productos__registro-titulo">Registrar producto</h2>
								<form
									className="productos__registro-form"
									onSubmit={(e) => {
										e.preventDefault();
										const nombre = productoForm.nombre.trim();
										const precio = Number(productoForm.precio);
										const categoria = productoForm.categoria.trim();
										const imagen = productoForm.imagen.trim();
										const descripcion = productoForm.descripcion.trim();
										const stock = Number(productoForm.stock);
										if (!nombre || !precio || precio <= 0 || !categoria || isNaN(stock) || stock < 0) {
											setProductoMensaje('Completa los campos requeridos con valores validos.');
											return;
										}
										const nuevo = {
											id: Date.now(),
											title: nombre,
											price: precio,
											image: imagen || '',
											description: descripcion,
											category: categoria,
											stock,
										};
										setProductos((prev) => [nuevo, ...prev]);
										setProductoForm({ nombre: '', precio: '', categoria: '', imagen: '', descripcion: '', stock: '' });
										setProductoMensaje('Producto registrado correctamente.');
									}}
								>
									<input
										type="text"
										placeholder="Nombre del producto"
										value={productoForm.nombre}
										onChange={(e) => setProductoForm((p) => ({ ...p, nombre: e.target.value }))}
									/>
									<input
										type="number"
										placeholder="Precio"
										value={productoForm.precio}
										onChange={(e) => setProductoForm((p) => ({ ...p, precio: e.target.value }))}
									/>
									<input
										type="number"
										placeholder="Stock"
										value={productoForm.stock}
										onChange={(e) => setProductoForm((p) => ({ ...p, stock: e.target.value }))}
									/>
									<input
										type="text"
										placeholder="Categoria"
										value={productoForm.categoria}
										onChange={(e) => setProductoForm((p) => ({ ...p, categoria: e.target.value }))}
									/>
									<input
										type="url"
										placeholder="Imagen (URL)"
										value={productoForm.imagen}
										onChange={(e) => setProductoForm((p) => ({ ...p, imagen: e.target.value }))}
									/>
									<textarea
										placeholder="Descripcion"
										value={productoForm.descripcion}
										onChange={(e) => setProductoForm((p) => ({ ...p, descripcion: e.target.value }))}
									/>
									<button type="submit" className="productos__registro-btn">Registrar producto</button>
									{productoMensaje && <p className="productos__registro-mensaje">{productoMensaje}</p>}
								</form>
							</div>
						)}

				<div className="productos__grid">
					{productos.map((producto) => (
						<div key={producto.id} className="productos__card">
							<img src={producto.image} alt={producto.title} />
							<h3>{producto.title}</h3>
							<p className="productos__precio">${producto.price}</p>
							<div className="productos__acciones">
									{isLoggedIn && (
										<>
											<button
												className="productos__btn productos__btn--eliminar"
												onClick={() => handleEliminar(producto.id)}
												aria-label={`Eliminar ${producto.title}`}
											>
											    Eliminar
											</button>

										    <button
												className="productos__btn productos__btn--editar"
												onClick={() => handleEditar(producto.id)}
												aria-label={`Editar ${producto.title}`}
											>
												Editar

											</button>
										</>
									)}
									<span className="productos__cantidad">{cantidades[producto.id] || 0}</span>
									<button
										className="productos__btn productos__btn--agregar"
										onClick={() => handleAgregar(producto.id)}
										aria-label={`Agregar ${producto.title}`}
									>
										Agregar
									</button>
								</div>

						</div>
					))}
				</div>
			</div>
		</div>
	);
}


export default Productos;
