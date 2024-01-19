import { useState } from "react";

interface PaginationProps {
    itemsPerPages: number;
    items: unknown[];
}

interface UsePagination {
    currentPage: number;
    handlePageClick: (data: { selected: number }) => void;
    totalPages: number;
}

const usePagination = ({
    itemsPerPages,
    items,
}: PaginationProps): UsePagination => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    const totalPages = Math.ceil(items.length / itemsPerPages);

    return { currentPage, handlePageClick, totalPages };
};

export default usePagination