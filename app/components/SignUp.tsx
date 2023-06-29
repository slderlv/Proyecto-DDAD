'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { City } from '@/config/interfaces'
import { Toaster, toast } from 'react-hot-toast'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [cities, setCities] = useState<City[]>([])
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const regex = /^[a-z0-9]+(?:\.[a-z0-9]+){0,5}@[a-z0-9]+(?:\.[a-z0-9]{2,15}){1,5}$/;

  const isValid = (): boolean => {
    switch (true) {
      case firstName.trim().length === 0:
        toast("Ingrese un nombre", {
          icon: "⚠"
        })
        return false
      case lastName.trim().length === 0:
        toast("Ingrese un apellido", {
          icon: "⚠"
        })
        return false
      case email.trim().length === 0:
        toast("Ingrese un correo electronico", {
          icon: "⚠"
        })
        return false
      case city.trim().length === 0:
        toast("Ingrese una ciudad", {
          icon: "⚠"
        })
        return false
      case password.trim().length === 0:
        toast("Ingrese una contraseña", {
          icon: "⚠"
        })
        return false
      case password.trim().length <= 3:
        toast("Contraseña poco segura", {
          icon: "⚠"
        })
        return false
      case passwordConfirmation.trim().length === 0:
        toast("Confirme la contraseña", {
          icon: "⚠"
        })
        return false
      case password !== passwordConfirmation:
        toast("Las contraseñas no coinciden", {
          icon: "⚠"
        })
        return false
      case (!regex.test(email)):
        toast("Ingrese un correo electronico valido", {
          icon: "⚠"
        })
        return false
    }
    return true
  }
  const handleSignUp = async (event: any) => {
    event.preventDefault()
    if (isValid()) {
      setLoading(true)
      try {
        const ENDPOINT = process.env.MS_USERS + '/users/register'
        const data = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          city: city,
          password: password,
        }
        const handlePost = async () => {
          try {
            const response = await toast.promise(axios.post(ENDPOINT, data), {

              loading: 'Enviando datos...',
              success: (data) => {
                // console.log(data)
                if (data) {

                  router.push('/sign-in')
                  return '¡Cuenta creada correctamente!';
                }
                return "Error"
              },
              error: (error) => {
                console.error('¡Ups! Algo salió mal.');
                console.error('Error:', error);

                setLoading(false);
                return 'El correo ya existe.';
              },
            });

            console.log('Respuesta:', response);
          } catch (error) {
            console.error(error);
          }
        };
        handlePost();


        setLoading(false)
      } catch (error: unknown) {
        setLoading(false)
        console.error(error);
      }
    }


  }
  useEffect(() => {
    const getCities = async () => {
      const ENDPOINT = process.env.MS_CITIES
      try {
        const response = await axios.get(ENDPOINT!)
        const responseCities: City[] = response.data
        setCities(responseCities)
      } catch (error: unknown) {
        console.log(error)
      }
    }
    getCities()
  }, [])

  return (
    <section className="bg-purple">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section
          className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
        >
          <img
            alt="purple background"
            src="purple-background2.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <img className="w-24 h-24 hover:cursor-pointer absolute top-6 left-6 animate-bounce" src="mpt.png" alt="Logo"
            onClick={event => window.location.href = "/"} />
          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Bienvenido a Metal Pipes Team
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Regístrate para empezar a usar nuestros servicios 🚀
            </p>
          </div>
        </section>


        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 h-full bg-gradient-to-tl from-color1 to-purple"
        >
          <div id="signup" className="max-w-xl lg:max-w-3xl p-7 bg-gradient-to-b from-color4 to-color3 shadow-lg shadow-black">
            <h1
              className="block text-3xl font-semibold text-gray-700"
            >¡Regístrate ahora!</h1>
            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-base font-medium text-gray-700"
                >
                  Nombre
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                  onChange={event => setFirstName(event.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-base font-medium text-gray-700"
                >
                  Apellido
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                  onChange={event => setLastName(event.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Email" className="block text-base font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                  onChange={event => setEmail(event.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Cities" className="block text-base font-medium text-gray-900">
                  Ciudad
                </label>

                <select
                  name="cities"
                  id="Cities"
                  className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-base p-2"
                  onChange={event => setCity(event.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  {cities.map(city => (
                    <option key={city.city} value={city.city}>
                      {city.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-base font-medium text-gray-700"
                >
                  Contraseña
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                  onChange={event => setPassword(event.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-base font-medium text-gray-700"
                >
                  Confirmación de contraseña
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                  onChange={event => setPasswordConfirmation(event.target.value)}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 ">
                <button
                  id='loadbutton'
                  className="inline-block w-1/2 rounded-md border border-blue-600 bg-color1 px-12 py-3 text-base font-medium text-white transition hover:bg-color2 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleSignUp}
                  disabled={loading}
                >{!loading ? (
                  'Crea una cuenta'
                ) : (
                  <>
                    Cargando&nbsp;
                    <i id="button-i" className='fa fa-spinner fa-spin'></i>
                  </>
                )}

                </button>

                <p className="mt-4 text-base text-gray-700 font-semibold sm:mt-0">
                  ¿Ya tienes una cuenta?{" "}
                  <a href="/sign-in" className="text-gray-700 underline">
                    Inicia sesión
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
        <Toaster
          position='bottom-right'
        />
      </div>
    </section>

  )
}