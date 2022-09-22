import Pagination from "react-bootstrap/Pagination"; //Duplicated name
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { articleAtom, currentPageSelector, pageIndexAtom } from "../../state";
import { PaginationItemList } from "./PaginationItemList";
export { PaginationComponent };
function PaginationComponent() {
  const handleNext = useHandleNext();
  const handlePrev = useHandlePrev();
  const handlePageIndex = useHandlePageIndex();
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev onClick={handlePrev} />
      <PaginationItemList />
      <Pagination.Next onClick={handleNext} />
      <Pagination.Last />
    </Pagination>
  );
  function useHandlePageIndex() {
    const setPageIndex = useSetRecoilState(pageIndexAtom);
    function handlePageIndex(index) {
      setPageIndex(index);
    }
    return handlePageIndex;
  }
  function useHandlePrev() {
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);
    const articles = useRecoilState(articleAtom);
    function handlePrev() {
      console.log(pageIndex);

      if (pageIndex <= 1) {
        setPageIndex(pageIndex);
      } else {
        setPageIndex(pageIndex - 1);
      }
    }
    return handlePrev;
  }
  function useHandleNext() {
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);
    const articleList = useRecoilValue(currentPageSelector);
    const articles = useRecoilValue(articleAtom);

    const MAX_ARTICLES_PER_PAGE = 5;
    function handleNext() {
      if (articles.length / MAX_ARTICLES_PER_PAGE < pageIndex) {
        setPageIndex(pageIndex);
      } else {
        setPageIndex(pageIndex + 1);
      }
    }
    return handleNext;
  }
}
