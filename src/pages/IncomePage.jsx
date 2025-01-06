import { Link, Outlet, useSearchParams } from "react-router-dom";
import { useIncome } from "../hooks/useIncome";
import {
  formatNumberWithCommas,
  formatDateForDisplay,
} from "../hooks/formatData";

import AddData from "../components/AddData";
import Button from "../components/Button";
import SearchData from "../components/SearchData";
import FilterBox from "../components/FilterBox";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ConfirmationModal from "../components/ConfirmationModal";
import { useState } from "react";

const IncomePage = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const {
    sort,
    data,
    filter,
    showAdd,
    loading,
    setSort,
    newData,
    showEdit,
    setFilter,
    deleteData,
    setShowAdd,
    createData,
    searchData,
    setShowEdit,
    handleChange,
    setSearchData,
  } = useIncome();

  let queriedData = data.filter((incomeData) =>
    incomeData.Reason.toLowerCase().includes(searchData.toLowerCase())
  );

  // Convert a date string (MM/dd/yyyy) to a Date object
  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    return new Date(year, month - 1, day); // Month is 0-indexed
  };

  // Helper functions for filtering
  const startOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startOfYear = (date) => new Date(date.getFullYear(), 0, 1);
  const endOfYear = (date) => new Date(date.getFullYear(), 11, 31);

  // Sorting
  let sortedData;
  switch (sort) {
    case "ascending":
      sortedData = [...queriedData].sort((a, b) => {
        const dateA = parseDate(a.Date);
        const dateB = parseDate(b.Date);
        return dateB - dateA; // Compare Date objects
      });
      break;

    case "descending":
      sortedData = [...queriedData].sort((a, b) => {
        const dateA = parseDate(a.Date);
        const dateB = parseDate(b.Date);
        return dateA - dateB; // Compare Date objects
      });
      break;

    default:
      sortedData = [...queriedData];
      break;
  }

  let filteredItems;
  switch (filter) {
    case "all":
      filteredItems = sortedData;
      break;

    case "thisMonth":
      filteredItems = sortedData.filter((expense) => {
        const expenseDate = parseDate(expense.Date);
        const today = new Date();
        const start = startOfMonth(today);
        const end = endOfMonth(today);
        return expenseDate >= start && expenseDate <= end;
      });
      break;

    case "lastMonth":
      filteredItems = sortedData.filter((expense) => {
        const expenseDate = parseDate(expense.Date);
        const today = new Date();
        const start = startOfMonth(
          new Date(today.getFullYear(), today.getMonth() - 1, 1)
        );
        const end = endOfMonth(
          new Date(today.getFullYear(), today.getMonth() - 1, 1)
        );
        return expenseDate >= start && expenseDate <= end;
      });
      break;

    case "thisYear":
      filteredItems = sortedData.filter((expense) => {
        const expenseDate = parseDate(expense.Date);
        const today = new Date();
        const start = startOfYear(today);
        const end = endOfYear(today);
        return expenseDate >= start && expenseDate <= end;
      });
      break;

    case "lastYear":
      filteredItems = sortedData.filter((expense) => {
        const expenseDate = parseDate(expense.Date);
        const today = new Date();
        const start = startOfYear(new Date(today.getFullYear() - 1, 0, 1));
        const end = endOfYear(new Date(today.getFullYear() - 1, 0, 1));
        return expenseDate >= start && expenseDate <= end;
      });
      break;

    default:
      filteredItems = sortedData;
      break;
  }

  const itemsPerPage = 15;

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };

  const toggleConfirmModal = (income = null) => {
    setSelectedData(income);
    setConfirmModal(!confirmModal);
  };

  const toggleEdit = () => {
    setShowEdit(true);
  };

  const totalIncome = data.reduce(
    (sum, income) => sum + Number(income.Amount),
    0
  );

  if (loading) return <Loader />;

  return (
    <main>
      {confirmModal && (
        <ConfirmationModal
          data={selectedData}
          onConfirm={(data) => deleteData(data.ID)}
          onClose={() => setConfirmModal(false)}
          title="Delete Income Entry"
          message={`Are you sure you want to delete the income entry for "${selectedData?.Reason}"?`}
        />
      )}
      <div className="page-header">
        <Button color=" #003366" onClick={toggleAdd} aria-label="Add income">
          Add new
        </Button>
        <FilterBox
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />
        <SearchData searchData={searchData} setSearchData={setSearchData} />
        <p className="total-amount">
          Total income: <span>${formatNumberWithCommas(totalIncome)}</span>
        </p>
      </div>
      {showAdd && (
        <AddData
          newData={newData}
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          handleSubmit={createData}
          handleChange={handleChange}
        />
      )}
      {showEdit && <Outlet />}

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th className="description">Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <div className="table-body-wrapper">
          <tbody>
            {data.length > 0 ? (
              currentItems.map((income, i) => (
                <tr key={i}>
                  <td>{formatDateForDisplay(income.Date)}</td>
                  <td>{formatNumberWithCommas(income.Amount)}</td>
                  <td className="description">{income.Reason}</td>
                  <td className="actions">
                    <Link to={`edit/${income.ID}`}>
                      <img
                        onClick={toggleEdit}
                        color="#5F9EA0"
                        src={`${import.meta.env.BASE_URL}edit.png`}
                        alt="Edit Icon"
                        className="icon"
                      />
                    </Link>
                    <img
                      onClick={() => toggleConfirmModal(income)}
                      alt="Delete Icon"
                      src={`${import.meta.env.BASE_URL}delete.png`}
                      className="icon"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No income found.</td>
              </tr>
            )}
          </tbody>
        </div>
      </table>
      {totalPages > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
};

export default IncomePage;
