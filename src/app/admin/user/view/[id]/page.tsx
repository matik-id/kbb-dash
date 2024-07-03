"use client";
import {
  Box,
  Card,
  SimpleGrid,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

// Assets
import Information from "app/admin/profile/Information";
import { useEffect, useState } from "react";
import { userService } from "services";

const fecthDetail = async (id: string | string[] | undefined) => {
  try {
    const response = await userService.getUser(id);
    return response.data;
  } catch (error) {
    throw new Error("Fetching Error");
  }
};

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const id = params.id;

  useEffect(() => {
    (async () => {
      if (!id) return;
      const response = await fecthDetail(id);
      setData(response);
    })();
  }, [id]);
  
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <>
      <Box
        mx="auto"
        p= {{ base: "20px", md: "30px" }}
        pe="20px"
        minH="100vh"
        pt="50px"
      >
        <Card p={{ base: "10px", md: "20px" }} mb={{ base: "0px", "2xl": "20px" }}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mb="4px"
          >
            Detail Anggota
          </Text>
          <hr />
          <SimpleGrid columns={2} gap="20px" mt={"20px"}>
            <Information
              boxShadow={cardShadow}
              title="Nama Lengkap"
              value={data && data.fullname}
            />
            <Information
              boxShadow={cardShadow}
              title="Email"
              value={data && data.email}
            />
             <Information
              boxShadow={cardShadow}
              title="No Telp"
              value={data && data.phone}
            />
            <Information
              boxShadow={cardShadow}
              title="Jenis Kelamin"
              value={data && data.gender}
            />
          </SimpleGrid>
        </Card>
      </Box>
    </>
  );
}
