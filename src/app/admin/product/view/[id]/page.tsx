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
  Divider,
  Button,
  Flex,
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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const id = params.id;

  useEffect(() => {
    (async () => {
      if (!id) return;
      const response = await fetchDetail(id);
      setData(response);
    })();
  }, [id]);

  const textColorPrimary = useColorModeValue("green.600", "green.300"); // Adjusted color value

  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4); // Adjust '4' based on the number of images
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + 4) % 4); // Adjust '4' based on the number of images
  };

  return (
    <Box mx="auto" p={{ base: "20px", md: "30px" }} minH="100vh" pt="50px" maxW="7xl">
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
          <Flex direction={{ base: "column", md: "row" }} alignItems="center" justifyContent="center">
            {/* Image Section */}
            <Box flex="1" position="relative" borderRadius="lg" overflow="hidden" mb={{ base: 4, md: 0 }}>
              {/* Image Carousel */}
              <Stack spacing={4} position="relative">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={
                      currentImageIndex === 0
                        ? data.thumbnail || "/default-thumbnail.jpg"
                        : currentImageIndex === 1
                        ? data.image1 || "/default-image.jpg"
                        : currentImageIndex === 2
                        ? data.image2 || "/default-image.jpg"
                        : data.image3 || "/default-image.jpg"
                    }
                    alt="gallery image"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    transition="transform 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </AspectRatio>
                {/* Navigation Buttons */}
                <Flex justify="center">
                  <Button colorScheme="green" size="sm" mx={2} onClick={handlePrevImage}>
                    Prev
                  </Button>
                  <Button colorScheme="green" size="sm" mx={2} onClick={handleNextImage}>
                    Next
                  </Button>
                </Flex>
              </Stack>
            </Box>

            {/* Product Information */}
            <Stack flex="1" spacing={8} p={{ base: "20px", md: "30px" }}>
              {/* Product Title */}
              {data.title && (
                <Box textAlign={{ base: "center", md: "left" }}>
                  <Text fontSize="3xl" fontWeight="bold" mb="4" color={useColorModeValue("green.600", "green.300")}>
                    {data.title}
                  </Text>
                  <Divider borderColor={useColorModeValue("green.700", "green.400")} />
                </Box>
              )}

              {/* Owner and Contact */}
              <Box textAlign={{ base: "center", md: "left" }} mt={4}>
                {data.owner && (
                  <Text fontSize="lg" color={textColorPrimary} mb="2">
                    <strong>Nama Pemilik: </strong>
                    {data.owner}
                  </Text>
                )}
                {data.phone && (
                  <Text fontSize="lg" color={textColorPrimary} mb="2">
                    <strong>Nomor Telepon: </strong>
                    {data.phone}
                  </Text>
                )}
                {data.price && (
                  <Text fontSize="lg" color={textColorPrimary}>
                    <strong>Harga: </strong>
                    {data.price}
                  </Text>
                )}
              </Box>

              {/* Product Description */}
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

              {/* Action Button */}
              <Box textAlign={{ base: "center", md: "left" }} mt={6}>
                <Button colorScheme="green" size="lg" onClick={() => alert("Button Clicked")}>
                  Beli Sekarang
                </Button>
              </Box>
            </Stack>
          </Flex>
        </Card>
      )}
    </Box>
  );
}
