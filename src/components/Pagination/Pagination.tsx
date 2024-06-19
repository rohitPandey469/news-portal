import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPage, selectNews } from "../../features/news/newsSlice";
import styles from "./styles.module.css";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector(selectNews);
  return (
    <div className={styles.pagination}>
      <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1}>
        Previous
      </button>

      <span>Page {page}</span>
      <button onClick={() => dispatch(setPage(page + 1))}>Next</button>
    </div>
  );
};

export default Pagination;
