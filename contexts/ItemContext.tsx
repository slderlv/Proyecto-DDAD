import { createContext, useContext, ReactNode, useState } from "react";
import { Item } from "@/config/interfaces";

interface ItemContextValue {
  selectedItem: Item | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item | null>>;
}

const ItemContext = createContext<ItemContextValue | undefined>(undefined);

interface ItemProviderProps {
  children: ReactNode;
}

export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <ItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);
