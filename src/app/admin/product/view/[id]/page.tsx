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

// Assets
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { productService } from "services";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MdLocationPin, MdOutlineOpenInNew } from "react-icons/md";

const fetchDetail = async (id: string | string[] | undefined) => {
  try {
    const response = await productService.getProduct(id);
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

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

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
        >
          <Stack spacing={6}>
            {data.title && (
              <Text fontSize="2xl" fontWeight="bold">
                <Box dangerouslySetInnerHTML={{ __html: data.title }} />
              </Text>
            )}
            {data.owner && (
              <Box dangerouslySetInnerHTML={{ __html: `<strong> Nama Pemilik : ${data.owner}</strong>` }} />
            )}

            {data.phone && (
              <Box dangerouslySetInnerHTML={{ __html: `<strong> Nomor Telepon : ${data.phone}</strong>` }} />
            )}

            {data.price && (
              <Box dangerouslySetInnerHTML={{ __html: `<strong> Harga : ${data.price}</strong>` }} />
            )}

            <Box position="relative" height="90vh" borderRadius={"md"} overflow="hidden">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={data.thumbnail || "/default-thumbnail.jpg"}
                  alt="thumbnail"
                  objectFit="cover"
                  width="100%"
                  height="100%"
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
                  fontSize="md"
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
                  {data.category}
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color="white"
                  >
                    {data.name}
                  </Text>
                  <Text
                    fontSize="md"
                    color="white"
                  >
                    <Icon as={MdLocationPin} color="red" /> {data.address}
                  </Text>
                </Text>
              </Box>
            </Box>

            {(data.image1 || data.image2 || data.image3) && (
              <Stack spacing={6}>
                <Heading size="md" mb="4px">
                  Galeri
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  {data.image1 && (
                    <Box
                      maxW="100%"
                      h="200px"
                      overflow="hidden"
                      position="relative"
                      borderRadius="md"
                    >
                      <Image
                        src={data.image1}
                        alt="gallery img1"
                        objectFit="cover"
                        position="absolute"
                        minH="200px"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      />
                    </Box>
                  )}
                  {data.image2 && (
                    <Box
                      maxW="100%"
                      h="200px"
                      overflow="hidden"
                      position="relative"
                      borderRadius="md"
                    >
                      <Image
                        src={data.image2}
                        alt="gallery img2"
                        objectFit="cover"
                        position="absolute"
                        minH="200px"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      />
                    </Box>
                  )}
                  {data.image3 && (
                    <Box
                      maxW="100%"
                      h="200px"
                      overflow="hidden"
                      position="relative"
                      borderRadius="md"
                    >
                      <Image
                        src={data.image3}
                        alt="gallery img3"
                        objectFit="cover"
                        position="absolute"
                        minH="200px"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      />
                    </Box>
                  )}
                </SimpleGrid>
              </Stack>
            )}


            {data.content && (
              <Box dangerouslySetInnerHTML={{ __html: data.content }} />
            )}
          </Stack>
        </Card>
      )}
    </Box>
  );
}
