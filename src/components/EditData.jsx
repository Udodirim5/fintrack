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
