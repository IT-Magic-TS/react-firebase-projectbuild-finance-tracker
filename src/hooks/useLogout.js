import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthcontext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setisCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthcontext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user out
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

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

  return { logout, error, isPending };
};
