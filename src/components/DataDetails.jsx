import { useExpenses } from "../hooks/useExpenses";
import { useIncome } from "../hooks/useIncome";
import Details from "../pages/Details";

const ExpensesDetails = () => {
  const {  initialData, getSingleExpense,  } =
    useExpenses();

  return (
    <main>
      <Details
        initialData={initialData}
        getSingleData={getSingleExpense}
      />
    </main>
  );
};

const IncomeDetails = () => {
  const {  initialData, getSingleData,  } =
  useIncome();

  return (
    <main>
      <Details
        initialData={initialData}
        getSingleData={getSingleData}
      />
    </main>
  );
};

export {IncomeDetails, ExpensesDetails};
