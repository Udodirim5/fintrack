import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const contexts = useContext(AuthContext);
  if (!contexts || contexts === undefined) {
    throw new Error("useAuth must be used within a AuthContext");
  }
  return contexts;
};

export { useAuth };