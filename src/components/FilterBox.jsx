/* eslint-disable react/prop-types */
import styles from './FilterBox.module.css'

const FilterBox = ({filter, setFilter, sort, setSort}) => {
  return (
    <div className={styles.filterBox}>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="lastMonth">Last Month</option>
        <option value="thisMonth">This Month</option>
        <option value="lastYear">Last Year</option>
        <option value="thisYear">This Year</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>
  )
}

export default FilterBox