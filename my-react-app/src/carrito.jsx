import { useEffect, useMemo, useState } from 'react';
import './carrito.css';

const CARRITO_STORAGE_KEY = 'carrito_items';

const leerCarrito = () => {
  try {
    return JSON.parse(localStorage.getItem(CARRITO_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const guardarCarrito = (items) => {
  localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(items));
};

const Carrito = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(leerCarrito());
  }, []);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0), 0),
    [items]
  );

  const handleEliminarProducto = (id) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    guardarCarrito(next);
  };

  const handleReducir = (id) => {
    const next = items
      .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
      .filter((item) => item.quantity > 0);
    setItems(next);
    guardarCarrito(next);
  };

  const handleAumentar = (id) => {
    const next = items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    setItems(next);
    guardarCarrito(next);
  };

  const handleComprar = () => {
    if (!items.length) return;
    if (!window.confirm('¿Confirmas la compra de los productos agregados?')) return;
    setItems([]);
    guardarCarrito([]);
    alert('Compra realizada con exito.');
  };

  return (
    <div className="carrito-container">
      <h1 className="titulo-carrito">Carrito de compras</h1>

      {items.length === 0 ? (
        <div className="mensaje-vacio">
          <p>No hay productos en el carrito.</p>
          <p>Solo apareceran los que vayas agregando.</p>
        </div>
      ) : (
        <div className="carritos-lista">
          <div className="carrito-card">
            <h3 className="productos-titulo">Productos agregados</h3>
            <ul className="productos-lista">
              {items.map((item) => (
                <li key={item.id} className="producto-item">
                  {item.title} ({item.category}) - ${Number(item.price).toFixed(2)} x {item.quantity}
                  <button className="btn-eliminar-producto" onClick={() => handleReducir(item.id)}>
                    -1
                  </button>
                  <button className="btn-agregar-producto" onClick={() => handleAumentar(item.id)}>
                    +1
                  </button>
                  <button className="btn-eliminar-producto" onClick={() => handleEliminarProducto(item.id)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <p className="carrito-fecha">Total: ${total.toFixed(2)}</p>
            <button className="btn-comprar-carrito" onClick={handleComprar}>
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
