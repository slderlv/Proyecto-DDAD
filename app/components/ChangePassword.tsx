'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordVisibleConfirmation, setIsPasswordVisibleConfirmation] = useState(false)

  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const isValid = (): boolean => {
    switch (true) {
      case newPassword.trim().length == 0:
        toast("Ingrese contraseña", {
          icon: "⚠"
        })
        return false

      case newPassword.trim().length <= 3:
        toast("Contraseña poco segura", {
          icon: "⚠"
        })
        return false

      case newPassword !== newPasswordConfirmation:
        toast("Las contraseñas no coinciden", {
          icon: "⚠"
        })
        return false
    }
    return true
  }

  useEffect(() => {
    const validateToken = async () => {
      const ENDPOINT = process.env.MS_USERS + "/users/profile"
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/sign-in')
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const response = await axios.get(ENDPOINT, config)
      } catch (error: unknown) {
        console.log(error)
        router.push("/sign-in")
      }
    }
    validateToken()
  })

  const handlePasswordChange = async (event: any) => {
    event.preventDefault()
    if (isValid()) {
      setLoading(true)
      try {
        const token = localStorage.getItem('token');
        const handlePatch = async () => {
          const ENDPOINT = 'http://localhost:3000/users/password'
          const data = {
            password: newPassword
          }
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          const response = await toast.promise(axios.patch(ENDPOINT, data, config), {
            loading: "Cambiando contraseña...",
            success: () => {
              const TOKEN_CLOSE_ENDPOINT = 'http://localhost:3000/token/close'
              const TOKEN_CLOSE_DATA = {
                jwt: token
              }
              axios.post(TOKEN_CLOSE_ENDPOINT, TOKEN_CLOSE_DATA)

              router.push('/sign-in');
              setLoading(false);


              return "Contraseña cambiada con exito"
            },
            error: () => {
              setLoading(false);
              return "Error al cambiar contraseña"
            }
          });

        }
        handlePatch();
        // toast('Hola',  { hideProgressBar: true, autoClose: 2000, type: 'success' })
        // if (response) {
        //   alert('Contraseña cambiada correctamente');
        // } else {
        //   alert('Error al cambiar contraseña')
        // }
      } catch (e: unknown) {
        setLoading(false)
        alert(e)
      }
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center"
      style={{ backgroundImage: 'url(/purple-background3.jpg)' }}>
      <img className="w-24 h-24 hover:cursor-pointer absolute top-6 left-6 animate-bounce" src="mpt.png" alt="Logo"
        onClick={event => window.location.href = "/menu"} />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 backdrop-blur-lg rounded-md bg-white bg-opacity-25 ">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-gray-100">Cambia tu contraseña</h1>

          <p className="mt-4 text-gray-100">
            Ingresa tu nueva contraseña, una vez ingresada te
            redirigiremos al inicio de sesión para que accedas a tu cuenta.
          </p>
        </div>

        <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">

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
                  setIsPasswordVisible((prevState) => !prevState)
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
            <label
              htmlFor="newPasswordConfirmation"
              className="block text-base font-medium text-gray-100"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={isPasswordVisibleConfirmation ? "text" : "password"}
                id="UserNewPasswordConfirmation"
                name="newPasswordConfirmation"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                onChange={event => setNewPasswordConfirmation(event.target.value)}
              />

              <button
                className="absolute inset-y-0 right-0 flex items-center px-4 text-black"
                onClick={(e) => {
                  e.preventDefault()
                  setIsPasswordVisibleConfirmation((prevState) => !prevState)
                }}
              >
                {isPasswordVisibleConfirmation ? (
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
            // onClick= {toast('Hola', { hideProgressBar: true, autoClose: 2000, type: 'success' })}
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
      <Toaster
        position='bottom-right'
      />
    </div>
  )
}