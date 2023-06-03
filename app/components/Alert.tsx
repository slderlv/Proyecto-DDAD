'use client'
import React from "react"

export function Alert(isHidden: boolean, errorMessage: string) {
  const [isOpen, setIsOpen] = React.useState(true)
  const handleClose = () => {
    setIsOpen(false)
  }
    return (
        <div
            role="alert"
            className=" absolute rounded-xl border border-gray-100 bg-white p-4 shadow-xl top-20"
            hidden={!isOpen}
          >
            <div className="flex items-start gap-4">
              <span className="text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
    
              <div className="flex-1">
                <strong className="block font-medium text-gray-900"> Error </strong>
    
                <p className="mt-1 text-sm text-gray-700">
                  {errorMessage}
                </p>
              </div>
    
              <button className="text-gray-500 transition hover:text-gray-600"
              onClick={handleClose}>
                <span className="sr-only">Dismiss popup</span>
    
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
    )
}