'use client'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [city, setCity] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const regex = /^[a-z0-9]+(?:\.[a-z0-9]+){0,5}@[a-z0-9]+(?:\.[a-z0-9]{2,15}){1,5}$/;

  const isValid = ():boolean => {
    switch (true) {
      case firstName.trim().length === 0:
        alert('Ingrese un nombre')
        return false
      case lastName.trim().length === 0:
        alert('Ingrese un apellido')
        return false
      case email.trim().length === 0:
        alert('Ingrese un correo electrónico')
        return false
      case city.trim().length === 0:
        alert('Seleccione una ciudad')
        return false
      case password.trim().length === 0:
        alert('Ingrese una contraseña')
        return false  
      case passwordConfirmation.trim().length === 0:
        alert('Confirme la contraseña')
        return false  
      case password!== passwordConfirmation:
        alert('Las contraseñas no coinciden')
        return false
      case (!regex.test(email)):
        alert('Ingrese un correo electrónico válido');
        return false;
    }
    return true;
  }
  const handleSignUp = async (event: any) => {
    event.preventDefault()
    if(isValid()) {
      setLoading(true)
      try {
        
        const ENDPOINT = 'http://localhost:3000/users/register'
        const data = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          city: city,
          password: password,
        }
        const response = await axios.post(ENDPOINT, data)
        if(response){
          alert('Usuario creado correctamente')
          router.push('/sign-in')
        }
        setLoading(false)
      } catch (e: unknown) {
        setLoading(false)
        alert(e)
        return [];
      }
    }
    
  }
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
        onClick={event => window.location.href = "/"}/>
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
          <option value="coquimbo">Coquimbo</option>
          <option value="laSerena">La Serena</option>
          <option value="ovalle">Ovalle</option>
          <option value="copiapo">Copiapó</option>
          <option value="antofagasta">Antofagasta</option>
          <option value="illapel">Illapel</option>
          <option value="vallenar">Vallenar</option>
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
  </div>
</section>

    )
}