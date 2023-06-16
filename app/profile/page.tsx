'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { UserProfile } from '@/config/interfaces'
import { useRouter } from 'next/navigation'

export default function Profile() {
    const [user, setUser] = useState<UserProfile>({} as UserProfile)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [img, setImg] = useState<string|null>(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter()
    const handleButtonClick = () => {
        if(fileInputRef.current) fileInputRef.current.click();
    };
    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);/* ESTO RETORNA UN BLOB:LOCALHOST:3000...ETC NO SE QUE WEA HACE */
            alert(imageUrl)
            setImg(imageUrl);
          }
        console.log(file);
    };
  
    useEffect(() => {
        const getProfile = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
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
            if (response.data){
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
                if(userProfile.userInformationId!.nickname){
                    setUsername(userProfile.userInformationId!.nickname)
                }
                setCity(userProfile.city)
            }
        }
        getProfile()
    }, [])

    const isValid = ():boolean => {
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
        if(isValid()) {
            try {
                const token = localStorage.getItem('token');
                const ENDPOINT = 'http://localhost:3000/users/edit'
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
                if(response){
                    alert('Perfil actualizado correctamente')
                    router.push('/menu')
                } else {
                    alert('Error al actualizar el perfil')
                }
            } catch (e:unknown) {
                alert(e)
            }
        }
    }

    return (
<div className="bg-black h-screen w-screen flex items-center justify-center"
    style={{backgroundImage: 'url(/purple-background4.jpg)', backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
    <img className="w-24 h-24 hover:cursor-pointer absolute top-6 left-6 animate-bounce" src="mpt.png" alt="Logo"
        onClick={event => window.location.href = "/menu"}/>
    <div className="flex mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-t from-color2 to-color1 shadow-lg"
    style={{height: "40rem", width: "70rem"}}>
        <div className="flex flex-col mx-auto w-1/4 items-center justify-center">
            <img src={user.userInformationId && user.userInformationId.profile_image ? user.userInformationId.profile_image : 'metalpipe.jpg'} alt="Descripción de la imagen" className="rounded-full w-52 h-52 max-w-full max-h-full mb-5"/>
            <div>
                <input
                    type="file"
                    accept=".jpg"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImgChange}
                />
                <button className="inline-block rounded-lg bg-color1 px-5 py-3 text-base font-medium text-white transition hover:bg-color2" 
                onClick={handleButtonClick}>Seleccionar imagen</button>
            </div>
        </div>

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
                <option value="coquimbo">Coquimbo</option>
                <option value="laSerena">La Serena</option>
                <option value="ovalle">Ovalle</option>
                <option value="copiapo">Copiapó</option>
                <option value="antofagasta">Antofagasta</option>
                <option value="illapel">Illapel</option>
                <option value="vallenar">Vallenar</option>
                </select>
            </div>
            <div className="flex items-center justify-between">
            <button
                type="submit"
                className="w-full inline-block rounded-lg bg-color1 px-5 py-3 text-base font-medium text-white transition hover:bg-color2"
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
        </form>
    </div>
    </div>
</div>
    )
}