import { useEffect, useState } from "react";
import "./Categorias.css";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCategorias = async () => {
      try {
        setLoading(true);
        setError("");
        const resp = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        if (!resp.ok) {
          throw new Error("Error al cargar categorias");
        }
        const data = await resp.json();
        if (isMounted) {
          setCategorias(Array.isArray(data.categories) ? data.categories : []);
        }
      } catch (err) {
        if (isMounted) {
          setError("No se pudieron cargar las categorias.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
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
        <h2 className="categorias__titulo">Categorias</h2>
        <p className="categorias__descripcion">
          Explora las categorias disponibles de TheMealDB.
        </p>

        {loading && <p className="categorias__estado">Cargando...</p>}
        {error && <p className="categorias__error">{error}</p>}

        {!loading && !error && (
          <div className="categorias__grid">
            {categorias.map((cat) => (
              <article className="categoria__card" key={cat.idCategory}>
                <img
                  className="categoria__img"
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  loading="lazy"
                />
                <h3 className="categoria__titulo">{cat.strCategory}</h3>
                <p className="categoria__texto">
                  {cat.strCategoryDescription}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Categorias;
