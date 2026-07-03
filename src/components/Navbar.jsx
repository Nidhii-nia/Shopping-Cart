import React, { useContext } from "react";
import styles from "../styles/Total.module.css";
import { itemContext } from "../context";

function Navbar() {
  const value = useContext(itemContext);
  console.log(value);
  
  return (
    <div className={styles.container}>
      <h1>Total : &#x20B9; {value.total}</h1>
      <h1>Items: {value.item}</h1>
      
    <div className={styles.buttonsWrapper}>
      <button className={styles.button} onClick={value.handleReset}>Reset</button>
    </div>
    <div className={styles.buttonsWrapper}>
      <button className={styles.button} onClick={value.handleToggle}>Cart</button>
    </div>
    </div>
  );
}

export default Navbar;
