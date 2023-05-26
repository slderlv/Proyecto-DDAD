'use client'
import '../../styles/sign-in.css'
import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { User } from '../interfaces/interfaces'

export default function SignIn() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [token, setToken] = React.useState('')
    const [user, setUser] = React.useState<User>({} as User);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        console.log(email, password)
        const response = await axios.post('http://localhost:3000/auth/login', {
            email,
            password
        })
        const {token, user} = response.data;
        
        setToken(token);
        setUser(user);

        // if (!user){
        //     setPopupMessage('Denegado');
        // } else {
        //     setPopupMessage('Aceptado')
        // }

        // setShowPopup(true);
        localStorage.setItem('token', token);
        console.log(token, user)
    }

    return (
        <div id="panel">
            <form id="container" onSubmit={handleLogin}>
                <input value={email} id="email" type="email" maxLength={320} placeholder="Correo electrónico" required onChange={handleEmailChange}></input>
                <input value={password} id="password" type="password" maxLength={25} placeholder="Contraseña" required onChange={handlePasswordChange}></input>
                <input id="sign-in-submit" type="submit" value="Ingresar"></input>
            </form>
            {
            token && (
                <div>
                    <p>Token: {token}</p>
                    <p>User: {user.email}</p>
                </div>
            )}
        </div>
        
    )
}

function setPopupMessage(arg0: string) {
    throw new Error('Function not implemented.')
}
