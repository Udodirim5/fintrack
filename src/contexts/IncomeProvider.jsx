/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createContext, useEffect, useState } from "react";

const IncomeContext = createContext();
const initialData = {
  Date: new Date().toISOString().split("T")[0],
  Reason: "",
  Amount: 0,
};

const IncomeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [newData, setNewData] = useState(initialData);

  const navigate = useNavigate();

  const URL =
    "https://api.sheetbest.com/sheets/e9992fc2-13af-403d-8059-738f63c0c6a3";

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL);
      if (!response.ok) throw new Error("Failed to fetch data");
      const dataPromise = await response.json();
      setData(dataPromise);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const createData = async (e) => {
    e.preventDefault();
    try {
      if (!newData.Date || !newData.Reason || newData.Amount <= 0) {
        setError("Please fill out all fields with valid data.");
        return;
      }
      const uniqueId = uuidv4();
      const dataWithId = { ...newData, ID: uniqueId };

      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataWithId),
      });
      if (!response.ok) throw new Error("Failed to add data");
      setData((prevData) => [dataWithId, ...prevData]);
      setNewData(initialData);
      setShowAdd(false);
    } catch (err) {
      setError("An error occurred while adding data");
      console.log(err);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`${URL}/ID/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete data");
      setData((prevData) => prevData.filter((data) => data.ID !== id));
    } catch (err) {
      setError("An error occurred while deleting data");
      console.log(err);
    }
  };

  const getSingleData = async (id) => {
    const response = await fetch(`${URL}/ID/${id}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  };

  const updateData = async (id, updatedData) => {

    try {
      const response = await fetch(`${URL}/ID/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update data");

      // Update local state with the new data
      setData((prevData) =>
        prevData.map((data) =>
          data.ID === id ? { ...data, ...updatedData } : data
        )
      );

      // Reset form and state
      setError(null);
      setNewData(initialData);
      navigate("/incomes");
    } catch (err) {
      setError("An error occurred while updating data");
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <IncomeContext.Provider
      value={{
        data,
        error,
        filter,
        showAdd,
        loading,
        newData,
        showEdit,
        setFilter,
        searchData,
        deleteData,
        createData,
        updateData,
        setShowAdd,
        setNewData,
        setShowEdit,
        initialData,
        handleChange,
        getSingleData,
        setSearchData,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export { IncomeContext, IncomeProvider };
