import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";

const useData = () => {
  const contexts = useContext(DataContext);
  if (!contexts || contexts === undefined) {
    throw new Error("useData must be used within a DataContext");
  }
  return contexts;
};

export { useData };