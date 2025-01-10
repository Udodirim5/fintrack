import { useState } from "react";
import styles from "./ReviewCard.module.css";
import { truncate } from "../hooks/formatData";

const ReviewText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis,
        ligula non fermentum consectetur, risus ex ultricies tellus, vitae tincidunt
        ipsum velit non justo. Sed vel turpis id turpis faucibus consectetur at vel
        mauris.`;

export const ReviewCard = () => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.cardTop}>
        <div className={styles.cardTopLeft}>
          <img src="/avatar.avif" alt="Reviewer's Image" />
        </div>
        <div>
          <h3>Review Title</h3>
          <span>Author Name</span>
        </div>
      </div>
      <p className={styles.content}>
        {expand ? ReviewText : truncate(ReviewText, 100)}
      {ReviewText.length > 100 && (
        <button className={styles.toggleButton} onClick={toggleExpand}>
          {expand ? "Read Less" : "Read More"}
        </button>
      )}
      </p>
    </div>
  );
};
