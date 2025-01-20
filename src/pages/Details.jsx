/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Details.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import {
  formatNumberWithCommas,
  formatDateForDisplay,
} from "../hooks/formatData";

const Details = ({ initialData, getSingleData }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState(initialData);

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

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.data}>
          <h3>Date: {formatDateForDisplay(currentData.Date)}</h3>
          <h3>Amount: {formatNumberWithCommas(currentData.Amount)}</h3>
        </div>
        <div className={styles.back}>
          <Button
            className={styles.backButton}
            textColor="#003366"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </div>
      <div className={styles.description}>
        <h3>Description:</h3>
        <p>{currentData.Reason}</p>
      </div>
    </div>
  );
};

export default Details;
