import { atom } from "recoil";

const articleAtom = atom({
  key: "article",
  // get initial state from local storage to enable user to stay logged in
  default: JSON.parse(localStorage.getItem("article")),
});

export { articleAtom };
