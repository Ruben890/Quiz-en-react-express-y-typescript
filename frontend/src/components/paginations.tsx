import React from "react";
import ReactPaginate from "react-paginate";
import usePagination from "../hooks/usePagination";
import "./style/pagination.css"
interface PaginationComponentProps {
  pagination: ReturnType<typeof usePagination>;
}

export const Pagination: React.FC<PaginationComponentProps> = ({ pagination }) => {
  const { currentPage, handlePageClick, totalPages } = pagination;

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      previousLabel={
        <div className="btn btn-neutral p-2 rounded-lg">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
      }
      nextLabel={
        <div className="btn btn-neutral p-2 rounded-lg">
          <i className="fa-solid fa-arrow-right"></i>
        </div>}
      breakLabel={"..."}
      onPageChange={handlePageClick}
      containerClassName={"pagination flex m-3 text-2xl justify-around"}
      activeClassName={"active"}
      forcePage={currentPage}
    />
  );
};
