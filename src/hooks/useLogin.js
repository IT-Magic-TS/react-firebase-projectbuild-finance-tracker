import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthcontext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIscancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthcontext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // login user
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      console.log(res);

      if (!res) {
        throw new Error("Could not complete login");
      }

      // dipatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setIscancelled(true);
  }, []);

  return { login, isPending, error };
};
