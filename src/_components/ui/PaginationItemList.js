import Pagination from "react-bootstrap/Pagination";
import { Fragment } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { articleAtom, pageIndexAtom } from "../../state";
import { MAX_ARTICLES_PER_PAGE } from "../../common";
export { PaginationItemList };

function PaginationItemList() {
  const articles = useRecoilValue(articleAtom);
  const length = Math.ceil(articles.length / MAX_ARTICLES_PER_PAGE);
  const handlePageIndex = useHandlePageIndex();

  if (!articles || length < 0) return;
  else if (length === 1)
    return (
      <Pagination.Item onClick={() => handlePageIndex(1)}>{1}</Pagination.Item>
    );
  else if (length < 5)
    return (
      <Fragment>
        {Array.from(Array(length).keys()).map((_, idx) => {
          <Pagination.Item onClick={() => handlePageIndex(idx + 1)}>
            {idx + 1}
          </Pagination.Item>;
        })}
      </Fragment>
    );
  const middlePageIndex = Math.floor(length / 2);
  return (
    <Fragment>
      <Pagination.Item onClick={() => handlePageIndex(1)}>{1}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item onClick={() => handlePageIndex(middlePageIndex)}>
        {middlePageIndex}
      </Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item onClick={() => handlePageIndex(length)}>
        {length}
      </Pagination.Item>
    </Fragment>
  );
  function useHandlePageIndex() {
    const setPageIndex = useSetRecoilState(pageIndexAtom);
    function handlePageIndex(index) {
      setPageIndex(index);
    }
    return handlePageIndex;
  }
}
