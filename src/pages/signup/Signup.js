import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import styles from "./Signup.module.css";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending, error } = useSignup();

  const handleSubmit = e => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        <span>Display Name:</span>
        <input
          onChange={e => setDisplayName(e.target.value)}
          type="text"
          value={displayName}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          value={password}
        />
      </label>
      {!isPending && (
        <div className="w3-center">
          <button type="submit" className="btn">
            Signup
          </button>
        </div>
      )}
      {isPending && (
        <div className="w3-center">
          <i className="fa fa-spinner w3-spin w3-text-green w3-xxlarge"></i>
        </div>
      )}
      {error && (
        <div className="w3-panel w3-red w3-margin w3-padding w3-center">
          {error}
        </div>
      )}
    </form>
  );
}
