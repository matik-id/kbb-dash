import React from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Image,
  VStack,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import dayjs from "dayjs";

// Import logo dan foto anggota
// Ganti dengan path background yang sesuai

const theme = extendTheme({
  colors: {
    primary: "#1E8B43",
    secondary: "#F7D633",
    text: "#333",
    white: "#FFFFFF",
  },
});

const VirtualCard = (data: any) => {
    console.log(data);
    
  const background = process.env.NEXT_PUBLIC_BASE_PATH + "/img/card.jpg";
  return (
    <ChakraProvider theme={theme}>
      <Box
        bgImage={`url(${background})`}
        bgSize="cover"
        bgPosition="center"
        border="1px"
        borderColor="gray.200"
        borderRadius="10px"
        boxShadow="xl"
        maxW="600px"
        p="20px"
        mx="auto"
        color="black"
      >
        <Flex direction="column" pl="20px" pt="80px">
          <Flex>
            <Image
              src={data.photo}
              alt="Foto Anggota"
              borderRadius="full"
              boxSize="100px"
              mr="20px"
            />
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">
                {data.fullname}
              </Text>
              <Text fontSize="md">
                <strong>NIM:</strong> {data.number}
              </Text>
              <Text fontSize="md">
                <strong>Jenis Kelamin:</strong>{" "}
                {data.gender == "male" ? "Laki - Laki" : "Perempuan"}
              </Text>
              <Text fontSize="md">
                <strong>TTL:</strong>{" "}
                {data.pob + ", " + dayjs(data.dob).format("DD MMMM YYYY")}
              </Text>
              <Text fontSize="md">
                <strong>Alamat:</strong> {data.address}
              </Text>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default VirtualCard;
