import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthcontext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setisCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthcontext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // add display name to user
      await res.user.updateProfile({ displayName });

      // dispatch login action
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
    return () => setisCancelled(true);
  }, []);

  return { error, isPending, signup };
};
