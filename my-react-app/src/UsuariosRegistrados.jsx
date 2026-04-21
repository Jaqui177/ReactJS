import { useEffect, useState } from 'react';
import axios from 'axios';
import './UsuariosRegistrados.css';

const USERS_STORAGE_KEY = 'users';
const REGISTRADOS_STORAGE_KEY = 'usuarios_registrados';

const emptyUser = {
  id: 0,
  nombre: '',
  apellidos: '',
  direccion: '',
  telefono: '',
  correo: '',
  username: '',
  password: '',
};

const mapToUserShape = (user) => ({
  id: user.id || Date.now(),
  nombre: user.nombre || user.name?.firstname || '',
  apellidos: user.apellidos || user.name?.lastname || '',
  direccion:
    user.direccion ||
    (user.address
      ? `${user.address.street || ''} ${user.address.number || ''} ${user.address.city || ''} ${user.address.zipcode || ''}`.trim()
      : ''),
  telefono: user.telefono || user.phone || '',
  correo: user.correo || user.email || '',
  username: user.username || user.nombre || '',
  password: user.password || '',
});

const toStorageShape = (user) => ({
  id: user.id,
  nombre: user.nombre,
  apellidos: user.apellidos,
  direccion: user.direccion,
  telefono: user.telefono,
  correo: user.correo,
  username: user.username,
  password: user.password,
  email: user.correo,
});

const readStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

const writeStorage = (key, list) => {
  localStorage.setItem(key, JSON.stringify(list));
};

const UsuariosRegistrados = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [registroNombre, setRegistroNombre] = useState('');
  const [registroPassword, setRegistroPassword] = useState('');
  const [registroEmail, setRegistroEmail] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:3000/api';
        const response = await axios.get(`${API_URL}/usuarios`);

        const usuariosApi = (response.data || []).map(mapToUserShape);
        const usuariosLocales = readStorage(USERS_STORAGE_KEY).map(mapToUserShape);
        const registradosLocales = readStorage(REGISTRADOS_STORAGE_KEY).map(mapToUserShape);

        const merged = [...usuariosApi];
        for (const localUser of usuariosLocales) {
          const exists = merged.some(
            (u) =>
              (u.username && localUser.username && u.username === localUser.username) ||
              (u.correo && localUser.correo && u.correo === localUser.correo)
          );
          if (!exists) merged.push(localUser);
        }

        setUsuarios(merged);
        setUsuariosRegistrados(registradosLocales);
        writeStorage(USERS_STORAGE_KEY, merged.map(toStorageShape));
        setError(null);
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
        setError('Error al cargar los usuarios desde la API');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const persistUsers = (next) => {
    setUsuarios(next);
    writeStorage(USERS_STORAGE_KEY, next.map(toStorageShape));
  };

  const persistRegisteredUsers = (next) => {
    setUsuariosRegistrados(next);
    writeStorage(REGISTRADOS_STORAGE_KEY, next.map(toStorageShape));
  };

  const handleEditar = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    if (!usuario) return;
    setUsuarioEditando({ ...usuario });
    setEditando(true);
  };

  const handleCancelar = () => {
    setEditando(false);
    setUsuarioEditando(null);
  };

  const handleGuardar = () => {
    if (!usuarioEditando) return;

    const nextUsuarios = usuarios.map((u) => (u.id === usuarioEditando.id ? usuarioEditando : u));
    persistUsers(nextUsuarios);

    const nextRegistrados = usuariosRegistrados.map((u) =>
      u.id === usuarioEditando.id ? usuarioEditando : u
    );
    persistRegisteredUsers(nextRegistrados);

    setEditando(false);
    setUsuarioEditando(null);
  };

  const handleCambio = (campo, valor) => {
    setUsuarioEditando((prev) => ({
      ...(prev || emptyUser),
      [campo]: valor,
    }));
  };

  const handleEliminar = (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    const nextUsuarios = usuarios.filter((u) => u.id !== id);
    const nextRegistrados = usuariosRegistrados.filter((u) => u.id !== id);
    persistUsers(nextUsuarios);
    persistRegisteredUsers(nextRegistrados);
  };

  const handleRegistrarUsuario = () => {
    const nombre = registroNombre.trim();
    const email = registroEmail.trim();
    const password = registroPassword.trim();

    if (!nombre || !email || !password) return;

    const nuevo = {
      id: Date.now(),
      nombre,
      apellidos: '',
      direccion: '',
      telefono: '',
      correo: email,
      username: nombre,
      password,
    };

    const nextUsuarios = [nuevo, ...usuarios];
    const nextRegistrados = [nuevo, ...usuariosRegistrados];

    persistUsers(nextUsuarios);
    persistRegisteredUsers(nextRegistrados);

    setRegistroNombre('');
    setRegistroEmail('');
    setRegistroPassword('');
  };

  if (loading) {
    return (
      <div className="usuarios-registrados-container">
        <h1 className="titulo-usuarios">Usuarios</h1>
        <div className="loading-message">Cargando usuarios desde la API...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="usuarios-registrados-container">
        <h1 className="titulo-usuarios">Usuarios</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="usuarios-registrados-container">
      <h1 className="titulo-usuarios">Registrar Usuarios</h1>

      <div className="usuarios-registro">
        <div className="usuarios-registro-contenedor">
          <h2 className="usuarios-registro-titulo">Formulario de Registro</h2>
          <form
            className="usuarios-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegistrarUsuario();
            }}
          >
            <label htmlFor="registroNombre">Nombre de usuario</label>
            <input
              id="registroNombre"
              type="text"
              value={registroNombre}
              onChange={(e) => setRegistroNombre(e.target.value)}
            />

            <label htmlFor="registroEmail">Email</label>
            <input
              id="registroEmail"
              type="email"
              value={registroEmail}
              onChange={(e) => setRegistroEmail(e.target.value)}
            />

            <label htmlFor="registroPassword">Password</label>
            <input
              id="registroPassword"
              type="password"
              value={registroPassword}
              onChange={(e) => setRegistroPassword(e.target.value)}
            />

            <button type="submit" className="usuarios-registro-btn usuarios-registro-btn--green">
              Registrar
            </button>
          </form>
        </div>

        <div className="tabla-container tabla-container--registro">
          <h2 className="titulo-usuarios-registrados">Tabla de usuarios que registras</h2>
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {usuariosRegistrados.length === 0 ? (
                <tr>
                  <td colSpan={4}>Sin usuarios registrados todavía.</td>
                </tr>
              ) : (
                usuariosRegistrados.map((usuario) => (
                  <tr key={`reg-${usuario.id}`}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.password}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

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
                <label>Direccion:</label>
                <input
                  type="text"
                  value={usuarioEditando.direccion}
                  onChange={(e) => handleCambio('direccion', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Telefono:</label>
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
        <h2 className="titulo-usuarios-registrados">Tabla general de usuarios</h2>
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Username</th>
              <th>Password</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={9}>No hay usuarios disponibles.</td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellidos}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.username}</td>
                  <td>{usuario.password}</td>
                  <td>
                    <button className="btn-editar" onClick={() => handleEditar(usuario.id)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button className="btn-eliminar" onClick={() => handleEliminar(usuario.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosRegistrados;
