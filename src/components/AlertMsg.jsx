/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./AlertMsg.module.css";

const AlertMsg = ({ error }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer;
    if (error) {
      let progressValue = 100;
      timer = setInterval(() => {
        progressValue -= 2; // Decrease progress by 2% every 100ms
        setProgress(progressValue);
        if (progressValue <= 0) clearInterval(timer);
      }, 100);
    }
    return () => clearInterval(timer); // Cleanup on unmount or when error changes
  }, [error]);

  return (
    <div className={styles.msgContainer}>
      {error}
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AlertMsg;
