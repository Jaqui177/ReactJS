import { useEffect, useState } from 'react';
import api from './Services/api';
import './Productos.css';


function Productos() {
	const [productos, setProductos] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState("");
	const [cantidades, setCantidades] = useState({});
	const [registroNombre, setRegistroNombre] = useState("");
	const [registroPrecio, setRegistroPrecio] = useState("");
	const [registros, setRegistros] = useState([]);

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

	const handleRegistrarProducto = () => {
		const nombre = registroNombre.trim();
		const precio = registroPrecio.trim();
		if (!nombre || !precio) return;
		setRegistros((prev) => [
			...prev,
			{ id: Date.now(), nombre, precio },
		]);
		setRegistroNombre("");
		setRegistroPrecio("");
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

				<div className="productos__registro">
					<h2 className="productos__registro-titulo">Registrar producto</h2>
					<div className="productos__registro-form">
						<input
							type="text"
							placeholder="Nombre del producto"
							value={registroNombre}
							onChange={(e) => setRegistroNombre(e.target.value)}
						/>
						<input
							type="number"
							placeholder="Precio"
							value={registroPrecio}
							onChange={(e) => setRegistroPrecio(e.target.value)}
						/>
						<button
							type="button"
							className="productos__registro-btn"
							onClick={handleRegistrarProducto}
						>
							Registrar
						</button>
					</div>

					<table className="productos__registro-tabla">
						<thead>
							<tr>
								<th>Producto</th>
								<th>Precio</th>
							</tr>
						</thead>
						<tbody>
							{registros.length === 0 ? (
								<tr>
									<td colSpan="2">Sin registros aún</td>
								</tr>
							) : (
								registros.map((item) => (
									<tr key={item.id}>
										<td>{item.nombre}</td>
										<td>${item.precio}</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
				<div className="productos__grid">
					{productos.map((producto) => (
						<div key={producto.id} className="productos__card">
							<img src={producto.image} alt={producto.title} />
							<h3>{producto.title}</h3>
							<p className="productos__precio">${producto.price}</p>
							<div className="productos__acciones">
								<button
									className="productos__btn productos__btn--eliminar"
									onClick={() => handleEliminar(producto.id)}
									aria-label={`Eliminar ${producto.title}`}
								>
									Eliminar
								</button>
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
