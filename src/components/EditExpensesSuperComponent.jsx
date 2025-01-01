import { useExpenses } from "../hooks/useExpenses";
import EditData from "./editData";

const EditExpensesSuperComponent = () => {
  const { updateExpense, initialData, getSingleExpense, setShowEdit } =
    useExpenses();

  return (
    <>
      <EditData
        type="expense"
        initialData={initialData}
        setShowEdit={setShowEdit}
        updateData={updateExpense}
        getSingleData={getSingleExpense}
      />
    </>
  );
};

export default EditExpensesSuperComponent;
