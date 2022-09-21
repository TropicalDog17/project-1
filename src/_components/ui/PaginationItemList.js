import Pagination from "react-bootstrap/Pagination";
import { Fragment } from "react";
function PaginationItemList({ length }) {
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
      <Pagination.Item onClick={() => handlePageIndex(length / 2)}>
        {5}
      </Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item onClick={() => handlePageIndex(length)}>
        {13}
      </Pagination.Item>
    </Fragment>
  );
}
