import { Checkbox, Tbody, Tr, Td, Box } from '@chakra-ui/react';
import { SimpleTableColumn } from '.';
import Link from 'next/link';
import RowActions from 'components/DataTable/RowActions';

const tdBaseStyle: any = {
  borderBottomColor: 'gray.300',
  fontSize: 'sm',
  fontWeight: 'medium',
  h: 14,
  transition: 'background .25s ease',
  whiteSpace: 'nowrap',
  position: 'relative',
  _groupHover: {
    bg: 'gray.100',
  },
};

const tdActiveStyle: any = {
  bg: 'blue.50',
  _groupHover: {
    bg: 'blue.50',
  },
};

interface TableBodyProps {
  columns: SimpleTableColumn[];
  rows: any[];
  isClickable?: boolean;
  isSelectable?: boolean;
  selectedIDs?: any[];
  primaryKey?: string;
  rowActions?: any[];
  onRowCheckboxClick?: (row: any) => void;
  onRowContentClick?: (row: any) => void;
  navigateRow?: (row: any) => string;
}

const TableBody = ({
  columns,
  rows,
  isClickable,
  isSelectable,
  selectedIDs = [],
  primaryKey = 'id',
  rowActions,
  onRowCheckboxClick = () => { },
  onRowContentClick = () => { },
  navigateRow,
}: TableBodyProps) => {
  return (
    <Tbody>
      {rows.map((row, i) => {
        const isSelected = selectedIDs.includes(row[primaryKey]);

        return (
          <Tr
            key={i}
            role="group"
          >
            {isSelectable && (
              <Td
                key={`${i}-chk`}
                bg={i % 2 === 0 ? 'rgb(248, 248, 248)' : 'white'}
                cursor="pointer"
                onClick={() => onRowCheckboxClick(row)}
                {...tdBaseStyle}
                {...(isSelected ? tdActiveStyle : {})}
              >
                <Checkbox
                  aria-label="Select this row"
                  pointerEvents="none"
                  bg="white"
                  borderColor="gray.400"
                  tabIndex={-1}
                  isChecked={isSelected}
                />
              </Td>
            )}
            {columns.map(({ name, format }, j) => (
              <Td
                key={`${i}-${j}`}
                bg={i % 2 === 0 ? 'rgb(248, 248, 248)' : 'white'}
                cursor={isClickable ? 'pointer' : 'inherit'}
                onClick={() => onRowContentClick(row)}
                {...tdBaseStyle}
                {...(isSelected ? tdActiveStyle : {})}
                {...(navigateRow ? { px: 0, py: 0, h: 'auto' } : {})}
              >
                {navigateRow && (
                  <Link href={navigateRow(row)}>
                    <Box px={6} py={4} w="100%" h="100%">
                      {!format && name && row[name]}
                      {format && format(row, i)}
                    </Box>
                  </Link>
                )}
                {!navigateRow && (
                  <>
                    {!format && name && row[name]}
                    {format && format(row, i)}
                  </>
                )}
              </Td>
            ))}
            {rowActions && (
              <Td
                {...tdBaseStyle}
                position="static"
                {...(isSelected ? tdActiveStyle : {})}
              >
                <RowActions
                  items={rowActions}
                  value={row}
                />
              </Td>
            )}
          </Tr>
        );
      })}
    </Tbody>
  );
};

export default TableBody;
