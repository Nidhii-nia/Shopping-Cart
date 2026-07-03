import styles from "../styles/CartItem.module.css"

export default function CartItem({name,qty,price}){
    return(
        <div className={styles.cartItem}>
            <span className={styles.name}>{name}</span>
            <span className={styles.qty}>{qty}</span>
            <span className={styles.price}>{price}</span>
        </div>
    )
}