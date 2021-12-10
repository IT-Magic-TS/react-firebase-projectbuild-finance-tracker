import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import { useAuthcontext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TransactionList from "./TransactionList";

export default function Home() {
  const { user } = useAuthcontext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && (
          <div className="w3-panel w3-red w3-margin w3-padding w3-center">
            {error}
          </div>
        )}
        {documents && <TransactionList collection={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
