/* eslint-disable react/prop-types */
import styles from "./SearchData.module.css";
const SearchData = ({ searchData, setSearchData }) => {
  return (
    <form className={styles.searchForm}>
      <input
        type="search"
        placeholder="Search by Description..."
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
      />
    </form>
  );
};

export default SearchData;
