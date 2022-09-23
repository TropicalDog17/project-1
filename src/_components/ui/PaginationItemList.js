import Pagination from "react-bootstrap/Pagination";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Fragment } from "react";
import { articleAtom, pageIndexAtom } from "../../state";
import {
  MAX_ARTICLES_PER_PAGE,
  MAX_VISIBLE_PAGINATION_ITEM,
} from "../../common";
import { useHandlePagination } from "../../hooks";
export { PaginationItemList };

function PaginationItemList() {
  const articles = useRecoilValue(articleAtom);
  const length = Math.ceil(articles.length / MAX_ARTICLES_PER_PAGE);
  const { handleIndex } = useHandlePagination();
  const currentPageIndex = useRecoilValue(pageIndexAtom);
  if (!articles || length < 0) return;
  else if (length === 1)
    return (
      <Pagination.Item onClick={() => handleIndex(1)} active={true}>
        {1}
      </Pagination.Item>
    );
  else if (length < 5)
    return (
      <Fragment>
        {Array.from(Array(length).keys()).map((_, idx) => {
          <Pagination.Item
            onClick={() => handleIndex(idx + 1)}
            key={idx + 1}
            active={idx + 1 === currentPageIndex}
            className="w-100"
          >
            {idx + 1}
          </Pagination.Item>;
        })}
      </Fragment>
    );
  // const middlePageIndex = Math.floor(length / 2);
  if (currentPageIndex < 4) {
    return (
      <Fragment>
        {Array.from(Array(MAX_VISIBLE_PAGINATION_ITEM).keys()).map((_, idx) => (
          <Pagination.Item
            onClick={() => handleIndex(idx + 1)}
            key={idx + 1}
            active={currentPageIndex === idx + 1}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Fragment>
    );
  } else {
    const visibleToUserPageIndexes = Array.from(
      { length: MAX_VISIBLE_PAGINATION_ITEM },
      (_, i) => i + 1
    ); //An array contains indexes visible to user
    return (
      <Fragment>
        {visibleToUserPageIndexes.map((idx) => (
          <Pagination.Item
            onClick={() => handleIndex(idx + currentPageIndex - 3)}
            key={idx + currentPageIndex - 3}
            active={idx + currentPageIndex - 3 === currentPageIndex}
          >
            {idx + currentPageIndex - 3}
          </Pagination.Item>
        ))}
      </Fragment>
    );
  }
}
