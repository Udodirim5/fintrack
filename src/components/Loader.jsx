import styles from "./Loader.module.css";
const Loader = () => {
  return (
    <main>
    <div className={styles.searchContainer}>
      <div className={styles.loader}></div>;
    </div>
    </main>
  );
};

export default Loader;
