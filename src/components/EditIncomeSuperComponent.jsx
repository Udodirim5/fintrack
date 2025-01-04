import { useIncome } from "../hooks/useIncome";
import EditData from "./editData";

const EditIncomeSuperComponent = () => {
  const { updateData, initialData, getSingleData, setShowEdit } = useIncome();

  return (
    <main>
      <EditData
        type="income"
        initialData={initialData}
        getSingleData={getSingleData}
        updateData={updateData}
        setShowEdit={setShowEdit}
      />
    </main>
  );
};

export default EditIncomeSuperComponent;
