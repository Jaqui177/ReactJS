import { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onClose, fullPage = false }) => {
  const [page, setPage] = useState('main'); // main, login, register
  const [userType, setUserType] = useState(''); // cliente, admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success, error
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  const normalizeUsuario = (usuario) => {
    const email = (usuario.email || usuario.correo || usuario.mail || '').toString().trim().toLowerCase();
    const password = usuario.password || usuario.password_hash || usuario.pass || usuario.clave || '';
    const rawRole = usuario.tipo ?? usuario.rol ?? usuario.role ?? usuario.role_id ?? usuario.rol_id ?? '';
    const tipo = (() => {
      const value = rawRole?.toString().trim().toLowerCase();
      if (value === '1' || value === 'admin' || value === 'administrador') return 'admin';
      if (value === '2' || value === 'cliente' || value === 'user' || value === 'customer') return 'cliente';
      return value;
    })();

    return {
      ...usuario,
      email,
      password,
      nombre: usuario.nombre || usuario.name || usuario.nombre_usuario || '',
      tipo,
    };
  };

  // Cargar usuarios al montar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/usuarios`);
        const normalized = (Array.isArray(response.data) ? response.data : []).map(normalizeUsuario);
        setUsuarios(normalized);
        localStorage.setItem('usuariosCache', JSON.stringify(normalized));
        console.log('Usuarios cargados desde API:', normalized);
      } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        // Si falla, intenta cargar del cache local
        const cache = localStorage.getItem('usuariosCache');
        if (cache) {
          const cached = JSON.parse(cache);
          setUsuarios(Array.isArray(cached) ? cached.map(normalizeUsuario) : []);
          console.log('Usuarios cargados desde cache local');
        } else {
          setUsuarios([]);
        }
      }
    };
    fetchUsers();
  }, [API_URL]);

  const handleMainMenu = () => {
    setPage('main');
    setMessage('');
    setEmail('');
    setPassword('');
    setNombre('');
    setUserType('');
  };

  const handleLoginClick = (type) => {
    setUserType(type);
    setPage('login');
    setMessage('');
  };

  const handleRegisterClick = (type) => {
    setUserType(type);
    setPage('register');
    setMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email.trim() || !password.trim()) {
      setMessage('Completa email y contraseña');
      setMessageType('error');
      return;
    }

    if (usuarios.length === 0) {
      setMessage('No hay usuarios cargados. Recarga la página.');
      setMessageType('error');
      return;
    }

    const usuarioEncontrado = usuarios.find(
      (usuario) => (usuario.email || '').toLowerCase() === email.toLowerCase() && 
                    usuario.password === password &&
                    usuario.tipo === userType
    );

    if (usuarioEncontrado) {
      setMessage(`¡Bienvenido, ${usuarioEncontrado.nombre}!`);
      setMessageType('success');
      localStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));
      setTimeout(() => {
        handleMainMenu();
        if (onClose) onClose();
      }, 1000);
    } else {
      setMessage('Email, contraseña o tipo de usuario incorrecto');
      setMessageType('error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setMessage('Completa todos los campos');
      setMessageType('error');
      return;
    }

    const usuarioExistente = usuarios.find(
      (usuario) => (usuario.email || '').toLowerCase() === email.toLowerCase()
    );

    if (usuarioExistente) {
      setMessage('Este email ya está registrado');
      setMessageType('error');
      return;
    }

    try {
      setLoading(true);
      const nuevoUsuario = {
        nombre: nombre.trim(),
        email: email.toLowerCase(),
        password: password,
        tipo: userType,
      };

      try {
        // Intenta guardar en la API
        const response = await axios.post(`${API_URL}/usuarios`, nuevoUsuario);
        const normalizedResponse = normalizeUsuario(response.data);
        setMessage('¡Cuenta creada exitosamente!');
        setMessageType('success');
        localStorage.setItem('currentUser', JSON.stringify(normalizedResponse));
        
        // Actualiza el cache
        const newUsers = [...usuarios, normalizedResponse];
        localStorage.setItem('usuariosCache', JSON.stringify(newUsers));
      } catch (apiError) {
        console.warn('No se pudo conectar a la API, guardando localmente:', apiError.message);
        
        // Si falla la API, guarda localmente
        const nuevoUsuarioLocal = normalizeUsuario({
          id: Date.now(),
          nombre: nombre.trim(),
          email: email.toLowerCase(),
          password: password,
          tipo: userType,
        });
        
        const newUsers = [...usuarios, nuevoUsuarioLocal];
        setUsuarios(newUsers);
        localStorage.setItem('usuariosCache', JSON.stringify(newUsers));
        localStorage.setItem('currentUser', JSON.stringify(nuevoUsuarioLocal));
        
        setMessage('¡Cuenta creada exitosamente! (Almacenada localmente)');
        setMessageType('success');
      }
      
      setTimeout(() => {
        handleMainMenu();
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setMessage('Error al crear la cuenta');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={fullPage ? 'login-page' : 'login-overlay'}>
      <div className={`login-modal ${fullPage ? 'login-modal--page' : ''}`}>
        <button className="close-btn" onClick={() => onClose && onClose()}>X</button>

        {/* PÁGINA PRINCIPAL */}
        {page === 'main' && (
          <div className="select-role">
            <h2>¿Qué deseas hacer?</h2>
            <button className="btn-signin" onClick={() => handleLoginClick('cliente')}>
              Iniciar Sesión - Cliente
            </button>
            <button className="btn-signin" onClick={() => handleLoginClick('admin')}>
              Iniciar Sesión - Admin
            </button>
            <button className="btn-create-account" onClick={() => handleRegisterClick('cliente')}>
              Crear Cuenta - Cliente
            </button>
            <button className="btn-create-account" onClick={() => handleRegisterClick('admin')}>
              Crear Cuenta - Admin
            </button>
          </div>
        )}

        {/* PÁGINA DE LOGIN */}
        {page === 'login' && (
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Iniciar Sesión ({userType})</h2>
            <div className="input-group">
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-signin" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
            <button type="button" className="btn-back" onClick={handleMainMenu}>
              Volver
            </button>
          </form>
        )}

        {/* PÁGINA DE REGISTRO */}
        {page === 'register' && (
          <form className="login-form" onSubmit={handleRegister}>
            <h2>Crear Cuenta ({userType})</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-signin" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
            <button type="button" className="btn-back" onClick={handleMainMenu}>
              Volver
            </button>
          </form>
        )}

        {/* MENSAJE */}
        {message && <p className={`login-message ${messageType}`}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
