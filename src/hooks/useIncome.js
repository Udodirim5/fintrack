import { useContext } from "react";
import { IncomeContext } from "../contexts/IncomeProvider";

const useIncome = () => {
  const contexts = useContext(IncomeContext);
  if (!contexts || contexts === undefined) {
    throw new Error("useIncome must be used within a IncomeContext");
  }
  return contexts;
};

export { useIncome };