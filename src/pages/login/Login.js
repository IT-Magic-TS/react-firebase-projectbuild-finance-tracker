import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending, error } = useLogin();

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
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
            Login
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
