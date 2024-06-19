import { Thead, Tr, Th } from '@chakra-ui/react';
import { SimpleTableColumn } from '.';
import RowActions from 'components/DataTable/RowActions';

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
  columns: SimpleTableColumn[];
  rowActions?: any[];
  hasRowActions?: boolean;
}

const TableHeader = ({
  columns,
  rowActions,
}: TableHeaderProps) => {

  return (
    <Thead>
      <Tr>
        {columns.map(({ label }, i) => (
          <Th key={i} {...thBaseStyle}>
            {label}
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
