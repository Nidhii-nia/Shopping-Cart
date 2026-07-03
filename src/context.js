import { createContext, useContext, useEffect, useState } from "react";
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
  const [toggle, setToggle] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let total = cartItems
      .map((i) => i.price * i.qty)
      .reduce((acc, item) => acc + item, 0);
    let count = cartItems.reduce((acc, item) => acc + item.qty, 0);
    
    if (!isNaN(total) && !isNaN(count)) {
      setTotal(total);
      setCount(count);
    }

    console.log(`Total: ${total} Count: ${count}`);
  }, [cartItems]);

  const handleAdd = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((i) => i.name === item.name);

      if (existingItem) {
        return prevCart.map((items) =>
          items.name === item.name ? { ...items, qty: items.qty + 1 } : items,
        );
      }

      return [
        ...prevCart,
        { id: Date.now(), name: item.name, price: item.price, qty: 1 },
      ];
    });
  };

  const handleRemove = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name,
      );

      if (existingItem) {
        return prevCart.map((curr) =>
          curr.name === item.name && curr.qty > 0
            ? { ...curr, qty: curr.qty - 1 }
            : curr,
        );
      }

      return [
        ...prevCart,
        { id: Date.now(), name: item.name, price: item.price },
      ];
    });
  };

  const handleReset = () => {
    setTotal(0);
    setCount(0);
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
        count,
        toggle,
        cartItems,
        handleAdd,
        handleRemove,
        handleReset,
        handleToggle,
        handleClear,
        setCartItems,
      }}
    >
      {toggle && <CartModal />}
      {children}
    </itemContext.Provider>
  );
}
