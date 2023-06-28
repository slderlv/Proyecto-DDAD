'use client'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { Toaster, toast } from 'react-hot-toast'

export default function ResetPassword() {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const regex = /^[a-z0-9]+(?:\.[a-z0-9]+){0,5}@[a-z0-9]+(?:\.[a-z0-9]{2,15}){1,5}$/;

  const isValid = ():boolean => {
    if (!regex.test(email)) {
        alert('Ingrese un correo electrónico válido');
        return false;
    }
    return true;
  }
  const handleResetPassword = async (event: any) => {
    event.preventDefault()
    if(isValid()) {
        setLoading(true)
        try {
            const ENDPOINT = 'http://localhost:3000/forgot'
            const data = {
                email: email,
            }
            const handlePost = async () => {
                try {
                    const response = await toast.promise(axios.post(ENDPOINT, data), {
                        loading: "Enviando contraseña...",
                        success: () => {
                            router.push('/sign-in')
                            return "Contraseña enviada con exito"
                        },
                        error: () => {
                            setLoading(false);
                            return "Error con el envio"
                        }
                    })
                } catch (err) {
                    console.error(err);
                }
            }
            handlePost()
            // const response = await axios.post(ENDPOINT, data)
            // if(response){
            //     alert('Contraseña enviada correctamente');
            //     router.push('/sign-in')
                
            // }else{
            //     alert('Error al enviar contraseña')
            // }
            // console.log(response.data)
        } catch (e:unknown) {
            console.log(e)
            // alert(e)
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
        <h1 className="text-2xl font-bold sm:text-3xl text-gray-100">Recupera tu contraseña</h1>

        <p className="mt-4 text-gray-100">
        Ingresa tu correo electrónico para recibir una contraseña
        temporal, con esta contraseña podrás acceder a tu cuenta.
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
                    type="text"
                    id="UserEmail"
                    placeholder="Email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm peer h-8 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    onChange={event => setEmail(event.target.value)}
                    required
                />

                <span
                    className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
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

        <div className="flex items-center justify-between">
          <button
              type="submit"
              className="w-full inline-block rounded-lg bg-color1 px-5 py-3 text-base font-medium text-white transition hover:bg-color2"
              onClick={handleResetPassword}
              disabled={loading}
          >{!loading ? (
            'Enviar código'
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
    <Toaster
        position='bottom-right'
    />
</div>
    )
}