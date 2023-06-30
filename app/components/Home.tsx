'use client'
import React from 'react'

export default function Home() {
  return (
    <section className="bg-black text-white h-screen flex items-center">
      <div
        className="mx-auto w-screen px-4 py-32 lg:flex lg:h-screen lg:items-center"
        style={{ backgroundImage: 'url(/purple-background.jpg)' }}
      >
        <div className="mx-auto max-w-3xl text-center backdrop-blur-lg p-10 rounded-md bg-white bg-opacity-5">
          <h1
            className="bg-gradient-to-r from-color4 via-color3 to-color2 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
          >
            Sistema de Registros.

            <span className="sm:block"> Metal Pipes Team. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            ¡Bienvenido a nuestro sistema de registros Metal Pipes Team!
            Regístrate ahora o inicia sesión si ya estás registrado.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 bg-color1 px-12 py-3 text-sm font-medium text-white hover:bg-color2 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/sign-up"
            >
              Regístrate
            </a>

            <a
              className="block w-full rounded border border-blue-600 bg-color1 px-12 py-3 text-sm font-medium text-white hover:bg-color2 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/sign-in"
            >
              Inicia Sesión
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}