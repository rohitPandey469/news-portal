import React from "react";
import { useAppDispatch } from "../../app/hooks";

import { setCategory } from "../../features/news/newsSlice";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategory(e.target.value));
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search news by category..."
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon}/>
    </div>
  );
};

export default SearchBar;
