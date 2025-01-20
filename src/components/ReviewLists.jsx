import { ReviewCard } from "./ReviewCard";
import styles from "./ReviewLists.module.css";

const reviewList = [
  {
    id: 1,
    name: "John Doe",
    title: "Excellent Customer Service",
    rating: 5,
    content: "The service was exceptional, and I highly recommend this app.",
    date: "2022-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Great Quality!",
    rating: 4,
    content: "The quality of the app is great. Highly satisfied.",
    date: "2023-02-01",
  },
  {
    id: 3,
    name: "Bob Johnson",
    title: "Good Experience",
    rating: 3,
    content: "The experience was good, but there's room for improvement.",
    date: "2022-03-01",
  },
  {
    id: 4,
    name: "Alice Brown",
    title: "Excellent Product",
    rating: 5,
    content: "The product is excellent, and I highly recommend it.",
    date: "2023-04-01",
  }
];

const ReviewLists = () => {
  return (
    <div className={styles.container}>
      {reviewList.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </div>
  );
};

export default ReviewLists;
