import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesProvider";

const useExpenses = () => {
  const contexts = useContext(ExpensesContext);
  if (!contexts || contexts === undefined) {
    throw new Error("useExpenses must be used within a ExpensesContext");
  }
  return contexts;
};

export { useExpenses };