import articleController from "../controller/articleController";
import { selector } from "recoil";
const ApiSelector = selector({
  key: "mySelector",
  get: async ({ get }) => {
    return await articleController.getAll();
  },
});
export { ApiSelector };
