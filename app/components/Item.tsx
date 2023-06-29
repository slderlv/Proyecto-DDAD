'use client'
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { Item, Schedule, Type } from "../../config/interfaces"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function Item() {
  const [item, setItem] = useState<Item>()
  const [author, setAuthor] = useState<string>("")
  const [editorial, setEditorial] = useState<string>("")
  const [publicationYear, setPublicationYear] = useState<string>("")
  const [details, setDetails] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [size, setSize] = useState<string>("")
  const [extras, setExtras] = useState<string>("")
  const [available, setAvailable] = useState<boolean>()
  const [endDate, setEndDate] = useState<string>("")
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [schedule, setSchedule] = useState<Schedule>()
  const [scheduleName, setScheduleName] = useState<string>("")
  const [scheduleDate, setScheduleDate] = useState<string>("")
  const router = useRouter()

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }
    const date: Date = new Date(dateString)
    const formattedDate: string = date.toLocaleDateString('es-ES', options)
    return formattedDate
  }

  const compareTime = (startTime: string): boolean => {
    if (!startTime) return false
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinutes = currentTime.getMinutes()
    const [endHour] = startTime.split(':').map(Number)
    if (endHour < currentHour) {
      return false
    } else if (endHour === currentHour && currentMinutes > 0) {
      return false
    }
    return true
  }

  const handleReservation = async () => {
    const formattedToday = format(new Date, "yyyy-MM-dd");
    const ENDPOINT = process.env.MS_RESERVES + '/reserves'
    const handlePost = async (data: any) => {
      const response = await toast.promise(axios.post(ENDPOINT, data), {
        loading: "Generando reserva... ",
        success: () => {
          router.push('/menu');
          return "Reserva generada con exito! ";
        },
        error: "Error en la reserva"
      })
    }
    let data
    if (item?.type.name === 'Libro') {
      data = {
        start_time: schedule?.start_time,
        end_time: schedule?.start_time,
        start_date: formattedToday,
        end_date: addDays(new Date(), schedule!.day_quantity),
        client_id: localStorage.getItem('clientID'),
        item_name: item.name
      }
      handlePost(data);
    }
    if (item?.type.name === 'Sala') {
      data = {
        start_time: schedule?.start_time,
        end_time: schedule?.end_time,
        start_date: formattedToday,
        client_id: localStorage.getItem('clientID'),
        item_name: item.name
      }
      handlePost(data);
    }

  }

  const descriptionBook = (description: string) => {
    const partes = description.split("/")
    setAuthor(partes[0])
    setEditorial(partes[1])
    setPublicationYear(partes[2])
    setDetails(partes[3])
  }

  const descriptionRoom = (description: string) => {
    const partes = description.split("/")
    setLocation(partes[0])
    setSize(partes[1])
    setExtras(partes[2])
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

  useEffect(() => {
    const getItem = async () => {
      const idItem = localStorage.getItem('selectedItemId')
      try {
        const ENDPOINT = process.env.MS_RESERVES + "/items/" + idItem
        const response = await axios.get(ENDPOINT)
        const responseData = response.data
        const selectedItem: Item = {
          price: responseData.price,
          id: responseData.id,
          name: responseData.name,
          description: responseData.description,
          type: responseData.type,
          reserves: responseData.reserves[response.data.reserves.length - 1]
        }
        setItem(selectedItem)

        if (selectedItem.type.name == "Libro") {
          descriptionBook(selectedItem.description)
          if (responseData.reserves.length > 0) {
            setEndDate(responseData.reserves[response.data.reserves.length - 1].end_date)
          }
          // console.log(available)
        }
        if (selectedItem.type.name === 'Sala') {
          descriptionRoom(selectedItem.description)
        }
      } catch (error: unknown) {
        console.log(error)
      }
    }
    getItem()
  }, [])

  useEffect(() => {
    const getTypes = async () => {
      try {
        const ENDPOINT = process.env.MS_RESERVES + '/types'
        const response = await axios.get<Type[]>(ENDPOINT)
        const types: Type[] = response.data

        if (item?.type.name === "Sala") {
          const salaSchedules = types.find((type) => type.name === "Sala")?.schedules
          if (salaSchedules) {
            salaSchedules?.sort((a, b) => a.id - b.id)
            setSchedules(salaSchedules)
          }
        } else if (item?.type.name === "Libro") {
          const libroSchedules = types.find((type) => type.name === "Libro")?.schedules
          if (libroSchedules) {
            libroSchedules?.sort((a, b) => a.id - b.id)
            setSchedules(libroSchedules)
            setScheduleName(libroSchedules[0].name)
          }
        }
      } catch (error: unknown) {
        console.log(error)
      }
    }
    getTypes()
  }, [item])

  useEffect(() => {
    if (item?.type.name === 'Libro') {
      const selectedSchedule = schedules.find((schedule) => schedule.name === scheduleName)
      setSchedule(selectedSchedule)
    }
    if (item?.type.name === 'Sala') {
      const selectedSchedule = schedules.find((schedule) => schedule.start_time === scheduleDate)
      if (selectedSchedule?.end_time) {
        setSchedule(selectedSchedule)
      }
    }
  }, [scheduleName, scheduleDate, item, schedules])

  useEffect(() => {
    if (item && schedule) {
      const getAvailability = async () => {
        const ENDPOINT = process.env.MS_RESERVES + `/availability/${item?.name}/${schedule?.start_time}`
        if (item.type.name == 'Sala' && !compareTime(schedule?.start_time!)) {
          setAvailable(false)
          return
        }
        try {
          const response = await axios.get(ENDPOINT)
          setAvailable(response.data)
        } catch (error: unknown) {
          console.log(error)
        }
      }
      getAvailability()
    }
  }, [item, schedule])

  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <img className="w-24 h-24 hover:cursor-pointer absolute top-6 left-6" src="mpt.png" alt="Logo"
        onClick={event => window.location.href = "/menu"} />
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img className="w-full h-full" alt="default book"
          src={item?.id ? `${item?.id}.jpg` : "book.jpg"} />
      </div>

      <div className="xl:w-3/5 md:w-2/3 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">Id: {item?.id}</p>
          <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">{item?.name}</h1>
        </div>
        <div className="my-2">
          {item?.type.name === "Sala" && (
            <>
              <p>Ubicación: {location}</p>
              <p>Aforo: {size}</p>
              <p>Extras: {extras}</p>
            </>
          )}
          {item?.type.name === "Libro" && (
            <>
              <p>Autor: {author}</p>
              <p>Editorial: {editorial}</p>
              <p>Año de publicación: {publicationYear}</p>
              <p>Detalles: {details}</p>
            </>
          )}
        </div>

        <div className="w-full px-3 sm:w-1/2">
          {available || item?.type.name === "Sala" ? (
            <div className="mb-5">
              <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                Tiempo de préstamo
              </label>
              <select
                name="time"
                id="time"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(event) => {
                  if (item?.type.name === 'Libro') {
                    setScheduleName(event.target.value)
                  }
                  if (item?.type.name === 'Sala') {
                    setScheduleDate(event.target.value)
                  }
                }}
              >
                {schedules.map((schedule) =>
                  item?.type.name === "Sala" ? (
                    <option key={schedule.id} value={schedule.start_time}>
                      {schedule.name} ({schedule.start_time}-{schedule.end_time})
                    </option>
                  ) : (
                    <option value={schedule.name}>{schedule.name}</option>
                  )
                )}
              </select>
            </div>
          ) : null}
        </div>


        {available ? (
          <button className="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none"
            onClick={handleReservation}>
            <svg className="mr-3 text-white dark:text-gray-900" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.66699 4.83333V4.84166" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.333 11.5V11.5083" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Reservar
          </button>
        ) : (
          <button className="hover:cursor-default dark:bg-white dark:text-gray-900 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 focus:outline-none">
            <svg className="mr-3 text-white dark:text-gray-900" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.66699 4.83333V4.84166" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.333 11.5V11.5083" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item?.type.name === 'Libro' ? (
              <>
                Fecha estimada de reposición: {formatDate(endDate)}
              </>
            ) : (
              "No disponible"
            )}
          </button>
        )}


      </div>
      <Toaster
        position="bottom-right"
      />
    </div>
  )
}