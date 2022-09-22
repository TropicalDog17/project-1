import Pagination from "react-bootstrap/Pagination"; //Duplicated name
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { articleAtom, currentPageSelector, pageIndexAtom } from "../../state";
import { PaginationItemList } from "./PaginationItemList";
import { MAX_ARTICLES_PER_PAGE } from "../../common";
export { PaginationComponent };
function PaginationComponent() {
  const handleNext = useHandleNext();
  const handlePrev = useHandlePrev();
  const handleFirst = useHandleFirst();
  const handleLast = useHandleLast();
  return (
    <Pagination size="lg">
      <Pagination.First onClick={handleFirst}>First</Pagination.First>
      <Pagination.Prev onClick={handlePrev} className="me-2">
        Previous
      </Pagination.Prev>
      <PaginationItemList />
      <Pagination.Next onClick={handleNext} className="ms-2">
        Next
      </Pagination.Next>
      <Pagination.Last onClick={handleLast}>Last</Pagination.Last>
    </Pagination>
  );

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

    function handleNext() {
      if (articles.length / MAX_ARTICLES_PER_PAGE < pageIndex) {
        setPageIndex(pageIndex);
      } else {
        setPageIndex(pageIndex + 1);
      }
    }
    return handleNext;
  }
  function useHandleFirst() {
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);
    function handleFirst() {
      setPageIndex(1);
    }
    return handleFirst;
  }
  function useHandleLast() {
    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);
    const articles = useRecoilValue(articleAtom);

    function handleLast() {
      if (!articles) return;
      console.log(articles.length);
      setPageIndex(Math.ceil(articles.length / MAX_ARTICLES_PER_PAGE));
    }
    return handleLast;
  }
}
