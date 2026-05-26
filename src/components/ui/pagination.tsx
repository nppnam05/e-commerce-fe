import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const siblingCount = 1;

    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      for (let i = 1; i <= leftItemCount; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
      return pages;
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      pages.push(1);
      pages.push("...");
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
      return pages;
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1.5 py-4 select-none">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        title="First Page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        title="Previous Page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm font-medium text-gray-400"
            >
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-sm font-semibold transition-all active:scale-95 ${
              isCurrent
                ? "bg-blue-600 text-white shadow-sm shadow-blue-100"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        title="Next Page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        title="Last Page"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  );
};
