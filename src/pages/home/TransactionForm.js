import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
// import styles from "./Home.module.css";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { addDocument, response } = useFirestore("transactions");

  const submitHandler = e => {
    e.preventDefault();
    addDocument({ uid, name, amount });
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={submitHandler}>
        <label>
          <span>Transaction Name:</span>
          <input
            type="text"
            required
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Transaction Amount:</span>
          <input
            type="number"
            required
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        {response.isPending && (
          <div className="w3-center">
            <i className="fa fa-spinner w3-spin w3-text-green w3-xxlarge"></i>
          </div>
        )}
        {!response.isPending && <button type="submit">Add Transaction</button>}
      </form>
    </>
  );
}
