import axios from "axios";
const axios_config = {
  baseURL: "https://7w4kxl.deta.dev",
  headers: { crossorigin: true },
};
const articleController = {
  getAll: async function getAllArticle() {
    const response = await axios.get("/articles", axios_config);
    return response.data;
  },
};
export { articleController };
