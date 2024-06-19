/**
 * Pagination Component
 * 
 * Created by Melanu Dev Team
 *
 * This component is designed to provide a pagination interface for navigating through a list of items.
 * It allows users to click on page numbers, move to the next, previous, first, or last page.
 *
 * Props:
 * - currentPage: The current active page.
 * - maxPage: The maximum number of pages.
 * - onPageChange: Callback function that will be triggered when the page changes.
 *
 * Example Usage:
 *
 * ```tsx
 * import Pagination from './Pagination';
 *
 * const MyComponent = () => {
 *   const [page, setPage] = useState(1);
 *   const maxPages = 10; // The total number of pages
 *
 *   const handlePageChange = (newPage) => {
 *     setPage(newPage);
 *     // Perform actions such as fetching data for the new page
 *   };
 *
 *   return (
 *     <Pagination
 *       currentPage={page}
 *       maxPage={maxPages}
 *       onPageChange={handlePageChange}
 *     />
 *   );
 * };
 *
 */

import { Stack } from '@chakra-ui/react';
import fill from 'fill-range';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import IconButton from './IconButton';
import NumberButton from './NumberButton';

const getVisiblePages = (page: number, maxPage: number) => {
  if (page <= 2) return fill(1, maxPage >= 3 ? 3 : maxPage);
  else if (page >= maxPage - 1) return fill(maxPage - 2 >= 1 ? maxPage - 2 : maxPage - 1, maxPage);
  else return [page - 1, page, page + 1];
};

interface PaginationProps {
  page: number;
  maxPage: number;
  onChange: (page: number) => void;
}

const Pagination = ({
  page,
  maxPage,
  onChange,
}: PaginationProps) => {
  const visiblePages = getVisiblePages(page, maxPage);

  const handleNumberButtonClick = (page: number) => {
    onChange(page);
  };

  const handleFirstButtonClick = () => {
    onChange(1);
  };

  const handlePrevButtonClick = () => {
    const newPage = page > 1 ? page - 1 : page;
    onChange(newPage);
  };

  const handleLastButtonClick = () => {
    onChange(maxPage);
  };

  const handleNextButtonClick = () => {
    const newPage = page < maxPage ? page + 1 : page;
    onChange(newPage);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0}
    >
      <IconButton
        icon={FiChevronsLeft}
        label="First"
        onClick={handleFirstButtonClick}
      />
      <IconButton
        icon={FiChevronLeft}
        label="Previous"
        onClick={handlePrevButtonClick}
      />
      {visiblePages.map((p, i) => (
        <NumberButton
          key={i}
          isActive={page === p}
          onClick={() => handleNumberButtonClick(p)}
        >
          {p}
        </NumberButton>
      ))}
      <IconButton
        icon={FiChevronRight}
        label="Next"
        onClick={handleNextButtonClick}
      />
      <IconButton
        icon={FiChevronsRight}
        label="Last"
        onClick={handleLastButtonClick}
      />
    </Stack>
  );
};

export default Pagination;
