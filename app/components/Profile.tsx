'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { City, UserProfile } from '@/config/interfaces'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [user, setUser] = useState<UserProfile>({} as UserProfile)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [cities, setCities] = useState<City[]>([])
  const [city, setCity] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [img, setImg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/sign-in')
      }
      const ENDPOINT = 'http://localhost:3000/users/profile'
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(ENDPOINT, config)
      /* const dataResponse: UserProfile = response.data */
      if (response.data) {
        const userProfile: UserProfile = {
          email: response.data[0],
          city: response.data[1],
          role: response.data[2],
          userInformationId: {
            id: response.data[3].id,
            first_name: response.data[3].first_name,
            last_name: response.data[3].last_name,
            nickname: response.data[3].nickname,
            profile_image: response.data[3].profile_image
          }
        }
        setUser(userProfile)
        setFirstName(userProfile.userInformationId!.first_name)
        setLastName(userProfile.userInformationId!.last_name)
        if (userProfile.userInformationId!.nickname) {
          setUsername(userProfile.userInformationId!.nickname)
        }
        setCity(userProfile.city)
      }
    }
    getProfile()
  }, [])
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

  const isValid = (): boolean => {
    switch (true) {
      case username.trim().length === 0:
        alert('Ingrese un apodo válido')
        return false;
      case firstName.trim().length === 0:
        alert('Ingrese un nombre válido')
        return false;
      case lastName.trim().length === 0:
        alert('Ingrese un apellido válido')
        return false;
    }
    return true;
  }
  const handleProfileChange = async (event: any) => {
    event.preventDefault()
    if (isValid()) {
      setLoading(true)
      try {
        const token = localStorage.getItem('token');
        const ENDPOINT = process.env.MS_USERS + '/users/edit'
        const data = {
          nickname: username,
          first_name: firstName,
          last_name: lastName,
          city: city
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        const response = await axios.patch(ENDPOINT, data, config)
        console.log(response)
        if (response) {
          alert('Perfil actualizado correctamente')
          router.push('/menu')
        } else {
          setLoading(false)
          alert('Error al actualizar el perfil')
        }
      } catch (e: unknown) {
        setLoading(false)
        alert(e)
      }
    }
  }

  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center"
      style={{ backgroundImage: 'url(/purple-background4.jpg)', backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <img className="w-24 h-24 hover:cursor-pointer absolute top-6 left-6 animate-bounce" src="mpt.png" alt="Logo"
        onClick={event => window.location.href = "/menu"} />
      <div className="flex justify-center w-1/2 mx-auto max-w-screen-xl bg-gradient-to-t from-color2 to-color1 shadow-lg rounded-sm">

        <div className="flex flex-col justify-center w-3/4 mx-4 my-10 px-20 backdrop-blur-lg p-2 rounded-md bg-white bg-opacity-5">
          <form className="space-y-3">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-base font-medium text-gray-100"
              >
                Nombre
              </label>

              <input
                type="text"
                id="FirstName"
                name="first_name"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                onChange={event => setFirstName(event.target.value)}
                value={firstName}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="LastName"
                className="block text-base font-medium text-gray-100"
              >
                Apellido
              </label>

              <input
                type="text"
                id="LastName"
                name="last_name"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                onChange={event => setLastName(event.target.value)}
                value={lastName}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="Username" className="block text-base font-medium text-gray-100">
                Apodo
              </label>

              <input
                type="text"
                id="Username"
                name="username"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm p-2"
                onChange={event => setUsername(event.target.value)}
                value={username}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="Cities" className="block text-base font-medium text-gray-100">
                Ciudad
              </label>

              <select
                name="cities"
                id="Cities"
                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-base p-2"
                onChange={event => setCity(event.target.value)}
                value={city}
              >
                <option value="">Seleccione una opción</option>
                {cities.map(city => (
                  <option key={city.city} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full inline-block rounded-lg bg-color1 px-5 py-3 text-base font-medium text-white transition hover:bg-color2"
                onClick={handleProfileChange}
                disabled={loading}
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
          </form>
        </div>
      </div>
    </div>
  )
}