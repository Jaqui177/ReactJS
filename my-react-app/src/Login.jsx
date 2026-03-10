import React, { useState } from 'react';
import './Login.css';
import { useAuth} from './AuthContext';


function Login({ onClose, fullPage = false }) {
  const [view, setView] = useState('login'); 
  const { login } = useAuth();
  const [inputUser, setInputUser] = useState('');
  const [password, setPassword] = useState('');

  const [createUsername, setCreateUsername] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [message, setMessage] = useState('');
 
  const loadUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
  const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

  const handleLogin = (e) => {
    e.preventDefault();
    const users = loadUsers();
    const user = users.find(u => u.username === inputUser || u.email === inputUser);
    if (user && user.password === password) {
      setMessage('Acceso exitoso');
      login(user);
      setTimeout(() => {
        setMessage('');
        onClose && onClose();
      }, 700);
    } else {
      setMessage('Usuario o contraseña incorrectos');
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!createUsername || !createEmail || !createPassword) {
      setMessage('Completa todos los campos');
      return;
    }
    const users = loadUsers();
    if (users.some(u => u.username === createUsername || u.email === createEmail)) {
      setMessage('Usuario o email ya existe');
      return;
    }
    const newUser = { id: Date.now(), username: createUsername, email: createEmail, password: createPassword };
    users.push(newUser);
    saveUsers(users);
    setMessage('Cuenta creada correctamente');
    setTimeout(() => {
      setMessage('');
      setView('login');
      setCreateUsername('');
      setCreateEmail('');
      setCreatePassword('');
    }, 900);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const users = loadUsers();
    const user = users.find(u => u.username === inputUser || u.email === inputUser);
    if (!user) {
      setMessage('Usuario no encontrado');
      return;
    }
    if (user.password !== currentPassword) {
      setMessage('Contraseña actual incorrecta');
      return;
    }
    if (!newPassword) {
      setMessage('Nueva contraseña vacía');
      return;
    }
    user.password = newPassword;
    saveUsers(users);
    setMessage('Contraseña actualizada');
    setTimeout(() => {
      setMessage('');
      setView('login');
      setInputUser('');
      setCurrentPassword('');
      setNewPassword('');
    }, 900);
  };

  const containerClass = fullPage ? 'login-page' : 'login-overlay';
  const modalClass = fullPage ? 'login-modal login-modal--page' : 'login-modal';

  return (
    <div className={containerClass}>
      <div className={modalClass}>
        {!fullPage && <button className="close-btn" onClick={() => onClose && onClose()}>✕</button>}
        
        {view === 'login' && (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="user-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="white" opacity="0.9"/>
                <circle cx="40" cy="30" r="12" fill="#4DB8C4"/>
                <path d="M20 65C20 55 28 48 40 48C52 48 60 55 60 65" fill="#4DB8C4"/>
              </svg>
            </div>

            <div className="input-group">
              <span className="input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Username" 
                value={inputUser} 
                onChange={(e) => setInputUser(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <span className="input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="white"/>
                </svg>
              </span>
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            

            {message && <div className="login-message">{message}</div>}

            <button type="submit" className="btn-signin">Sign In</button>

            <div className="create-account-section">
              <p>Not a member?</p>
              <button type="button" className="btn-create-account" onClick={() => setView('create')}>
                Crear cuenta
              </button>
            </div>
          </form>
        )}

        {view === 'create' && (
          <form className="login-form" onSubmit={handleCreate}>
            <h3 className="form-title">Crear cuenta</h3>
            
            <div className="input-group">
              <span className="input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Username" 
                value={createUsername} 
                onChange={(e) => setCreateUsername(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <span className="input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/>
                </svg>
              </span>
              <input 
                type="email" 
                placeholder="Email" 
                value={createEmail} 
                onChange={(e) => setCreateEmail(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <span className="input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="white"/>
                </svg>
              </span>
              <input 
                type="password" 
                placeholder="Password" 
                value={createPassword} 
                onChange={(e) => setCreatePassword(e.target.value)} 
              />
            </div>

            {message && <div className="login-message">{message}</div>}

            <button type="submit" className="btn-signin">Crear Cuenta</button>

            <div className="crear-Cuenta">
              <p>Already have an cuenta?</p>
              <button type="button" className="btn-crear-cuenta" onClick={() => setView('login')}>
                Sign In
              </button>
            </div>
          </form>
        )}

        {view === 'change' && (
          <form className="login-form" onSubmit={handleChange}>
            <h3 className="form-title">Change Password</h3>
            
            <div className="input-group">
              <span className="input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Username or Email" 
                value={inputUser} 
                onChange={(e) => setInputUser(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <span className="input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="white"/>
                </svg>
              </span>
              <input 
                type="password" 
                placeholder="Current Password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <span className="input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="white"/>
                </svg>
              </span>
              <input 
                type="password" 
                placeholder="New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>

            {message && <div className="login-message">{message}</div>}

            <button type="submit" className="btn-signin">Change Password</button>

            
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
