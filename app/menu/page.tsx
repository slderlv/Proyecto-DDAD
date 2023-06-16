'use client'
import { ItemProvider } from "@/contexts/ItemContext";
import Menu from "../components/Menu";

export default function MenuPage(){
  return(
    <ItemProvider>
      <Menu/>
    </ItemProvider>
  )
}