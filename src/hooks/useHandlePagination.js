import { useRecoilState, useRecoilValue } from "recoil";
import { pageIndexAtom, articleAtom, currentPageIndexSelector } from "../state";
import { MAX_ARTICLES_PER_PAGE } from "../common";
export { useHandlePagination };
function useHandlePagination() {
  const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);
  const articleList = useRecoilValue(currentPageIndexSelector);
  const articles = useRecoilValue(articleAtom);
  return {
    handlePrev,
    handleNext,
    handleFirst,
    handleLast,
    handleIndex,
  };
  function handlePrev() {
    console.log(pageIndex);

    if (pageIndex <= 1) {
      setPageIndex(pageIndex);
    } else {
      setPageIndex(pageIndex - 1);
    }
  }
  function handleNext() {
    if (articles.length / MAX_ARTICLES_PER_PAGE <= pageIndex) {
      setPageIndex(pageIndex);
    } else {
      setPageIndex(pageIndex + 1);
    }
  }
  function handleFirst() {
    if (!articles) return;
    setPageIndex(1);
  }
  function handleLast() {
    if (!articles) return;
    setPageIndex(Math.ceil(articles.length / MAX_ARTICLES_PER_PAGE));
  }
  function handleIndex(index) {
    setPageIndex(index);
  }
}
