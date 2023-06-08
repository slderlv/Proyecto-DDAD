'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { User_Information, Users } from '../interfaces/interfaces'

export default function Profile() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleButtonClick = () => {
        if(fileInputRef.current) fileInputRef.current.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // Aquí puedes realizar las acciones que desees con el archivo seleccionado
        console.log(file);
    };
  
    const user_info: User_Information = {
        birthdate: new Date("1990-01-01"),
        first_name: "John",
        last_name: "Frusciante"
    }
    const user1: Users = {
        id: 1,
        email: "algo@algo.com",
        city: "coquimbo",
        password: "123",
        role: null,
        createdAt: 0,
        info: user_info,
    }
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    const [error, setError] = React.useState('')
    const [token, setToken] = React.useState('')
    const [user, setUser] = React.useState<Users>(user1);
    const [popupMessage, setPopupMessage] = useState('')
    const [showPopup, setShowPopup] = useState(false)

    const isValid = ():boolean => {
        switch (true) {
            case username.trim().length === 0:
                setError('Ingrese un apodo válido')
                return false;
            case password.trim().length === 0:
                setError('Ingrese una contraseña')
                return false;
        }
        return true;
    }
    const handleProfileChange = async () => {
        if(isValid()) {
            try {
                const response = await axios.post('http://localhost:3000/auth/login', {
                    username,
                    password
                })
                console.log(username, password)
                const {token, user} = response.data;
                setToken(token);
                setUser(user);
                localStorage.setItem('token', token);
                console.log(token, user)
                alert('Acceso correcto')
                if(!(typeof window === undefined)) { window.history.pushState(null, '', '/menu'); window.location.reload(); }
            } catch (e:unknown) {
                console.log(e)
                alert('Error 500: Internal Server Error')
            }
        } else {
            alert(error)
        }
    }

    return (
<div className="bg-black h-screen w-screen flex items-center justify-center">
    <div className="flex mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-t from-color3 to-color4"
    style={{height: "40rem", width: "70rem"}}>
        <div className="flex flex-col mx-auto w-1/4 items-center justify-center">
            <img src="metalpipe.jpg" alt="Descripción de la imagen" className="rounded-full w-52 h-52 max-w-full max-h-full mb-5"/>
            <div>
                <input
                    type="file"
                    accept=".jpg"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <button className="inline-block rounded-lg bg-color1 px-5 py-3 text-base font-medium text-white transition hover:bg-color2" 
                onClick={handleButtonClick}>Seleccionar imagen</button>
            </div>
        </div>

        <form action="" className="w-3/4 mx-4 my-10 px-20 space-y-4 backdrop-blur-lg p-10 rounded-md bg-white bg-opacity-5">
        <div>
            <div>
                <h1 className="text-2xl font-bold sm:text-3xl mb-2">{user.info.first_name}&nbsp;{user.info.last_name}</h1>
                <label htmlFor="email" className="text-xl font-semibold sm:text-xl">Email</label>
                <h2 className="text-xl font-semibold sm:text-xl">{user.email}</h2>
            </div>
            <label htmlFor="username" className="sr-only">Apodo</label>

            <div className="relative">
                <label
                    htmlFor="Username"
                    className="bg-white relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                    <input
                        type="text"
                        id="Username"
                        placeholder="Apodo"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm peer h-8 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        onChange={event => setUsername(event.target.value)}
                        required
                    />

                    <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-black transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                    >
                        Apodo
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
            
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="inline-block rounded-lg bg-color1 px-5 py-3 text-base font-medium text-white transition hover:bg-color2"
                    onClick={handleProfileChange}
                >{!loading ? (
                    'Guardar cambios'
                  ) : (
                    <>
                      <span className='mx-3 border-spacing-1'>Cargando&nbsp;</span>
                      <i id="button-i" className='fa fa-spinner fa-spin'></i>
                    </>
                  )}
                </button>
            </div>
        </div>
    </form>
    </div>
</div>
    )
}