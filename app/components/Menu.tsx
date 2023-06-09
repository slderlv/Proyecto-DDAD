'use client'
import { useEffect, useState } from "react";
import { SideMenu } from "../components/SideMenu";
import axios, { AxiosResponse } from "axios";
import { Item, UserProfile } from "@/config/interfaces";
import { useRouter } from "next/navigation";

export default function Menu() {
  const [render, setRender] = useState(false);
  const [items, setItems] = useState<Item[]>([])
  const [filter, setFilter] = useState<string>("")
  const [itemsDisplay, setItemsDisplay] = useState<Item[]>([])
  const [user, setUser] = useState<UserProfile>({} as UserProfile)
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const getItems = async () => {
      const ENDPOINT = process.env.MS_RESERVES + '/items'
      try {
        const response = await axios.get(ENDPOINT)
        const totalPages: number = response.data.meta.totalPages
        let itemList: Item[] = []
        for (let i = 1; i < totalPages + 1; i++) {
          const pageResponse = await axios.get(`${ENDPOINT}?page=${i}`)
          const pageItems: Item[] = pageResponse.data.items
          pageItems.forEach(item => {
            itemList.push(item)
          });
        }
        setItems(itemList)
        setItemsDisplay(itemList)
        setData(true)
      } catch (error: unknown) {
        console.log(error)
      }

    }
    getItems()
  }, [])

  useEffect(() => {
    if (filter && searchValue) {
      const filteredItems: Item[] = setOrderBy(filter)
      const foundProducts = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setItemsDisplay(foundProducts)
    } else if (filter) {
      const filteredItems: Item[] = setOrderBy(filter)
      setItemsDisplay(filteredItems)
      setRender(prevState => !prevState)
    } else if (searchValue) {
      const foundProducts = items.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setItemsDisplay(foundProducts)
    } else {
      setItemsDisplay(items)
    }
  }, [filter, searchValue])

  const setOrderBy = (option: string): Item[] => {
    console.log("Entra a la función OrderBy")
    switch (option) {
      case ('Title, DESC'):
        console.log("Entra al switch - case y se ordenan")
        return items.sort((a, b) => b.name.localeCompare(a.name))
      case ('Title, ASC'):
        return items.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return items
    }
  }

  const handleItemSelection = (item: Item) => {
    try {
      localStorage.setItem('selectedItemId', item!.id + "")
      router.push("/item")
    } catch (error: unknown) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/sign-in')
      }
      const ENDPOINT = process.env.MS_USERS + '/users/profile'
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const response = await axios.get(ENDPOINT, config)
        type Response = [
          string,
          string,
          string,
          {
            id: number,
            first_name: string,
            last_name: string,
            nickname: string | null,
            profile_image: string | null,
          }
        ]
        const dataResponse: Response = response.data
        const dataUser: UserProfile = {
          email: dataResponse[0],
          city: dataResponse[1],
          role: dataResponse[2],
          userInformationId: {
            id: dataResponse[3].id,
            first_name: dataResponse[3].first_name,
            last_name: dataResponse[3].last_name,
            nickname: dataResponse[3].nickname,
            profile_image: dataResponse[3].profile_image,
          }

        }
        setUser(dataUser)
        localStorage.setItem('clientID', dataUser.userInformationId!.id?.toString())
      } catch (error: unknown) {
        router.push('/sign-in')
      }
    }
    getProfile()
  }, [])

  return (
    <div className="flex">
      <div className="w-80 h-screen bg-gray-200 fixed left-0 top-0">
        <SideMenu {...user} />
      </div>
      <section className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ml-80">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Colección
          </h2>

          <p className="mt-4 max-w-md text-gray-900">
            Aquí podrás encontrar libros tanto recreativos como para estudiar. También podrás encontrar salas de estudio para pedir prestadas.
          </p>
        </header>

        <div className="mt-8 sm:flex sm:items-center sm:justify-between">
          <div className="block sm:hidden">
            <button
              className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
            >
              <span className="text-sm font-medium"> Filtros y ordenamiento </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex sm:gap-4">
            <div>
              <label htmlFor="FilterInput" className="flex items-center gap-2">
                <input
                  type="text"
                  id="FilterInput"
                  placeholder="Nombre del producto"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-2"
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="hidden sm:block">
            <label htmlFor="SortBy" className="sr-only">Ordenar por</label>

            <select id="SortBy" className="h-10 rounded border-gray-300 text-sm"
              onChange={(event) => {
                console.log("valor ingresado: " + event.target.value)
                setFilter(event.target.value)
              }}
            >
              <option value="Default">Ordenar</option>
              <option value="Title, DESC">Título, DESC</option>
              <option value="Title, ASC">Título, ASC</option>
            </select>
          </div>
        </div>

        {data ? (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {itemsDisplay.map((item) => (
              <li key={item.id}>
                <button className="group block overflow-hidden hover:cursor-pointer"
                  onClick={() => handleItemSelection(item)}>
                  <img
                    src={item.id + ".jpg"}
                    alt=""
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />

                  <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      #{item.id}
                    </h3>

                    <p className="mt-2">
                      <span className="tracking-wider text-gray-900">
                        {item.name}
                      </span>
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>

        ) : (
          <div className="text-center">
            <div role="status" className="text-lg text-black">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 animate-spin dark:text-gray-100 fill-gray-100"
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
              </svg>
              Cargando, no recargue la página
            </div>
          </div>
        )}
      </section>
    </div>
  )
}