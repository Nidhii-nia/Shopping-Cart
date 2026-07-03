import React from "react";
import styles from "../styles/CartModal.module.css";
import { useValue } from "../context";
import CartItem from "./CartItem";

function CartModal() {
    let {handleToggle,handleClear,cartItems} = useValue();
    let price = cartItems.map((item)=>item.price*item.qty).reduce((acc,item)=>acc+item,0)
    console.log("cartItems: ",cartItems);
    
  return (
    <div className={styles.cartModal}>
      <div className={styles.closeButton} onClick={handleToggle}>
        Close
      </div>
      <div className={styles.clearButton} onClick={handleClear}>
        Clear
      </div>
      <div className={styles.itemContainer}>
        {cartItems.map((item)=>(item.qty>0&&<CartItem key={item.id} name={item.name} qty={item.qty} price={item.price}/>))}
        
      </div>
      <div className={styles.total}>
        <div className={styles.totalText}>Total</div>
        <div className={styles.totalPrice}>&#x20B9;{price}</div>
      </div>
    </div>
  );
}

export default CartModal;
