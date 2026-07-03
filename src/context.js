import { createContext, useContext, useState } from "react";
import CartModal from "./components/CartModal";

//creation of context
export const itemContext = createContext();

//consume context
export function useValue() {
  const value = useContext(itemContext);
  return value;
}

//provide context
export function CustomItemContext({ children }) {
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAdd = (price, item) => {
    setTotal((prevTotal) => prevTotal + price);
    setItem((prevItem) => prevItem + 1);

    setCartItems((prevCart) => {
      const existingItem = prevCart.find((i)=>i.name===item.name)

      if(existingItem){
        return prevCart.map((items)=>items.name===item.name?{...items,qty:items.qty+1}:items)
      }

      return [...prevCart, { id: Date.now(), name: item.name, price: item.price, qty: 1 }];
    });
    console.log(`Total: ${total} Item : ${item}`);
  };

  const handleRemove = (price,item) => {
    setTotal((prevTotal) => (prevTotal - price < 0 ? 0 : prevTotal - price));
    setItem((prevItem) => (prevItem - 1 < 0 ? 0 : prevItem - 1));

    setCartItems((prevCart)=>{
      const existingItem = prevCart.find((cartItem)=>cartItem.name === item.name)

      if(existingItem){
        return prevCart.map((curr)=>(curr.name===item.name&&curr.qty>0?{...curr,qty:curr.qty-1}:curr))
      }

      return [...prevCart,{id: Date.now(), name:item.name, price: item.price}]
    })
  };

  const handleReset = () => {
    setTotal(0);
    setItem(0);
  };

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };
  const handleClear = () => {
    setCartItems([]);
  };

  return (
    <itemContext.Provider
      value={{
        total,
        item,
        toggle,
        cartItems,
        handleAdd,
        handleRemove,
        handleReset,
        handleToggle,
        handleClear,
        setCartItems
      }}
    >
      {toggle && <CartModal />}
      {children}
    </itemContext.Provider>
  );
}
