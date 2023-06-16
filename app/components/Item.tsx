'use client'
import { useEffect, useState } from "react";
import { useItemContext } from "@/contexts/ItemContext";
import { addDays, format } from "date-fns";
import {Item, Schedule, Type} from "../../config/interfaces"
import axios from "axios";

const formattedToday = format(new Date, "yyyy-MM-dd");

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
    const [time, setTime] = useState<string>("00:00")
    const [date, setDate] = useState<string>("")
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [schedule, setSchedule] = useState<Schedule>()

    const handleReservation = async () => {
      const formattedToday = format(new Date, "yyyy-MM-dd");
        const ENDPOINT = 'http://localhost:3005/reserves'
        /* let data
        if(item?.type.name==='libro'){
            data = {
                start_time: schedule?.start_time,
                end_time: schedule?.start_time,
                start_date: formattedToday,
                end_date: addDays(new Date(), schedule!.day_quantity),
                client_id: number,
                item_name: item.name
            }
        }
        if(item?.type.name==='sala'){
            data = {
                start_time: schedule?.start_time,
                end_time: schedule?.end_time,
                start_date: string,
                end_date: string,
                client_id: number,
                item_name: item.name
            }
        }
        const response = await axios.post(ENDPOINT, data) */
    }

    const descriptionBook = (description: string) => {
        const partes = description.split(", ");
        if (partes.length >= 1) {
          setAuthor(partes[0])
        }
        if (partes.length >= 2) {
          setEditorial(partes[1])
        }
        if (partes.length >= 3) {
          setPublicationYear(partes[2])
        }
        if (partes.length >= 4) {
          setDetails(partes.slice(3).join(", "))
        }
    }
    const descriptionRoom = (description: string) => {
        const partes = description.split(", ");
        if (partes.length >= 1) {
          setLocation(partes[0])
        }
        if (partes.length >= 2) {
          setSize(partes[1])
        }
        if (partes.length >= 3) {
          setExtras(partes.slice(2).join(", "))
        }
    }

    useEffect(() => {
      const selectedItem = localStorage.getItem('selectedItem');
      if (selectedItem) {
          const parsedItem: Item = JSON.parse(selectedItem)
          setItem(parsedItem)
      }
    },[])
    useEffect(()=>{
      if(item){
        if(item?.type.name==='sala'){
          descriptionRoom(item.description)
        }
        if(item?.type.name==='libro'){
          descriptionBook(item.description)
        }
        const getAvailability = async () => {
          const ENDPOINT = `http://localhost:3005/availability/${item?.name}/${schedule?.start_time}`
          const response = await axios.get(ENDPOINT)
          setAvailable(response.data)
        }
        const getTypes = async () => {
          try{
              const ENDPOINT = 'http://localhost:3005/types'
              const response = await axios.get<Type[]>(ENDPOINT)
              const types: Type[] = response.data
              
              if (item?.type.name === "sala") {
                const salaSchedules = types.find((type) => type.name === "sala")?.schedules; 
                  if (salaSchedules) {
                    setSchedules(salaSchedules);
                  }
                } else if (item?.type.name === "libro") {
                  const libroSchedules = types.find((type) => type.name === "libro")?.schedules;
                  if (libroSchedules) {
                    setSchedules(libroSchedules);
                  }
                }
          } catch(e){
              console.log(e)
          }
        }
        getAvailability()
        getTypes()
        console.log()
      }
    },[item])
      
    return (
<div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
  <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
    <img className="w-full h-full" alt="default book" src="book.jpg" />
  </div>
  
  <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
    <div className="border-b border-gray-200 pb-6">
      <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">Id: {item?.id}</p>
      <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">{item?.name}</h1>
    </div>
    <div className="my-2">
          {item?.type.name === "sala" && (
            <>
              <p>Ubicación: {location}</p>
              <p>Aforo: {size}</p>
              <p>Extras: {extras}</p>
            </>
          )}
          {item?.type.name === "libro" && (
            <>
              <p>Autor: {author}</p>
              <p>Editorial: {editorial}</p>
              <p>Año de publicación: {publicationYear}</p>
              <p>Detalles: {details}</p>
            </>
          )}
    </div>
    
    <div className="-mx-3 flex flex-wrap">
  <div className="w-full px-3 sm:w-1/2">
    <div className="mb-5">
      <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
        Time
      </label>
      <select
        name="time"
        id="time"
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        onChange={(event) => {
          const selectedSchedule = schedules.find((schedule) => schedule.name === event.target.value);
          setSchedule(selectedSchedule);
          alert(schedule);
        }}
      >
        {schedules.map((schedule) =>
          item?.type.name === "sala" ? (
            <option key={schedule.id} value={schedule.start_time}>
              {schedule.name} ({schedule.start_time}-{schedule.end_time})
            </option>
          ) : <option value={schedule.name}>{schedule.name}</option>
        )}
      </select>
    </div>
  </div>
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
    ): (
        <button className="hover:cursor-default dark:bg-white dark:text-gray-900 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 focus:outline-none" 
        onClick={()=>alert(location)}>
        <svg className="mr-3 text-white dark:text-gray-900" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.66699 4.83333V4.84166" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.333 11.5V11.5083" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        No disponible
        </button>
    )}
    

  </div>
  
  {/* <div className="flex items-center justify-center p-12">
  <div className="mx-auto w-full max-w-[550px]">
    <form action="https://formbold.com/s/FORM_ID" method="POST">
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="fName"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              First Name
            </label>
            <input
              type="text"
              name="fName"
              id="fName"
              placeholder="First Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="lName"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lName"
              id="lName"
              placeholder="Last Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <label
          htmlFor="guest"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          How many guest are you bringing?
        </label>
        <input
          type="number"
          name="guest"
          id="guest"
          placeholder="5"
          min="0"
          className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      

      <div className="mb-5">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Are you coming to the event?
        </label>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              type="radio"
              name="radio1"
              id="radioButton1"
              className="h-5 w-5"
            />
            <label
              htmlFor="radioButton1"
              className="pl-3 text-base font-medium text-[#07074D]"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="radio1"
              id="radioButton2"
              className="h-5 w-5"
            />
            <label
              htmlFor="radioButton2"
              className="pl-3 text-base font-medium text-[#07074D]"
            >
              No
            </label>
          </div>
        </div>
      </div>

      <div>
        <button
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div> */}
</div>

)}