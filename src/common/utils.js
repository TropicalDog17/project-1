import axios from "axios";
function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function deleteItemAtIndex(arr, index) {}
function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}
async function getArticle(articleId, authToken) {
  try {
    let response = await axios.get(
      `http://localhost:5000/articles/${articleId}`,
      { headers: { Authorizaton: `Bearer ${authToken}` } }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export { replaceItemAtIndex, range, getArticle };
