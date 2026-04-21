import { useEffect, useState } from 'react';
import api from './Services/api';
import './Categorias.css';

const PRODUCTOS_STORAGE_KEY = 'productos_registrados';

const leerProductosLocales = () => {
  try {
    return JSON.parse(localStorage.getItem(PRODUCTOS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const normalizarProducto = (p) => ({
  id: p.id || Date.now(),
  nombre: p.title || p.nombre || 'Producto sin nombre',
  categoria: p.category || p.categoria || 'Sin categoria',
  precio: Number(p.price || p.precio || 0),
});

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadCategorias = async () => {
      try {
        setLoading(true);
        setError('');

        const locales = leerProductosLocales().map(normalizarProducto);
        let apiProductos = [];

        try {
          const response = await api.get('/productos');
          apiProductos = Array.isArray(response.data) ? response.data.map(normalizarProducto) : [];
        } catch {
          // Si la API falla, mostramos locales
        }

        const merged = [...apiProductos];
        for (const local of locales) {
          const exists = merged.some(
            (p) =>
              (p.id && local.id && p.id === local.id) ||
              (p.nombre === local.nombre && p.categoria === local.categoria)
          );
          if (!exists) merged.push(local);
        }

        const groupedMap = merged.reduce((acc, producto) => {
          const key = producto.categoria || 'Sin categoria';
          if (!acc[key]) acc[key] = [];
          acc[key].push(producto);
          return acc;
        }, {});

        const grouped = Object.entries(groupedMap).map(([nombreCategoria, productos]) => ({
          nombreCategoria,
          productos,
        }));

        if (isMounted) {
          setCategorias(grouped);
          localStorage.setItem(PRODUCTOS_STORAGE_KEY, JSON.stringify(merged));
        }
      } catch {
        if (isMounted) {
          setError('No se pudieron cargar las categorias.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCategorias();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="categorias">
      <div className="categorias__contenedor">
        <h2 className="categorias__titulo">Categorias y productos</h2>
        <p className="categorias__descripcion">Aqui se muestran las categorias de la nueva API y los productos que vas registrando.</p>

        {loading && <p className="categorias__estado">Cargando...</p>}
        {error && <p className="categorias__error">{error}</p>}

        {!loading && !error && (
          <div className="categorias__grid">
            {categorias.length === 0 ? (
              <article className="categoria__card">
                <h3 className="categoria__titulo">Sin categorias</h3>
                <p className="categoria__texto">Aun no hay productos registrados para mostrar.</p>
              </article>
            ) : (
              categorias.map((cat) => (
                <article className="categoria__card" key={cat.nombreCategoria}>
                  <h3 className="categoria__titulo">{cat.nombreCategoria}</h3>
                  <p className="categoria__texto">{cat.productos.length} producto(s)</p>
                  <ul className="categoria__productos">
                    {cat.productos.map((prod) => (
                      <li key={`${cat.nombreCategoria}-${prod.id}`} className="categoria__producto-item">
                        {prod.nombre} - ${prod.precio.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Categorias;
