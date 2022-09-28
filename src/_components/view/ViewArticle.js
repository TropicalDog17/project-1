function ViewArticle({ article }) {
  return (
    <div className="p-5">
      <h1 className="mt-1">{article.title}</h1>
      <p>
        Original link:{" "}
        <a className="mt-1" href={article.link}>
          {article.link}
        </a>
      </p>

      <p className="mt-3">{article.content}</p>
    </div>
  );
}
export { ViewArticle };
