import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, usersAtom } from "../state";
import { useNavigate, Navigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { articleAtom, articleIndexAtom } from "../state/articles";
export { useArticleActions };
function useArticleActions() {
  const articleId = useRecoilValue(articleIndexAtom);
  const [articles, setArticles] = useRecoilState(articleAtom);
  return {
    deleteArticle,
  };

  function deleteArticle() {
    const newArticles = articles.filter(
      (article) => article !== articles[articleId]
    );
    setArticles(newArticles);
    localStorage.setItem("article", JSON.stringify(newArticles));
  }
}
