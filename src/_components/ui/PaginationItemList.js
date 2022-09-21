import Pagination from "react-bootstrap/Pagination";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { articleAtom, pageIndexAtom } from "../../state";
import { Fragment } from "react";
function PaginationItemList() {
  const handlePageIndex = useHandlePageIndex();
  const articles = useRecoilValue(articleAtom);
  const length = articles.length;
  if (length < 0) return;
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
  return (
    <Fragment>
      <Pagination.Item onClick={() => handlePageIndex(1)}>{1}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item onClick={() => handlePageIndex(Math.round(length / 2))}>
        {Math.round(length / 2)}
      </Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item onClick={() => handlePageIndex(length)}>
        {13}
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

export { PaginationItemList };
