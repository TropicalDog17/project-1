import { atom, selector } from "recoil";
import { articleAtom } from "./articles";

const currentPageIndexAtom = atom({
  key: "pageIndex",
  default: 1,
});

const currentPageSelector = selector({
  key: "articlePage",
  get: ({ get }) => {
    const idx = get(currentPageIndexAtom);
    const articles = get(articleAtom);
    const MAX_ARTICLE_PER_PAGE = 5;
    const articleCollectionLength = articles.length;
    if (articleCollectionLength < MAX_ARTICLE_PER_PAGE) {
      return articles;
    }
    if (idx > articleCollectionLength / MAX_ARTICLE_PER_PAGE + 1) {
      return [];
    }
    return articles.slice(
      (idx - 1) * MAX_ARTICLE_PER_PAGE,
      idx * MAX_ARTICLE_PER_PAGE
    );
  },
});
export { currentPageIndexAtom as pageIndexAtom, currentPageSelector };
