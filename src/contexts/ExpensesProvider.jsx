/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ExpensesContext = createContext();
const initialData = {
  Date: new Date().toISOString().split("T")[0],
  Reason: "",
  Amount: 0,
};

const ExpensesProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [expenses, setExpenses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [sort, setSort] = useState("ascending");
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [newData, setNewData] = useState(initialData);

  const navigate = useNavigate();

  const URL =
    "https://api.sheetbest.com/sheets/586e03e4-dd52-4456-b435-cf58011e579f";

  const getExpense = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL);
      if (!response.ok) throw new Error("Failed to fetch expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
      setExpenses([]);
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

  const addExpense = async (e) => {
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
      if (!response.ok) throw new Error("Failed to add expense");
      setExpenses((prevExpenses) => [dataWithId, ...prevExpenses]);
      setNewData(initialData);
      setShowAdd(false);
    } catch (err) {
      setError("An error occurred while adding expense");
      console.log(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${URL}/ID/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete expense");
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.ID !== id)
      );
    } catch (err) {
      setError("An error occurred while deleting expense");
      console.log(err);
    }
  };

  const getSingleExpense = async (id) => {
    const response = await fetch(`${URL}/ID/${id}`);
    if (!response.ok) throw new Error("Failed to fetch expense");
    return await response.json();
  };

  const updateExpense = async (id, updatedData) => {
    try {
      const response = await fetch(`${URL}/ID/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update expense");

      // Update local state with the new data
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.ID === id ? { ...expense, ...updatedData } : expense
        )
      );

      // Reset form and state
      setError(null);
      setNewData(initialData);
      navigate("/expenses");
    } catch (err) {
      setError("An error occurred while updating expense");
      console.error(err);
    }
  };

  useEffect(() => {
    getExpense();
  }, []);

  return (
    <ExpensesContext.Provider
      value={{
        sort,
        error,
        filter,
        loading,
        newData,
        showAdd,
        showEdit,
        expenses,
        setSort,
        searchData,
        initialData,
        setFilter,
        addExpense,
        setShowAdd,
        setShowEdit,
        handleChange,
        setSearchData,
        updateExpense,
        deleteExpense,
        getSingleExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export { ExpensesContext, ExpensesProvider };
