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
  Divider,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { productService } from "services";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
          <Stack spacing={8}>
            {data.title && (
              <Box textAlign="center">
                <Text fontSize="3xl" fontWeight="bold" mb="4" color="green.500">
                  {data.title}
                </Text>
                <Divider borderColor="green.500" />
              </Box>
            )}
            <Box position="relative" height="60vh" borderRadius="lg" overflow="hidden">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={data.thumbnail || "/default-thumbnail.jpg"}
                  alt="thumbnail"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </AspectRatio>

              <Box>
                <Badge
                  fontSize="md"
                  fontWeight="bold"
                  bg="blackAlpha.700"
                  px="2"
                  py="1"
                  border="1px"
                  borderColor="black"
                  borderRadius="md"
                  opacity="0.8"
                >
                  {data.category}
                </Badge>
              </Box>
            </Box>

            <Box textAlign="center" mt={4}>
              {data.owner && (
                <Text fontSize="lg" color={textColorPrimary} mb="2">
                  <strong>Nama Pemilik: </strong>{data.owner}
                </Text>
              )}
              {data.phone && (
                <Text fontSize="lg" color={textColorPrimary} mb="2">
                  <strong>Nomor Telepon: </strong>{data.phone}
                </Text>
              )}
              {data.price && (
                <Text fontSize="lg" color={textColorPrimary}>
                  <strong>Harga: </strong>{data.price}
                </Text>
              )}
            </Box>

            {(data.image1 || data.image2 || data.image3) && (
              <Stack spacing={6} mt={4}>
                <Heading size="lg" mb="4px" textAlign="center" color="green.500">
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
                      transition="transform 0.3s"
                      _hover={{ transform: "scale(1.05)" }}
                      boxShadow="lg"
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
                      transition="transform 0.3s"
                      _hover={{ transform: "scale(1.05)" }}
                      boxShadow="lg"
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
                      transition="transform 0.3s"
                      _hover={{ transform: "scale(1.05)" }}
                      boxShadow="lg"
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
              <Box
                mt={6}
                p={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="lg"
                bg={useColorModeValue("gray.50", "gray.700")}
                color={useColorModeValue("gray.800", "gray.100")}
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            )}
          </Stack>
        </Card>
      )}
    </Box>
  );
}
