'use client'
import React from 'react'
import axios from 'axios'
import { Users } from '../interfaces/interfaces'

export default function SignIn() {
  const [email, setEmail] = React.useState('')
  const [token, setToken] = React.useState('')
  const [user, setUser] = React.useState<Users>({} as Users);
  const [popupMessage, setPopupMessage] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);


  const isValid = ():boolean => {
    if (email.trim().length === 0) return false;
    return true;
  }
  const handleResetPassword = async () => {
      if (isValid()) {
        try {
            const response = await axios.post('http://localhost:3000/forgot', {
                email
            })
            const {token, user} = response.data;
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            console.log(token, user)
            if(!(typeof window === undefined)) { window.history.pushState(null, '', '/sign-in'); window.location.reload(); }
        } catch (e: unknown) {
            console.log(e);
            alert('Error 505: Internal Server Error')
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
        <h1 className="text-2xl font-bold sm:text-3xl">Recupera tu contraseña</h1>

        <p className="mt-4 text-gray-500">
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
                    type="email"
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
          >
              Enviar código
          </button>
        </div>
    </form>
    </div>
</div>
    )
}

function setPopupMessage(arg0: string) {
    throw new Error('Function not implemented.')
}
