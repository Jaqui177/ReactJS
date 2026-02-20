import { useEffect, useState } from 'react';
import api from './Services/api';
import './Productos.css';


function Productos() {
	const [productos, setProductos] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState("");

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
				<div className="productos__grid">
					{productos.map((producto) => (
						<div key={producto.id} className="productos__card">
							<img src={producto.image} alt={producto.title} />
							<h3>{producto.title}</h3>
							<p className="productos__precio">${producto.price}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}


export default Productos;
