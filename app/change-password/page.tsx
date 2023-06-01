'use client'
import React, { useState } from 'react';
import '../../styles/reset-password.css';

export default function ResetPasswordCode() {
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');

  const handleChangePassword = () => {
    if (password !== passwordVerification) {
        return alert('Contraseñas no coinciden');
    }
    let str = passwordVerification + password;
    alert(str)
  };

  return (
    <div id="panel">
      <form id="container" onSubmit={handleChangePassword}>
        <input
            value={password}
            type="password"
            placeholder='Nueva contraseña'
            required
            onChange={event => setPassword(event.target.value)}
        />
        <input
            value={passwordVerification}
            type="password"
            placeholder='Repetir contraseña'
            required
            onChange={event => setPasswordVerification(event.target.value)}
        />
        <input
            type="submit"
            value="Cambiar contraseña"
        />
      </form>
    </div>
  );
}