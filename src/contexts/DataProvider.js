/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

const initialData = {
  Date: new Date().toISOString().split("T")[0],
  Reason: "",
  Amount: 0,
};

const DataProvider = ({ children, url, contextName }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [newData, setNewData] = useState(initialData);

  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${contextName}`);
      const dataResponse = await response.json();
      setData(dataResponse);
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

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataWithId),
      });
      if (!response.ok) throw new Error(`Failed to add ${contextName}`);
      setData((prevData) => [dataWithId, ...prevData]);
      setNewData(initialData);
      setShowAdd(false);
    } catch (err) {
      setError(`An error occurred while adding ${contextName}`);
      console.log(err);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`${url}/ID/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete ${contextName}`);
      setData((prevData) => prevData.filter((dataItem) => dataItem.ID !== id));
    } catch (err) {
      setError(`An error occurred while deleting ${contextName}`);
      console.log(err);
    }
  };

  const getSingleData = async (id) => {
    const response = await fetch(`${url}/ID/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch ${contextName}`);
    return await response.json();
  };

  const updateData = async (id, updatedData) => {
    try {
      const response = await fetch(`${url}/ID/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error(`Failed to update ${contextName}`);

      setData((prevData) =>
        prevData.map((dataItem) =>
          dataItem.ID === id ? { ...dataItem, ...updatedData } : dataItem
        )
      );

      setError(null);
      setNewData(initialData);
      navigate(`/${contextName.toLowerCase()}s`);
    } catch (err) {
      setError(`An error occurred while updating ${contextName}`);
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  return (
    <DataContext.Provider
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
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
