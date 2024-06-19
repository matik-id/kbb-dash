import { Box, Checkbox, Icon, Thead, Tr, Th } from '@chakra-ui/react';
import { FaSort } from 'react-icons/fa';
import type { DataTableColumn } from '.';
import RowActions from './RowActions';

const thBaseStyle: any = {
  color: 'black',
  fontSize: 'sm',
  fontWeight: 'semibold',
  h: 12,
  lineHeight: 'none',
  textTransform: 'none',
  whiteSpace: 'nowrap',
};

interface TableHeaderProps {
  columns: DataTableColumn[];
  hasRowActions?: boolean;
  rowActions?: any[];
  isSelectable?: boolean;
  isSelectedAll?: boolean;
  onSelectAllClick?: () => void;
}

const TableHeader = ({
  columns,
  rowActions,
  isSelectable,
  isSelectedAll,
  onSelectAllClick = () => { },
}: TableHeaderProps) => {

  return (
    <Thead>
      <Tr>
        {isSelectable && (
          <Th
            {...thBaseStyle}
            cursor="pointer"
            w={0}
            onClick={onSelectAllClick}
          >
            <Checkbox
              aria-label="Select all"
              isChecked={isSelectedAll}
              pointerEvents="none"
              borderColor="gray.400"
              tabIndex={-1}
            />
          </Th>
        )}
        {columns.map(({ label, isSortable }, i) => (
          <Th key={i} {...thBaseStyle}>
            {label}
            {isSortable && (
              <Box as="span" ml="2">
                <Icon as={FaSort} w={4} h={4} />
              </Box>
            )}
          </Th>
        ))}
        {rowActions && (
          <Th {...thBaseStyle}>
            <RowActions
              items={rowActions}
              value={null}
              visibility="hidden"
            />
            <RowActions
              position="relative"
              items={rowActions}
              value={null}
              visibility="hidden"
            />
          </Th>
        )}
      </Tr>
    </Thead>
  );
};

export default TableHeader;
