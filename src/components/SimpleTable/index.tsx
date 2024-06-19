import { Text, Table, Card, Flex, useColorModeValue } from "@chakra-ui/react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export interface SimpleTableColumn {
  name?: string;
  label: string;
  format?: (data: any, index?: any) => any;
}

interface SimpleTableProps {
  title?: string;
  primaryKey?: string;
  columns: SimpleTableColumn[];
  rows: any[];
  rowActions?: any[];
}

const SimpleTable = ({
  title,
  columns,
  rows,
  rowActions,
}: SimpleTableProps) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card px="0px" overflowX={"auto"}>
      {title && (
        <>
          <Flex
            px="25px"
            mt="25px"
            mb="20px"
            justifyContent="space-between"
            align="center"
          >
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
        </>
      )}
      <Table overflowX="auto" display={"block"} variant="simple">
        <TableHeader
         columns={columns}
         rowActions={rowActions}
          hasRowActions={Boolean(rowActions)} />
        <TableBody columns={columns} rows={rows} rowActions={rowActions} />
      </Table>
    </Card>
  );
};

export default SimpleTable;
