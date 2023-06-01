'use client'
import React from 'react'
import axios from 'axios'
import { User } from '../interfaces/interfaces'
import { Alert } from '../components/Alert';

export default function SignUp() {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [city, setCity] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
  const [token, setToken] = React.useState('')
  const [user, setUser] = React.useState<User>({} as User);
  const [error, setError] = React.useState('');
  

  const handleSignUp = async () => {
    switch(true){
      case firstName.trim() === '':
        setError('Ingrese el nombre')
        break;
      case lastName.trim() === '':
        setError('Ingrese su apellido')
        break;
      case email.trim() === '':
        setError('Ingrese su correo electrónico')
        break;
      case city === '':
        setError('Seleccione una ciudad')
        break;
      case password.trim() === '':
        setError('Ingrese su contraseña')
        break;
      case passwordConfirmation.trim() === '':
        setError('Confirme su contraseña')
        break;
      case password!== passwordConfirmation:
        setError('Las contraseñas no coinciden')
        break;
    }
    
    
    try {
      const response = await axios.post('http://localhost:3000/users', {
          firstName,
          lastName,
          email,
          city,
          password,
          passwordConfirmation
      })
      console.log(response)
      const {token, user} = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
    } catch (error) {
      console.log(error)
    }
    
  }
    // ----------------------------------------------------------------
    return (
<section className="bg-purple">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section
      className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
    >
      <img
        alt="purple background"
        src="ORLDWW0.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl animate-bounce">
          Bienvenido a Metal Pipes Team 
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
          dolorum aliquam, quibusdam aperiam voluptatum.
        </p>
      </div>
    </section>

    <main
      aria-label="Main"
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 h-full bg-gradient-to-tl from-color1 to-purple"
    >
      <div id="signup" className="max-w-xl lg:max-w-3xl p-7 bg-color4 shadow-lg shadow-black">
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
        <label htmlFor="HeadlineAct" className="block text-base font-medium text-gray-900">
          Ciudad
        </label>

        <select
          name="HeadlineAct"
          id="HeadlineAct"
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

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-color1 px-12 py-3 text-base font-medium text-white transition hover:bg-color2 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          onClick={handleSignUp}
        >
          Crea una cuenta
        </button>

        <p className="mt-4 text-base text-gray-500 sm:mt-0">
          ¿Ya tienes una cuenta?{" "}
          <a href="/sign-in" className="text-gray-700 underline">
            Inicia sesión
          </a>
          .
        </p>
          </div>
        </form>
      </div>
      {Alert(error==='',error)}
    </main>
  </div>
</section>

    )
}