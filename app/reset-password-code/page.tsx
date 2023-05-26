'use client'
import React, { useState } from 'react';
import '../../styles/reset-password.css';
import { useRouter } from 'next/navigation';

export default function ResetPasswordCode() {
  const [code, setCode] = useState('');

  const handleResetPasswordCode = () => {
    
  };
  const handleClick = () => {
    const router = useRouter();
    router.push('../reset-password');
  };

  return (
    <div id="panel">
      <form id="container" onSubmit={handleResetPasswordCode}>
        <input
            value={code}
            type="number"
            max={9999}
            min={1000}
            onChange={event => setCode(event.target.value)}
        />
        <input
            type="submit"
            value="Recuperar contraseña"
        />
        <button onClick={handleClick}>
            Reenviar código
        </button>
      </form>

    </div>
  );
}
