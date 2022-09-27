function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function deleteItemAtIndex(arr, index) {}
function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}
export { replaceItemAtIndex, range };
