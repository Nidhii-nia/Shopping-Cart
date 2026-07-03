import { useValue } from "../context";
import styles from "../styles/ItemCard.module.css";

function ItemCard({ name, price }) {
  const value = useValue();

  const handleAddClick = () => {
    value.handleAdd(price, { name, price });
  };

  const handleRemoveClick = () => {
    value.handleRemove(price, { name, price });
  };

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemName}>{name}</div>
      <div className={styles.itemPrice}>&#x20B9; {price}</div>
      <div className={styles.itemButtonsWrapper}>
        <button className={styles.itemButton} onClick={handleAddClick}>
          Add
        </button>
        <button className={styles.itemButton} onClick={handleRemoveClick}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
