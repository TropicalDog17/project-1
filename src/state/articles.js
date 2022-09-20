import { atom, selector } from "recoil";

const articleAtom = atom({
  key: "article",
  // get initial state from local storage to enable user to stay logged in
  default: JSON.parse(localStorage.getItem("article")),
});
const articleIndexAtom = atom({
  key: "articleIndex",
  default: -1,
});
const singleArticleState = selector({
  key: "singleArticle",
  get: ({ get }) => {
    const articleId = parseInt(get(articleIndexAtom));
    const articles = get(articleAtom);
    if (articles[articleId]) {
      return articles[articleId];
    }
    return {};
  },
});
export { articleAtom, articleIndexAtom, singleArticleState };
