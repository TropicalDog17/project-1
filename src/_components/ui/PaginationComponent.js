import Pagination from "react-bootstrap/Pagination"; //Duplicated name
import { PaginationItemList } from "./PaginationItemList";
import { useHandlePagination } from "../../hooks";
export { PaginationComponent };
function PaginationComponent() {
  const { handleFirst, handleLast, handlePrev, handleNext } =
    useHandlePagination();
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
}
