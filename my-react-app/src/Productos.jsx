import { useMemo, useState, useEffect } from 'react';
import api from './Services/api';
import './RegistrarProductos.css';

const PRODUCTOS_STORAGE_KEY = 'productos_registrados';
const CARRITO_STORAGE_KEY = 'carrito_items';

const formInicial = {
  nombre: '',
  precio: '',
  categoria: '',
  imagen: '',
  descripcion: '',
  stock: '',
};

const leerStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

const guardarStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

function RegistrarProductos() {
  const [formulario, setFormulario] = useState(formInicial);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const totalProductos = useMemo(() => productos.length, [productos]);

  useEffect(() => {
    const cargarProductos = async () => {
      const locales = leerStorage(PRODUCTOS_STORAGE_KEY);
      try {
        const response = await api.get('/productos');
        const apiProductos = Array.isArray(response.data)
          ? response.data.map((p) => ({
              id: p.id || Date.now(),
              nombre: p.title || p.nombre || '',
              precio: Number(p.price || p.precio || 0),
              categoria: p.category || p.categoria || 'Sin categoria',
              imagen: p.image || p.imagen || '',
              descripcion: p.description || p.descripcion || '',
              stock: Number(p.stock ?? 0),
            }))
          : [];

        const merged = [...apiProductos];
        for (const local of locales) {
          const exists = merged.some(
            (p) =>
              (p.id && local.id && p.id === local.id) ||
              (p.nombre === local.nombre && p.categoria === local.categoria)
          );
          if (!exists) merged.push(local);
        }
        setProductos(merged);
        guardarStorage(PRODUCTOS_STORAGE_KEY, merged);
      } catch {
        setProductos(locales);
      }
    };

    cargarProductos();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    if (!formulario.nombre.trim()) return 'Ingresa el nombre del producto.';
    if (!formulario.precio || Number(formulario.precio) <= 0) return 'Ingresa un precio valido.';
    if (!formulario.categoria.trim()) return 'Ingresa la categoria del producto.';
    if (!formulario.stock || Number(formulario.stock) < 0) return 'Ingresa un stock valido.';
    return '';
  };

  const handleSubmit = async (event) => {
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

    const next = [nuevoProducto, ...productos];
    setProductos(next);
    guardarStorage(PRODUCTOS_STORAGE_KEY, next);

    try {
      await api.post('/productos', {
        title: nuevoProducto.nombre,
        price: nuevoProducto.precio,
        category: nuevoProducto.categoria,
        image: nuevoProducto.imagen,
        description: nuevoProducto.descripcion,
        stock: nuevoProducto.stock,
      });
    } catch {
      // Se mantiene guardado en local aunque la API falle
    }

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
    const next = productos.filter((producto) => producto.id !== id);
    setProductos(next);
    guardarStorage(PRODUCTOS_STORAGE_KEY, next);
  };

  const handleAgregarAlCarrito = (producto) => {
    const carritoActual = leerStorage(CARRITO_STORAGE_KEY);
    const existente = carritoActual.find((item) => item.id === producto.id);
    let next;

    if (existente) {
      next = carritoActual.map((item) =>
        item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      next = [
        ...carritoActual,
        {
          id: producto.id,
          title: producto.nombre,
          price: producto.precio,
          category: producto.categoria,
          quantity: 1,
        },
      ];
    }

    guardarStorage(CARRITO_STORAGE_KEY, next);
  };

  return (
    <section className="registrar-productos">
      <div className="registrar-productos__contenedor">
        <div className="registrar-productos__encabezado">
          <h2>Registrar Productos</h2>
          <p>Agrega nuevos productos al catalogo de forma rapida y sencilla.</p>
        </div>

        <div className="registrar-productos__contenido">
          <form className="registrar-productos__formulario" onSubmit={handleSubmit}>
            <div className="registrar-productos__grupo">
              <label htmlFor="nombre">Nombre del producto</label>
              <input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} required />
            </div>
            <div className="registrar-productos__fila">
              <div className="registrar-productos__grupo">
                <label htmlFor="precio">Precio</label>
                <input type="number" id="precio" name="precio" value={formulario.precio} onChange={handleChange} min="0" required />
              </div>
              <div className="registrar-productos__grupo">
                <label htmlFor="stock">Stock</label>
                <input type="number" id="stock" name="stock" value={formulario.stock} onChange={handleChange} min="0" required />
              </div>
            </div>
            <div className="registrar-productos__grupo">
              <label htmlFor="categoria">Categoria</label>
              <input type="text" id="categoria" name="categoria" value={formulario.categoria} onChange={handleChange} required />
            </div>
            <div className="registrar-productos__grupo">
              <label htmlFor="imagen">Imagen (URL)</label>
              <input type="url" id="imagen" name="imagen" value={formulario.imagen} onChange={handleChange} />
            </div>
            <div className="registrar-productos__grupo">
              <label htmlFor="descripcion">Descripcion</label>
              <textarea id="descripcion" name="descripcion" rows="4" value={formulario.descripcion} onChange={handleChange}></textarea>
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
                <p>Aun no hay productos registrados.</p>
              </div>
            ) : (
              <div className="registrar-productos__grid">
                {productos.map((producto) => (
                  <div key={producto.id} className="registrar-productos__card">
                    <div className="registrar-productos__card-imagen">
                      {producto.imagen ? <img src={producto.imagen} alt={producto.nombre} /> : <span>Sin imagen</span>}
                    </div>
                    <div className="registrar-productos__card-info">
                      <h4>{producto.nombre}</h4>
                      <p className="registrar-productos__card-categoria">{producto.categoria}</p>
                      <p className="registrar-productos__card-descripcion">{producto.descripcion || 'Sin descripcion.'}</p>
                      <div className="registrar-productos__card-detalles">
                        <span>${producto.precio.toFixed(2)}</span>
                        <span>Stock: {producto.stock}</span>
                      </div>
                      <div className="registrar-productos__acciones">
                        <button type="button" className="registrar-productos__eliminar" onClick={() => handleEliminar(producto.id)}>
                          Eliminar
                        </button>
                        <button type="button" className="registrar-productos__boton registrar-productos__boton--primario" onClick={() => handleAgregarAlCarrito(producto)}>
                          Agregar al carrito
                        </button>
                      </div>
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
