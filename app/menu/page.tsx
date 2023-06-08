'use client'
import { useEffect, useState } from "react"
import { SideMenu } from "../components/SideMenu"
import { User_Information, Users } from "../interfaces/interfaces"

const user_info: User_Information = {
    birthdate: new Date("1990-01-01"),
    first_name: "John",
    last_name: "Frusciante"
}
const user: Users = {
    id: 1,
    email: "algo@algo.com",
    city: "coquimbo",
    password: "123",
    role: null,
    createdAt: 0,
    info: user_info,
}
interface Product{
  id: number,
  imageSrc: string,
  title: string,
  state: string
}

export default function Menu() {
  const [reservation, setReservation] = useState<Product[]>([])
  const [searchValue, setSearchValue] = useState('')
  const searchByTitle = (title: string): Product | null => {
    const foundProduct = [p1,p2].find((product) =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );
    
    return foundProduct || null;
  };
  const p1: Product = {
    id: 123,
    imageSrc: "donquijote.jpg", 
    title: "Don Quijote de La Mancha",
    state: "Disponible",
  }
  const p2: Product = {
    id: 321,
    imageSrc: "schaum.jpg", 
    title: "Serie Schaum Estadística",
    state: "No disponible",
  }
  const optionList = {
    'Title, DESC': [p1, p2, p1].sort((a, b) => b.title.localeCompare(a.title)),
    'Title, ASC': [p2, p2, p1].sort((a, b) => a.title.localeCompare(b.title)),
    'Price, DESC': [p2, p2, p2], // Lista sin ordenar por título
    'Price, ASC': [p1, p1, p1], // Lista sin ordenar por título
  };
  useEffect(() => {
    setReservation([p1, p2]);
  }, []);
  
    return(
<div className="flex">
    <div className="w-80 h-screen bg-gray-200 fixed left-0 top-0">
        <SideMenu {...user}/>
    </div>
<section className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ml-80">
    <header>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
        Colección
      </h2>

      <p className="mt-4 max-w-md text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
        praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
        natus?
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
        <div className="relative">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
            >
              <span className="text-sm font-medium"> Disponibilidad </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div
              className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0"
            >
              <div className="w-96 rounded border border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">

                  <button
                    type="button"
                    className="text-sm text-gray-900 underline underline-offset-4"
                  >
                    Buscar
                  </button>
                </header>

                <ul className="space-y-1 border-t border-gray-200 p-4">
                  <li>
                    <label
                      htmlFor="FilterInStock"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterInStock"
                        className="h-5 w-5 rounded border-gray-300"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        En Stock (5+)
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterPreOrder"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterPreOrder"
                        className="h-5 w-5 rounded border-gray-300"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Pre Order (3+)
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterOutOfStock"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterOutOfStock"
                        className="h-5 w-5 rounded border-gray-300"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Fuera de Stock (10+)
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </details>
        </div>

        <div>
          <label htmlFor="FilterInput" className="flex items-center gap-2">
            <input
              type="text"
              id="FilterInput"
              placeholder="Nombre del producto"
              className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-2"
              onChange={event => setSearchValue(event.target.value)}
            />
          </label>
        </div>
        <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4 mb-3"
              onClick={event => {
                const searchResults: Product | null = searchByTitle(searchValue);
                if (searchResults) {
                  setReservation([searchResults]);
                } else {
                  setReservation([]);
                }
              }}
            >
              Buscar
            </button>
      </div>

      <div className="hidden sm:block">
        <label htmlFor="SortBy" className="sr-only">Ordenar por</label>

        <select id="SortBy" className="h-10 rounded border-gray-300 text-sm"
        onChange={(event) => {
          const selectedValue: keyof typeof optionList = event.target.value as keyof typeof optionList;
          
          const list = optionList[selectedValue] || [];
          setReservation(list);
        }}
        >
          <option>Ordenar por</option>
          <option value="Title, DESC">Título, DESC</option>
          <option value="Title, ASC">Título, ASC</option>
          <option value="Price, DESC">Precio, DESC</option>
          <option value="Price, ASC">Precio, ASC</option>
        </select>
      </div>
    </div>

    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {reservation.map((product) => (
        <li key={product.id}>
          <a href="#" className="group block overflow-hidden">
            <img
              src={product.imageSrc}
              alt=""
              className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
            />

            <div className="relative bg-white pt-3">
              <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                {product.title}
              </h3>

              <p className="mt-2">
                <span className="sr-only">Precio</span>
                <span className="tracking-wider text-gray-900">
                  {product.state}
                </span>
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
</section>
</div>
    )
}