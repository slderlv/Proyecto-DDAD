'use client'
import React from 'react'
import '../../styles/sign-up.css'
import axios from 'axios'
export default function SignUp() {
    const [email, setEmail] = React.useState('')
    const [city, setCity] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password_verification, setPasswordVerification] = React.useState('')

    // esto falta editar
    const handleSignUp = async () => {
        if(password!== password_verification){
            return alert('Las contraseñas no coinciden')
        }
        const response = await axios.post('http://localhost:3000/users', {
            email,
            city,
            password
        })
    }
    // ----------------------------------------------------------------
    return (
        <div id="sign-up-panel">
            <form id="sign-up-container" onSubmit={handleSignUp}>
                <input value={email} 
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    maxLength={320}
                    required
                    onChange={event => setEmail(event.target.value)}></input>
                <input value={city}
                    id="city"
                    type="text"
                    placeholder="Ciudad"
                    maxLength={20}
                    required
                    onChange={event => setCity(event.target.value)}></input>
                <input value={password} 
                    id="password" 
                    type="password" 
                    placeholder="Contraseña"
                    maxLength={25} 
                    required
                    onChange={event => setPassword(event.target.value)}></input>
                <input value={password_verification} 
                    id="password_verification" 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    maxLength={25} 
                    required
                    onChange={event => setPasswordVerification(event.target.value)}></input>
                <input type="submit" value="Registrarse"></input>
            </form>
        </div>
    )
}