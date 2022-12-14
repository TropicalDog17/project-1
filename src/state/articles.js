import { atom, selector } from "recoil";
import { replaceItemAtIndex } from "../common";
import axios from "axios";
const axios_config = {
  baseURL: "http://localhost:5000",
  headers: { crossorigin: true },
};
const articleAtom = atom({
  key: "article",
  // get initial state from local storage to enable user to stay logged in
  // default: DEFAULT_ARTICLES_FOR_PAGIATION_TEST,
  default: selector({
    key: "articleLoader",
    get: async () => {
      const response = await axios.get("/articles", axios_config);
      return response.data;
    },
  }),
});
const articleIndexAtom = atom({
  key: "articleIndex",
  default: -1,
});
const singleArticleState = selector({
  key: "singleArticle",
  get: async ({ get }) => {
    const articleId = parseInt(get(articleIndexAtom));
    const articles = get(articleAtom);
    const response = await axios.get(
      `http://localhost:5000/article/${articleId}`
    );
    if (!response.data) {
      return response.data;
    }
    return {};
  },
  set: ({ get, set }, newValue) =>
    set(
      articleAtom,
      replaceItemAtIndex(
        get(articleAtom),
        parseInt(get(articleIndexAtom)),
        newValue
      )
    ),
});

export { articleAtom, articleIndexAtom, singleArticleState };
