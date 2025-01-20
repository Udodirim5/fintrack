/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./ReviewCard.module.css";
import { truncate } from "../hooks/formatData";

export const ReviewCard = ({ name, title, rating, content, date }) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.cardTop}>
        <div className={styles.cardTopLeft}>
          <img
            src={`${import.meta.env.BASE_URL}avatar.avif`}
            alt="Reviewer's Image"
          />
        </div>
        <div>
          <h3>{title}</h3>
          <span>{name}</span>
        </div>
      </div>
      <p className={styles.content}>
        {expand ? content : truncate(content, 100)}
        {content.length > 100 && (
          <button className={styles.toggleButton} onClick={toggleExpand}>
            {expand ? "Read Less" : "Read More"}
          </button>
        )}
      </p>
      <div className={styles.DRData}>
        <p className={styles.DRDataLeft}>
          {Array.from({ length: rating }, (_, index) => (
            <span key={index} className={styles.star}>
              &#9733;
            </span>
          ))}
        </p>
        <p>{new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
