import { useIncome } from "../hooks/useIncome";
import EditData from "./editData";

const EditIncomeSuperComponent = () => {
  const { updateData, initialData, getSingleData, setShowEdit } = useIncome();

  return (
    <EditData
      type="income"
      initialData={initialData}
      getSingleData={getSingleData}
      updateData={updateData}
      setShowEdit={setShowEdit}
    />
  );
};

export default EditIncomeSuperComponent;
