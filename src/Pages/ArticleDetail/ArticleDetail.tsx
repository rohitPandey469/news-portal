import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectNews } from "../../features/news/newsSlice";
import styles from "./styles.module.css";

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles } = useAppSelector(selectNews);
  const article = id ? articles[parseInt(id)] : undefined;

  if (!article) return <p>Article not found</p>;
  return (
    <div className={styles.contWrap}>
      <div className={styles.cont}>
        <h1>{article.title}</h1>
        {article.urlToImage && (
          <div className={styles.imgWrap}>
            <img src={article.urlToImage} alt={article.title} />
          </div>
        )}
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetail;
