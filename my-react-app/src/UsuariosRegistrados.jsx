import { useState, useEffect } from 'react';
import axios from 'axios';
import './UsuariosRegistrados.css';

const UsuariosRegistrados = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [registroNombre, setRegistroNombre] = useState("");
  const [registroUsername, setRegistroUsername] = useState("");
  const [registroEmail, setRegistroEmail] = useState("");
  const [registros, setRegistros] = useState([]);

  // Cargar usuarios desde la API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_FAKESTORE_API_KEY || 'https://fakestoreapi.com';
        const response = await axios.get(`${API_URL}/users`);
        
        // Mapear los datos de la API al formato que necesitamos
        const usuariosFormateados = response.data.map(user => ({
          id: user.id,
          nombre: user.name.firstname,
          apellidos: user.name.lastname,
          direccion: `${user.address.street} ${user.address.number} ${user.address.city} ${user.address.zipcode}`,
          telefono: user.phone,
          correo: user.email,
          username: user.username,
          password: user.password
        }));
        
        setUsuarios(usuariosFormateados);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
        setError('Error al cargar los usuarios desde la API');
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEditar = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    setUsuarioEditando({...usuario});
    setEditando(true);
  };

  const handleCancelar = () => {
    setEditando(false);
    setUsuarioEditando(null);
  };

  const handleGuardar = () => {
    setUsuarios(usuarios.map(u => 
      u.id === usuarioEditando.id ? usuarioEditando : u
    ));
    setEditando(false);
    setUsuarioEditando(null);
  };

  const handleCambio = (campo, valor) => {
    setUsuarioEditando({
      ...usuarioEditando,
      [campo]: valor
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    }
  };

  const handleRegistrarUsuario = () => {
    const nombre = registroNombre.trim();
    const username = registroUsername.trim();
    const email = registroEmail.trim();
    if (!nombre || !username || !email) return;
    setRegistros((prev) => [
      ...prev,
      { id: Date.now(), nombre, username, email }
    ]);
    setRegistroNombre("");
    setRegistroUsername("");
    setRegistroEmail("");
  };

  // Mostrar mensaje de carga
  if (loading) {
    return (
      <div className="usuarios-registrados-container">
        <h1 className="titulo-usuarios">Usuarios Registrados</h1>
        <div className="loading-message">Cargando usuarios desde la API...</div>
      </div>
    );
  }

  // Mostrar mensaje de error
  if (error) {
    return (
      <div className="usuarios-registrados-container">
        <h1 className="titulo-usuarios">Usuarios Registrados</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="usuarios-registrados-container">
      <h1 className="titulo-usuarios">Usuarios Registrados</h1>
      <p className="api-info"></p>

      <div className="usuarios-registro">
        <h2 className="usuarios-registro-titulo">Registrar usuario</h2>
        <div className="usuarios-registro-form">
          <input
            type="text"
            placeholder="Nombre"
            value={registroNombre}
            onChange={(e) => setRegistroNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={registroUsername}
            onChange={(e) => setRegistroUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={registroEmail}
            onChange={(e) => setRegistroEmail(e.target.value)}
          />
          <button
            type="button"
            className="usuarios-registro-btn"
            onClick={handleRegistrarUsuario}
          >
            Registrar
          </button>
        </div>

        <table className="usuarios-registro-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {registros.length === 0 ? (
              <tr>
                <td colSpan="3">Sin registros aún</td>
              </tr>
            ) : (
              registros.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Modal de edición */}
      {editando && usuarioEditando && (
        <div className="modal-overlay">
          <div className="modal-edicion">
            <h2>Editar Usuario</h2>
            <div className="form-edicion">
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={usuarioEditando.nombre}
                  onChange={(e) => handleCambio('nombre', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Apellidos:</label>
                <input
                  type="text"
                  value={usuarioEditando.apellidos}
                  onChange={(e) => handleCambio('apellidos', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Dirección:</label>
                <input
                  type="text"
                  value={usuarioEditando.direccion}
                  onChange={(e) => handleCambio('direccion', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Teléfono:</label>
                <input
                  type="text"
                  value={usuarioEditando.telefono}
                  onChange={(e) => handleCambio('telefono', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Correo:</label>
                <input
                  type="email"
                  value={usuarioEditando.correo}
                  onChange={(e) => handleCambio('correo', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={usuarioEditando.username}
                  onChange={(e) => handleCambio('username', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="text"
                  value={usuarioEditando.password}
                  onChange={(e) => handleCambio('password', e.target.value)}
                />
              </div>
              <div className="form-buttons">
                <button className="btn-guardar" onClick={handleGuardar}>
                  Guardar
                </button>
                <button className="btn-cancelar" onClick={handleCancelar}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="tabla-container">
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Username</th>
              <th>Password</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellidos}</td>
                <td>{usuario.direccion}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.username}</td>
                <td>{usuario.password}</td>
                <td>
                  <button 
                    className="btn-editar"
                    onClick={() => handleEditar(usuario.id)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button 
                    className="btn-eliminar"
                    onClick={() => handleEliminar(usuario.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosRegistrados;