/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./EditData.module.css";
import Button from "./Button";

// Utility function to format date as yyyy-MM-dd
const formatDateForInput = (dateString) => {
  if (!dateString || typeof dateString !== "string") return "";
  const parts = dateString.split("/");
  if (parts.length !== 3) return "";
  const [month, day, year] = parts;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const EditData = ({
  type,
  initialData,
  getSingleData,
  updateData,
  setShowEdit,
}) => {
  const params = useParams();
  const [currentData, setCurrentData] = useState(initialData);

  const handleChange = (e) => {
    setCurrentData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const prefillData = async () => {
      if (params.id) {
        try {
          const data = await getSingleData(params.id);
          if (Array.isArray(data) && data.length > 0) {
            setCurrentData(data[0]);
          } else {
            console.error("Data not in expected format:", data);
          }
        } catch (err) {
          console.error("Failed to fetch data:", err);
        }
      }
    };
    prefillData();
  }, [params.id, getSingleData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updateData(params.id, currentData);
      setShowEdit(false);
    }
  };

  return (
    <div className={styles.AddNewData}>
      <form className={styles.AddDataForm} onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="Amount"
            value={
              typeof currentData.Amount === "string"
                ? currentData.Amount.replace(/[^0-9.]/g, "")
                : currentData.Amount || ""
            }
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="Date"
            value={formatDateForInput(currentData.Date)}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="Reason"
            placeholder="Enter description..."
            required
            value={currentData.Reason || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.buttons}>
          <Button type="submit" border="2px solid blue">
            {type === "income" ? "Update Income" : "Update Expense"}
          </Button>
          <Link to={`/${type}s`}>
            <Button color="blue">Close</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditData;

// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useExpenses } from "../hooks/useExpenses";
// import { useIncome } from "../hooks/useIncome";
// import styles from "./EditData.module.css";
// import Button from "./Button";

// // Utility function to format date as yyyy-MM-dd

// const formatDateForInput = (dateString) => {
//   if (!dateString || typeof dateString !== "string") return ""; // Handle null, undefined, or non-string inputs
//   const parts = dateString.split("/");
//   if (parts.length !== 3) return ""; // Ensure we have exactly three parts (MM/dd/yyyy)

//   const [month, day, year] = parts;
//   return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
// };

// const EditData = () => {
//   if(type === "income") {
//     const { updateData, initialData, getSingleData, setShowEdit } = useIncome();
//   } else {
//   const { updateExpense, initialData, getSingleExpense, setShowEdit } = useExpenses();
//   }
//   const params = useParams();
//   const [currentData, setCurrentData] = useState(initialData);

//   const handleChange = (e) => {
//     setCurrentData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   useEffect(() => {
//     const prefillData = async () => {
//       if (params.id) {
//         try {
//           const expense = await getSingleExpense(params.id);
//           if (Array.isArray(expense) && expense.length > 0) {
//             setCurrentData(expense[0]); // Set the first object of the array as current data
//           } else {
//             console.error("Expense data not in expected format:", expense);
//           }
//         } catch (err) {
//           console.error("Failed to fetch expense data:", err);
//         }
//       }
//     };
//     prefillData();
//   }, [params.id, getSingleExpense]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (params.id) {
//       await updateExpense(params.id, currentData);
//       setShowEdit(false);
//     }
//   };

//   const handleCloseAdd = (e) => {
//     e.preventDefault();
//     setShowEdit(false);
//   };

//   return (
//     <div className={styles.AddNewData}>
//       <form className={styles.AddDataForm} onSubmit={handleSubmit}>
//         <div>
//           <label>Amount:</label>
//           <input
//             type="number"
//             name="Amount"
//             value={
//               typeof currentData.Amount === "string"
//                 ? currentData.Amount.replace(/[^0-9.]/g, "") // Remove "$" and other non-numeric characters
//                 : currentData.Amount || "" // Use number directly or fallback to an empty string
//             }
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             name="Date"
//             value={formatDateForInput(currentData.Date)} // Convert MM/dd/yyyy to yyyy-MM-dd
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             name="Reason"
//             placeholder="Enter description..."
//             required
//             value={currentData.Reason || ""} // Access the current Reason value
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <div className={styles.buttons}>
//           <Button type="submit" border="2px solid blue">
//             Update Expense
//           </Button>
// <Link to={`/expenses`}>
//   <Button onClick={handleCloseAdd} color="blue">
//     Close
//   </Button>
// </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditData;
