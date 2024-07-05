"use client";
import {
  Box,
  Card,
  SimpleGrid,
  useColorModeValue,
  Text,
  Image,
  Button,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabIndicator,
  Divider,
} from "@chakra-ui/react";

// Assets
import { useEffect, useState } from "react";
import { userService } from "services";
import { AiFillLike } from "react-icons/ai";
import VirtualCard from "./card";

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

  const member = {
    nomorAnggota: "123456",
    nama: "Cahaya Dewi",
    tempatTanggalLahir: "Any City, 20 Desember 2007",
    jabatan: "Ketua",
    alamat: "123 Anywhere St., Any City, ST 12345",
  };

  useEffect(() => {
    (async () => {
      if (!id) return;
      const response = await fecthDetail(id);
      setData(response);
    })();
  }, [id]);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <>
      <Box
        mx="auto"
        p={{ base: "20px", md: "30px" }}
        pe="20px"
        minH="100vh"
        pt="50px"
      >
        <Card
          p={{ base: "10px", md: "20px" }}
          mb={{ base: "0px", "2xl": "20px" }}
        >
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mb="4px"
          >
            Detail Anggota
          </Text>
          <hr />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={"20px"}>
            <Box
              bg="white"
              boxShadow="lg"
              rounded="lg"
              p={6}
              textAlign="center"
            >
              <Image
                src={data?.photo}
                alt="Avatar"
                mx="auto"
                boxSize="150px"
                borderRadius="full"
              />
              <Text fontSize="xl" fontWeight="bold" mt={4}>
                {data?.fullname}
              </Text>
              <Text color="gray.500" fontSize="lg">
                {data?.position}
              </Text>
              <Text color="gray.500" fontSize="lg">
                {data?.number}
              </Text>

              <Stack direction="row" spacing={4} mt={4} justifyContent="center">
                <Button
                  colorScheme="blue"
                  leftIcon={<AiFillLike />}
                  variant="outline"
                >
                  Total Menyukai : {data?.likes}
                </Button>
              </Stack>
              <Divider my={4} />
              <Tabs
                isFitted
                variant="unstyled"
                colorScheme="blue"
                size={"xs"}
                mt={4}
              >
                <TabList>
                  <Tab>Foto KTP</Tab>
                  <Tab>Kartu Anggota</Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="blue.500"
                  borderRadius="1px"
                />
                <TabPanels>
                  <TabPanel>
                    <Box textAlign="center" my={4}>
                      <Image
                        src={data?.file_ktp}
                        alt="KTP"
                        mx="auto"
                        width={"400px"}
                        borderRadius="xl"
                        objectFit="contain"
                        my={4}
                      />
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box textAlign="center" my={4}>
                      {data && <VirtualCard member={data} />}
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            <Box bg="white" boxShadow="lg" rounded="lg" p={6} textAlign="left">
              <Text fontSize="lg" fontWeight="semibold" my={2}>
                No. HP
              </Text>
              <Text color="gray.600">{data?.phone}</Text>

              <Text fontSize="lg" fontWeight="semibold" my={2}>
                Email
              </Text>
              <Text color="gray.600">{data?.email}</Text>

              <Text fontSize="lg" fontWeight="semibold" my={2}>
                Jenis Kelamin
              </Text>
              <Text color="gray.600">
                {data?.gender == "male" ? "Laki-laki" : "Perempuan"}
              </Text>

              <Text fontSize="lg" fontWeight="semibold" my={2}>
                Alamat
              </Text>
              <Text color="gray.600">{data?.address}</Text>

              <Text fontSize="lg" fontWeight="semibold" my={2}>
                Pendidikan Terakhir
              </Text>
              <Text color="gray.600">{data?.education}</Text>

              <Text fontSize="lg" fontWeight="semibold" my={2}>
                Profesi
              </Text>
              <Text color="gray.600">{data?.profession}</Text>

              <Text fontSize="lg" fontWeight="semibold" my={2}>
                Perusahaan
              </Text>
              <Text color="gray.600">{data?.company}</Text>

              <Text fontSize="lg" fontWeight="semibold" my={2}>
                No. KTP
              </Text>
              <Text color="gray.600">{data?.nik}</Text>

              <Text fontSize="lg" fontWeight="semibold" my={2}>
                Tempat, Tanggal Lahir
              </Text>
              <Text color="gray.600">
                {data?.pob},{" "}
                {new Date(data?.dob).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Text>

              <Text fontSize="lg" fontWeight="semibold" my={2}>
                Jabatan
              </Text>
              <Text color="gray.600">{data?.position}</Text>
            </Box>
          </SimpleGrid>
        </Card>
      </Box>
    </>
  );
}
