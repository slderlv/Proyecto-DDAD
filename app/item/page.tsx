'use client'
import { ItemProvider } from "@/contexts/ItemContext";
import Item from "../components/Item";

export default function ItemPage(){
  return(
    <ItemProvider>
      <Item/>
    </ItemProvider>
  )
}