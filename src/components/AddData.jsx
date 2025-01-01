/* eslint-disable react/prop-types */
import Button from "./Button";
import styles from "./AddData.module.css";

const AddData = ({
  newData,
  handleChange,
  handleSubmit,
  setShowAdd,
  showAdd,
}) => {
  const handleClose = (e) => {
    e.preventDefault();
    setShowAdd(!showAdd);
  };

  return (
    <div className={styles.AddNewData}>
      <form className={styles.AddDataForm} onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="Amount"
            value={newData.Amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="Date"
            value={newData.Date}
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
            value={newData.Reason}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.buttons}>
          <Button type="submit" border="2px solid blue">
            Submit
          </Button>
          <Button onClick={handleClose} color="blue">
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddData;
