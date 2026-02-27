import { useState, useEffect } from 'react';
import axios from 'axios';
import './carrito.css';

const Carrito = () => {
  const [carritos, setCarritos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar carritos y productos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_FAKESTORE_API_KEY || 'https://fakestoreapi.com';
        
        // Obtener todos los carritos
        const carritosResponse = await axios.get(`${API_URL}/carts`);
        
        // Obtener todos los productos para mostrar sus nombres
        const productosResponse = await axios.get(`${API_URL}/products`);
        
        setCarritos(carritosResponse.data);
        setProductos(productosResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar carritos:', err);
        setError('Error al cargar los carritos desde la API');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para obtener el nombre del producto por ID
  const obtenerNombreProducto = (productId) => {
    const producto = productos.find(p => p.id === productId);
    return producto ? producto.title : `Producto #${productId}`;
  };

  // Función para eliminar un producto de un carrito
  const handleEliminarProducto = (carritoId, productId) => {
    if (window.confirm('¿Eliminar este producto del carrito?')) {
      setCarritos((prev) =>
        prev.map((carrito) => {
          if (carrito.id !== carritoId) return carrito;
          return {
            ...carrito,
            products: carrito.products.filter((p) => p.productId !== productId),
          };
        })
      );
    }
  };

  // Función para eliminar un carrito completo
  const handleEliminarCarrito = async (carritoId) => {
    if (window.confirm('¿Eliminar este carrito?')) {
      try {
        const API_URL = import.meta.env.VITE_FAKESTORE_API_KEY || 'https://fakestoreapi.com';
        await axios.delete(`${API_URL}/carts/${carritoId}`);
        setCarritos(carritos.filter(carrito => carrito.id !== carritoId));
      } catch (err) {
        console.error('Error al eliminar carrito:', err);
        alert('Hubo un error al eliminar el carrito');
      }
    }
  };

  // Función para comprar un carrito
  const handleComprar = async (carritoId) => {
    if (window.confirm('¿Estás seguro de que deseas comprar este carrito?')) {
      try {
        const API_URL = import.meta.env.VITE_FAKESTORE_API_KEY || 'https://fakestoreapi.com';
        
        // Simular compra en la API
        await axios.delete(`${API_URL}/carts/${carritoId}`);
        
        // Actualizar el estado local
        setCarritos(carritos.filter(carrito => carrito.id !== carritoId));
        alert('¡Compra realizada con éxito!');
      } catch (err) {
        console.error('Error al comprar carrito:', err);
        alert('Hubo un error al realizar la compra');
      }
    }
  };

  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toISOString();
  };

  // Mostrar mensaje de carga
  if (loading) {
    return (
      <div className="carrito-container">
        <h1 className="titulo-carrito">Carrito de compras</h1>
        <div className="loading-message">Cargando carritos desde la API...</div>
      </div>
    );
  }

  // Mostrar mensaje de error
  if (error) {
    return (
      <div className="carrito-container">
        <h1 className="titulo-carrito">Carrito de compras</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h1 className="titulo-carrito">Carrito de compras</h1>
      <p className="api-info"></p>
      
      <div className="carritos-lista">
        {carritos.map((carrito) => (
          <div key={carrito.id} className="carrito-card">
            <div className="carrito-numero">{carrito.id}</div>
            <div className="carrito-fecha">{formatearFecha(carrito.date)}</div>
            
            <h3 className="productos-titulo">Productos</h3>
            <ul className="productos-lista">
              {carrito.products.map((producto, index) => (
                <li key={index} className="producto-item">
                  Producto #{producto.productId} — Cantidad {producto.quantity}
                  <button
                    className="btn-eliminar-producto"
                    onClick={() => handleEliminarProducto(carrito.id, producto.productId)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn-agregar-producto"
                    onClick={() => alert('Función de agregar pendiente')}
                  >
                    Agregar
                  </button>
                </li>
              ))}
            </ul>
            
            <button 
              className="btn-comprar-carrito"
              onClick={() => handleEliminarCarrito(carrito.id)}
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
      
      {carritos.length === 0 && (
        <div className="mensaje-vacio">
          <p>No hay carritos de compras disponibles</p>
        </div>
      )}
    </div>
  );
};

export default Carrito;
