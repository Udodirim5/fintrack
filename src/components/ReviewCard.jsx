import styles from "./ReviewCard.module.css";

export const ReviewCard = () => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.cardTop}>
        <h3>Review Title</h3>
        <span>Author Name</span>
      </div>
      <p className={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis,
        ligula non fermentum consectetur, risus ex ultricies tellus, vitae tincidunt
        ipsum velit non justo. Sed vel turpis id turpis faucibus consectetur at vel
        mauris.
      </p>
    </div>
  );
};
