import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCategory, selectNews } from "../../features/news/newsSlice";
import styles from "./styles.module.css";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(selectNews);

  return (
    <div className={styles.cont}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => dispatch(setCategory(cat))}
          className={`${category === cat ? styles.active : ""}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
