import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchNews, selectNews } from "../../features/news/newsSlice";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import NewsList from "../../components/NewsList/NewsList";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import styles from "./styles.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category, page, loading, error } = useAppSelector(selectNews);

  useEffect(() => {
    dispatch(fetchNews({ category, page }));
  }, [category, page, dispatch]);

  return (
    <div className={styles.contWrap}>
      <div className={styles.cont}>
        <h1>News Portal</h1>
        <SearchBar />
        <CategoryFilter />
        {loading ? <Loader /> : <NewsList />}
        {error && <p className={styles.error}>Error: {error}</p>}
        <Pagination />
      </div>
    </div>
  );
};

export default HomePage;
