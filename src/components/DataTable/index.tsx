import {
  Box,
  Stack,
  Text,
  Table,
  Card,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Combobox from "../Combobox";
import Pagination from "../Pagination";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export interface DataTableColumn {
  name?: string;
  label: string;
  isSortable?: boolean;
  format?: (data: any, index?: any) => any;
}

interface DataTableProps {
  title?: string;
  primaryKey?: string;
  columns: DataTableColumn[];
  rows: any[];
  rowActions?: any[];
  isSelectable?: boolean;
  selectedIDs?: any[];
  setSelectedIDs?: (v: any[]) => void;
  onRowClick?: (row: any) => void;
  unstyledContainer?: boolean;
  navigateRow?: (row: any) => string;
}

const DataTable = ({
  title = "Table",
  primaryKey = "id",
  columns,
  rows,
  rowActions,
  isSelectable,
  selectedIDs = [],
  setSelectedIDs = () => {},
  onRowClick,
  navigateRow,
}: DataTableProps) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const firstIndex = (page - 1) * perPage;
  const lastIndex = firstIndex + perPage;
  const visibleRows = rows.slice(firstIndex, lastIndex);
  const maxPage = Math.ceil(rows.length / perPage);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const isSelectedAll = selectedIDs.length === rows.length;

  const handlePerPageChange = (perPage: number) => {
    window.scrollTo({ top: 0 });
    setPage(1);
    setPerPage(perPage);
  };

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0 });
    setPage(page);
  };

  const handleRowCheckboxClick = (row: any) => {
    const currentID = row[primaryKey];
    if (selectedIDs.includes(currentID)) {
      setSelectedIDs(selectedIDs.filter((v) => v !== currentID));
    } else {
      setSelectedIDs([...selectedIDs, currentID]);
    }
  };

  const handleRowContentClick = (row: any) => {
    if (isSelectable && !onRowClick) {
      const currentID = row[primaryKey];
      setSelectedIDs([currentID]);
    }

    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleSelectAllClick = () => {
    if (isSelectedAll) {
      setSelectedIDs([]);
    } else {
      setSelectedIDs(rows.map((row) => row[primaryKey]));
    }
  };

  useEffect(() => {
    setPage(1);
  }, [rows]);

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" mt="25px" mb="20px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          mb="4px"
          fontWeight="700"
          lineHeight="100%"
        >
          {title}
        </Text>
      </Flex>
      <hr />
      <Table overflowX="auto" display={"block"} variant="simple" color="gray.500">
        <TableHeader
          columns={columns}
          isSelectable={isSelectable}
          isSelectedAll={isSelectedAll}
          hasRowActions={Boolean(rowActions)}
          rowActions={rowActions}
          onSelectAllClick={handleSelectAllClick}
        />
        <TableBody
          columns={columns}
          rows={visibleRows}
          rowActions={rowActions}
          isClickable={Boolean(onRowClick)}
          isSelectable={isSelectable}
          selectedIDs={selectedIDs}
          primaryKey={primaryKey}
          onRowCheckboxClick={handleRowCheckboxClick}
          onRowContentClick={handleRowContentClick}
          navigateRow={navigateRow}
        />
      </Table>
      <Stack
        direction={{ base: "column-reverse", md: "row" }}
        alignItems="center"
        px={4}
        py={1}
        spacing={{ base: 5 }}
      >
        <Stack direction="row" alignItems="center">
          <Text fontSize="sm" fontWeight="medium">
            Tampilan
          </Text>
          <Box w="75px">
            <Combobox
              value={perPage}
              onChange={handlePerPageChange}
              items={[
                { value: 10, label: "10" },
                { value: 25, label: "25" },
                { value: 50, label: "50" },
                { value: 100, label: "100" },
              ]}
            />
          </Box>
        </Stack>
        <Box flex={1} display={{ base: "none", md: "block" }} />
        <Stack direction="row" alignItems="center" spacing={4}>
          <Text color={textColor} fontSize="sm" fontWeight="medium">
            Data {firstIndex + 1} sampai{" "}
            {lastIndex < rows.length ? lastIndex : rows.length} dari{" "}
            {rows.length}
          </Text>
          <Box>
            <Pagination
              page={page}
              maxPage={maxPage}
              onChange={handlePageChange}
            />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default DataTable;
