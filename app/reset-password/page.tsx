'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import '../../styles/reset-password.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
/* import sendEmail from '../email/email';
 */
export default function ResetPassword() {
  const [email, setEmail] = React.useState('');
  const router = useRouter();

  const handleClickEnviarCorreo = async () => {
    console.log(email);
    const respone = await axios.post('http://localhost:3000/forgot',{
      email
    });
    
    console.log(respone.data[1]);
    const password = respone.data[1];
    
    console.log(password);
    localStorage.setItem('newPass',password);
    // router.push('../reset-password-code');
    // const codigo = Math.floor(1000 + Math.random() * 9000);
    // const destinatario = email;
    // const asunto = 'Código de verificación';
    // const contenido = `Tu código de verificación es ${codigo}`;
    /* sendEmail(destinatario, asunto, contenido); */
  };

  return (
    <div id="panel">
      <form id="container" onSubmit={handleClickEnviarCorreo}>
        <input
          type="email"
          placeholder="Correo electrónico"
          maxLength={320}
          required
          onChange={event => setEmail(event.target.value)}
        />
        <input
          id="form-button"
          type="submit"
          value="Enviar código"
        />
      </form>
    </div>
  );
}

