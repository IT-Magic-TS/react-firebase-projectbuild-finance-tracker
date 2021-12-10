import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";

export default function TransactionList({ collection }) {
  const { deleteDocument, response } = useFirestore("transactions");
  console.log(response);
  return (
    <ul className={styles.transactions}>
      {collection.map(item => (
        <li key={item.id}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.amount}>${item.amount}</p>
          <button onClick={() => deleteDocument(item.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
