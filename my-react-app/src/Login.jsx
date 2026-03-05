import React, { useState } from 'react';
import './Login.css';

function Login({ onClose, fullPage = false }) {
  const [view, setView] = useState('login'); // 'login' | 'create' | 'change'

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
      localStorage.setItem('currentUser', JSON.stringify(user));
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
        <div className="login-header">
          <h3>{view === 'login' ? 'Iniciar Sesión' : view === 'create' ? 'Crear Cuenta' : 'Cambiar Contraseña'}</h3>
          {!fullPage && <button className="close-btn" onClick={() => onClose && onClose()}>✕</button>}
        </div>

        {view === 'login' && (
          <form className="login-form" onSubmit={handleLogin}>
            <label>Usuario o Email</label>
            <input value={inputUser} onChange={(e) => setInputUser(e.target.value)} />
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="btn-acceder">Acceder</button>
          </form>
        )}

        {view === 'create' && (
          <form className="login-form" onSubmit={handleCreate}>
            <label>Usuario</label>
            <input value={createUsername} onChange={(e) => setCreateUsername(e.target.value)} />
            <label>Email</label>
            <input value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} />
            <label>Contraseña</label>
            <input type="password" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
            <button type="submit" className="btn-acceder">Crear cuenta</button>
          </form>
        )}

        {view === 'change' && (
          <form className="login-form" onSubmit={handleChange}>
            <label>Usuario o Email</label>
            <input value={inputUser} onChange={(e) => setInputUser(e.target.value)} />
            <label>Contraseña actual</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <label>Nueva contraseña</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button type="submit" className="btn-acceder">Cambiar contraseña</button>
          </form>
        )}

        <div className="login-footer">
          <div className="login-message">{message}</div>
          <div className="login-actions">
            <button className="btn-left" onClick={() => setView('create')}>Crear cuenta</button>
            <button className="btn-right" onClick={() => setView('change')}>Cambiar contraseña</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
