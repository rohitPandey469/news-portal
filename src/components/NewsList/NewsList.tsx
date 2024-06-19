import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectNews } from "../../features/news/newsSlice";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Masonry from "react-masonry-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as RegularHeart } from "@fortawesome/free-regular-svg-icons";

const NewsList: React.FC = () => {
  const { articles } = useAppSelector(selectNews);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteClick = (text: string) => {
    let updatedFavorites;
    if (favorites.includes(text)) {
      updatedFavorites = favorites.filter((sourceName) => sourceName !== text);
    } else {
      updatedFavorites = [...favorites, text];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.grid}
      columnClassName={styles.gridColumn}
    >
      {articles.map((article, index) => (
        <div key={index} className={styles.card}>
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className={styles.cardImage}
            />
          )}
          <div className={styles.cardContent}>
            <h2>{article.title}</h2>
            <p>{article?.description}</p>
            <Link to={`/article/${index}`}>Read more</Link>
            <button
              className={styles.favoriteButton}
              onClick={() => handleFavoriteClick(article.source.name)}
            >
              <FontAwesomeIcon
                icon={favorites.includes(article.source.name) ? SolidHeart : RegularHeart}
                className={
                  favorites.includes(article.source.name)
                    ? styles.favorite
                    : styles.notFavorite
                }
              />
            </button>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default NewsList;
