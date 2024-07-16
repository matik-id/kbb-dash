"use client";
import {
  Box,
  Card,
  SimpleGrid,
  useColorModeValue,
  Text,
  Image,
  Stack,
  AspectRatio,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { donationService } from "services";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MdLocationPin } from "react-icons/md";

const fetchDetail = async (id: string | string[] | undefined) => {
  try {
    const response = await donationService.getDonation(id);
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
      const response = await fetchDetail(id);
      setData(response);
    })();
  }, [id]);

  const textColorPrimary = useColorModeValue("green.700", "green.300");

  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <Box
      mx="auto"
      p={{ base: "20px", md: "30px" }}
      minH="100vh"
      pt="50px"
      maxW="7xl"
    >
      {data && (
        <Card
          px={{ base: "20px", md: "30px" }}
          py={{ base: "20px", md: "30px" }}
          w="full"
          mx="auto"
          boxShadow="2xl"
          borderRadius="lg"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Stack spacing={6}>
            {data.title && (
              <Heading
                fontSize="2xl"
                fontWeight="bold"
                color={useColorModeValue("green.700", "green.300")}
                textAlign="center"
                mb={4}
              >
                {data.title}
              </Heading>
            )}

            <Box
              position="relative"
              height="60vh"
              borderRadius="md"
              overflow="hidden"
              boxShadow="lg"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={data.image || "/default-image.jpg"}
                  alt="image"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </AspectRatio>
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                p="20px"
                bgGradient="linear(to-t, blackAlpha.700, transparent)"
                color={textColorPrimary}
              >
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  bg="blackAlpha.700"
                  color="white"
                  px="2"
                  py="1"
                  border="1px"
                  borderColor="black"
                  borderRadius="md"
                  opacity="0.8"
                >
                  <Icon as={MdLocationPin} color="red" /> {data.location}
                </Text>
              </Box>
            </Box>

            {data.type && (
              <Box
                bg={useColorModeValue("gray.50", "gray.700")}
                p={4}
                borderRadius="md"
                boxShadow="md"
                dangerouslySetInnerHTML={{ __html: data.type }}
              />
            )}

            {data.content && (
              <Box
                bg={useColorModeValue("gray.50", "gray.700")}
                p={4}
                borderRadius="md"
                boxShadow="md"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            )}

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {data.target_balance && (
                <Box
                  bg={useColorModeValue("gray.100", "gray.600")}
                  p={4}
                  borderRadius="md"
                  boxShadow="md"
                >
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={textColorPrimary}
                  >
                    <em>Target Donasi: {data.target_balance}</em>
                  </Text>
                </Box>
              )}

              {data.balance_collected && (
                <Box
                  bg={useColorModeValue("gray.100", "gray.600")}
                  p={4}
                  borderRadius="md"
                  boxShadow="md"
                >
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={textColorPrimary}
                  >
                    <em>Donasi Terkumpul: {data.balance_collected}</em>
                  </Text>
                </Box>
              )}

              {data.date_start && (
                <Box
                  bg={useColorModeValue("gray.100", "gray.600")}
                  p={4}
                  borderRadius="md"
                  boxShadow="md"
                >
                  <Text fontSize="md" color={textColorPrimary}>
                    <i>Tanggal Mulai: {data.date_start}</i>
                  </Text>
                </Box>
              )}

              {data.date_end && (
                <Box
                  bg={useColorModeValue("gray.100", "gray.600")}
                  p={4}
                  borderRadius="md"
                  boxShadow="md"
                >
                  <Text fontSize="md" color={textColorPrimary}>
                    <i>Tanggal Akhir: {data.date_end}</i>
                  </Text>
                </Box>
              )}
            </SimpleGrid>
          </Stack>
        </Card>
      )}
    </Box>
  );
}
