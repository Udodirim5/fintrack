/* eslint-disable react/prop-types */
import styles from "./confirmationModal.module.css";

const ConfirmationModal = ({ 
  data, 
  onConfirm, 
  onClose, 
  title = "Confirm Deletion", 
  message 
}) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.cookiesCard}>
        <p className={styles.cookieHeading}>{title}</p>
        <p className={styles.cookiePara}>
          {message || `Are you sure you want to delete the entry for "${data?.Reason}"?`}
        </p>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.accept + " " + styles.cookieButton}
            onClick={() => {
              onConfirm(data);
              onClose();
            }}
          >
            Confirm
          </button>
          <button
            className={styles.reject + " " + styles.cookieButton}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <button className={styles.exitButton} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
