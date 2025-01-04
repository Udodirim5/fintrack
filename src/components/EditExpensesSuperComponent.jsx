import { useExpenses } from "../hooks/useExpenses";
import EditData from "./editData";

const EditExpensesSuperComponent = () => {
  const { updateExpense, initialData, getSingleExpense, setShowEdit } =
    useExpenses();

  return (
    <main>
      <EditData
        type="expense"
        initialData={initialData}
        setShowEdit={setShowEdit}
        updateData={updateExpense}
        getSingleData={getSingleExpense}
      />
    </main>
  );
};

export default EditExpensesSuperComponent;
