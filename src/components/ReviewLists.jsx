import { ReviewCard } from "./ReviewCard";
import styles from "./ReviewLists.module.css";

const ReviewLists = () => {
  return (
    <div className={styles.container}>
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </div>
  );
};

export default ReviewLists;
