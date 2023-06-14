'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    const [loading, setLoading] = React.useState<boolean>(false)
    const router = useRouter()

    const isValid = ():boolean => {
        switch (true){
            case newPassword.trim().length == 0:
                return false
        }
        return true
    }
    const handlePasswordChange = async (event: any) => {
        event.preventDefault()
        if(isValid()) {
            setLoading(true)
            try {
                const token = localStorage.getItem('token');
                if(!token) {
                    router.push('/sign-in')
                }
                const ENDPOINT = 'http://localhost:3000/users/password'
                const data = {
                    password: newPassword
                }
                const config = {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.patch(ENDPOINT, data, config)
                if(response){
                    alert('Contraseña cambiada correctamente');
                    router.push('/sign-in')
                }else{
                    alert('Error al cambiar contraseña')
                }
            } catch (e:unknown) {
                setLoading(false)
                alert(e)
            }
        }
    }

    return (
    <div className="h-screen w-screen flex items-center justify-center"
        style={{backgroundImage: 'url(/purple-background3.jpg)'}}>
        <img className="w-24 h-24 hover:cursor-pointer absolute top-6 left-6 animate-bounce" src="mpt.png" alt="Logo"
            onClick={event => window.location.href = "/"}/>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 backdrop-blur-lg rounded-md bg-white bg-opacity-25 ">
        <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-gray-100">Cambia tu contraseña</h1>

            <p className="mt-4 text-gray-100">
            Ingresa tu correo electrónico para recibir una contraseña
            temporal, con esta contraseña podrás acceder a tu cuenta.
            </p>
        </div>

        <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            
        {/* <div className="col-span-6 sm:col-span-3">
            <label
                htmlFor="password"
                className="block text-base font-medium text-gray-100"
            >
                Contraseña actual
            </label>
                <div className="relative">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="UserPassword"
                        name="password"
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                        onChange={event => setPassword(event.target.value)}
                    />
                    
                    <button
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-black"
                        onClick={(e) => {
                            e.preventDefault()
                            togglePasswordVisibility()
                        }}
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
            </div> */}
            <div className="col-span-6 sm:col-span-3">
            <label
                htmlFor="newPassword"
                className="block text-base font-medium text-gray-100"
            >
                Contraseña nueva
            </label>
                <div className="relative">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="UserNewPassword"
                        name="newPassword"
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                        onChange={event => setNewPassword(event.target.value)}
                    />
                    
                    <button
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-black"
                        onClick={(e) => {
                            e.preventDefault()
                            togglePasswordVisibility()
                        }}
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
            <button
                type="submit"
                className="w-full inline-block rounded-lg bg-color1 px-5 py-3 text-base font-medium text-white transition hover:bg-color2"
                onClick={handlePasswordChange}
            >{!loading ? (
                'Cambiar contraseña'
            ) : (
                <>
                Cargando&nbsp;
                <i id="button-i" className='fa fa-spinner fa-spin'></i>
                </>
            )}
            </button>
            </div>
        </form>
        </div>
    </div>
    )
}