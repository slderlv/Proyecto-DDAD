'use client'
import { Reserve } from "@/config/interfaces"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

function isGreaterThanToday(date: string): boolean {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Obtener la fecha actual en formato "YYYY-MM-DD"

  return formattedDate < date;
}

function formatDate(date: string): string {
  const originDate = new Date(date);
  const year = originDate.getFullYear();
  const month = originDate.getMonth() + 1;
  const day = originDate.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return formattedDate;
}

export default function Reserves() {
  const [reserves, setReserves] = useState<Reserve[]>([])
  const [data, setData] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const getReserves = async () => {
      const clientId = localStorage.getItem('clientID')
      const ENDPOINT = process.env.MS_RESERVES + '/reserves/' + clientId
      try {
        const response = await axios.get(ENDPOINT)
        const responseData: Reserve[] = response.data
        if (responseData) {
          setData(true)
        }
        setReserves(responseData)
      } catch (error: unknown) {
        console.log(error)
      }
    }
    getReserves()
  }, [])

  const handleCancellation = async (id: number) => {
    const ENDPOINT = process.env.MS_RESERVES + "/reserves/" + id
    try {
      const response = await axios.patch(ENDPOINT)
      if (response) {
        alert("Reserva cancelada correctamente")
        router.push("/menu")
      }
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-radial from-color3 via-color2 to-color1 flex justify-center items-center">
      <img className="w-24 h-24 hover:cursor-pointer absolute top-6 left-6" src="mpt.png" alt="Logo"
        onClick={event => window.location.href = "/menu"} />
      {data ? (
        <div className="flex flex-col bg-gray-100 rounded-md w-2/3">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-y-auto max-h-[80vh]">
                <table className="w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">ID Reserva</th>
                      <th scope="col" className="px-6 py-4">Nombre</th>
                      <th scope="col" className="px-6 py-4">Fecha de inicio</th>
                      <th scope="col" className="px-6 py-4">Fecha límite</th>
                      <th scope="col" className="px-6 py-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reserves.map((reserve) => {
                      let rowClassName = "border-b border-primary-200 bg-primary-100 text-neutral-800";
                      let state: string = "Pendiente"
                      if (reserve.cancelled) {
                        rowClassName = "border-b border-warning-200 bg-warning-100 text-neutral-800"
                        state = "Cancelado"
                      } else if (!reserve.pending) {
                        rowClassName = "border-b border-success-200 bg-success-100 text-neutral-800"
                        state = "Entregado"
                      } else if (reserve.pending && !isGreaterThanToday(reserve.end_date!)) {
                        rowClassName = "border-b border-danger-200 bg-danger-100 text-neutral-800"
                        state = "Fuera de plazo"
                      }

                      return (
                        <tr key={reserve.id} className={rowClassName}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            #{reserve.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{reserve.item.name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{reserve.start_date}</td>
                          <td className="whitespace-nowrap px-6 py-4">{formatDate(reserve.end_date!)}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {state === "Pendiente" ? (
                              <>
                                {state} (
                                <button className="text-primary-500 underline" onClick={() => handleCancellation(reserve.id)}>
                                  Cancelar
                                </button>
                                )
                              </>
                            ) : (
                              state
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div role="status" className="text-gray-100 text-lg">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 animate-spin dark:text-gray-100 fill-color1"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>Cargando...
          </div>
        </div>
      )}
    </div>
  )
}