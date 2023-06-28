'use client'
import { ItemProvider } from "@/contexts/ItemContext";
import Menu from "../components/Menu";
import { ToastContainer } from "react-toastify";

export default function MenuPage(){
  return(
    <ItemProvider>
      <Menu/>
      <ToastContainer/>
    </ItemProvider>
  )
}