'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { Users } from '../interfaces/interfaces'

export default function SignIn() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    const [token, setToken] = React.useState('')
    const [user, setUser] = React.useState<Users>({} as Users);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const isValid = ():boolean => {
        switch (true) {
          case email.trim().length === 0:
            return false;
          case password.trim().length === 0:
            return false;
        }
        return true;
    }
    const handleSignIn = async () => {
        if(isValid()) {
            try {
                const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
                })
                console.log(email, password)
                const {token, user} = response.data;
                setToken(token);
                setUser(user);
                localStorage.setItem('token', token);
            console.log(token, user)
            } catch (e:unknown) {
                console.log(e)
                alert('Error 500: Internal Server Error')
            }
        }

        // if (!user){
        //     setPopupMessage('Denegado');
        // } else {
        //     setPopupMessage('Aceptado')
        // }

        // setShowPopup(true);
        
    }

    return (
<div className="bg-black h-screen w-screen flex items-center justify-center">
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-t from-color3 to-color4">
    <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Bienvenido a Metal Pipes Sign In</h1>

        <p className="mt-4 text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
        eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
    </div>

    <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
            <label
                htmlFor="UserEmail"
                className="bg-white relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                <input
                    type="email"
                    id="UserEmail"
                    placeholder="Email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm peer h-8 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    onChange={event => setEmail(event.target.value)}
                    required
                />

                <span
                    className="absolute start-3 top-3 -translate-y-1/2 text-xs text-black transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                >
                    Email
                </span>
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                    </svg>
                </span>
            </label>
        </div>
        </div>

        <div>
        <label htmlFor="password" className="sr-only">Contraseña</label>

        <div className="relative">
            <label
                htmlFor="UserPassword"
                className="bg-white relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="UserPassword"
                    placeholder="Contraseña"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm peer h-8 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    onChange={event => setPassword(event.target.value)}
                    required
                />

                <span
                    className="absolute start-3 top-3 -translate-y-1/2 text-xs text-black transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                >
                    Contraseña
                </span>
            </label>
            <button
                className="absolute inset-y-0 right-0 flex items-center px-4 text-black"
                onClick={togglePasswordVisibility}
            >
                {isPasswordVisible ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                </svg>
                ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                )}
            </button>
        </div>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center justify-center flex-col">
                <p className="text-base text-black mb-2">
                    ¿Aún no tienes cuenta?&nbsp;
                    <a className="underline" href="/sign-up">Regístrate</a>
                </p>
                <p className="text-base text-black">
                    ¿Olvidaste tu contraseña?&nbsp;
                    <a className="underline" href="/reset-password">Recupérala</a>
                </p>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="inline-block rounded-lg bg-color1 px-5 py-3 text-base font-medium text-white transition hover:bg-color2"
                    onClick={handleSignIn}
                >
                    Inicia Sesión
                </button>
            </div>
        </div>
    </form>
    </div>
</div>
    )
}

function setPopupMessage(arg0: string) {
    throw new Error('Function not implemented.')
}
