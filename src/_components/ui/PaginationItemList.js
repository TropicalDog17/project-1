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
  const pageIndex = useRecoilValue(pageIndexAtom);
  if (!articles || length < 0) return;
  else if (length === 1)
    return (
      <Pagination.Item onClick={() => handlePageIndex(1)}>{1}</Pagination.Item>
    );
  else if (length < 5)
    return (
      <Fragment>
        {Array.from(Array(length).keys()).map((_, idx) => {
          <Pagination.Item
            onClick={() => handlePageIndex(idx + 1)}
            key={idx + 1}
            active={idx + 1 === pageIndex}
            className="w-100"
          >
            {idx + 1}
          </Pagination.Item>;
        })}
      </Fragment>
    );
  // const middlePageIndex = Math.floor(length / 2);
  if (pageIndex < 4) {
    return (
      <Fragment>
        {Array.from(Array(4).keys()).map((_, idx) => (
          <Pagination.Item
            onClick={() => handlePageIndex(idx + 1)}
            key={idx + 1}
            active={idx + 1 === pageIndex}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {Array.from(Array(4).keys()).map((_, idx) => (
          <Pagination.Item
            onClick={() => handlePageIndex(idx + pageIndex - 3)}
            key={idx + pageIndex - 3}
            active={idx + pageIndex - 3 === pageIndex}
          >
            {idx + pageIndex - 3}
          </Pagination.Item>
        ))}
      </Fragment>
    );
  }

  function useHandlePageIndex() {
    const setPageIndex = useSetRecoilState(pageIndexAtom);
    function handlePageIndex(index) {
      setPageIndex(index);
    }
    return handlePageIndex;
  }
}
