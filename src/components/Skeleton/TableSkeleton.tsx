import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";

const TableSkeleton = () => {
//   const columns = useBreakpointValue({ base: '1', md: '2', lg: '4' });
  // const columns = 1;

  return (
    <>
      {/* <pre>{columns}</pre> */}
      <SimpleGrid w="100%" columns={{ base: 1 }} spacing={8} bg="white" p={4} rounded="lg">
        {Array(5)
          .fill(1)
          .map((_, i) => (
            <SimpleGrid key={i} columns={{ base: 1, lg: 4 }} spacing={5}>
              {Array(4)
                .fill(1)
                .map((_, j) => (
                  <Box key={`${i}_${j}`}>
                    <Skeleton w={i === 0 ? 28 : 48} height={5} />
                  </Box>
                ))}
            </SimpleGrid>
          ))}
      </SimpleGrid>
    </>
  );
};

export default TableSkeleton;
