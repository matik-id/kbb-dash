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
  Badge,
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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // State untuk indeks gambar yang sedang ditampilkan
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

  // Fungsi untuk berganti gambar
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4); // Ganti '4' dengan jumlah maksimum gambar yang Anda miliki
  };

  // Fungsi untuk berganti gambar ke sebelumnya
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + 4) % 4); // Ganti '4' dengan jumlah maksimum gambar yang Anda miliki
  };

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
          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              flex="1"
              position="relative"
              height={{ base: "40vh", md: "60vh" }}
              borderRadius="lg"
              overflow="hidden"
              mb={{ base: 4, md: 0 }}
            >
              {/* Gambar utama */}
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
                style={{
                  opacity: 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />

              {/* Tombol navigasi */}
              <Box position="absolute" top="50%" transform="translateY(-50%)" left="10px">
                <Button colorScheme="teal" size="sm" onClick={handlePrevImage}>
                  Prev
                </Button>
              </Box>
              <Box position="absolute" top="50%" transform="translateY(-50%)" right="10px">
                <Button colorScheme="teal" size="sm" onClick={handleNextImage}>
                  Next
                </Button>
              </Box>
            </Box>

            <Stack flex="1" spacing={8} p={{ base: "20px", md: "30px" }}>
              {/* Informasi produk */}
              {data.title && (
                <Box textAlign={{ base: "center", md: "left" }}>
                  <Text fontSize="3xl" fontWeight="bold" mb="4" color="green.500">
                    {data.title}
                  </Text>
                  <Divider borderColor="green.500" />
                </Box>
              )}

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

              {/* Konten produk */}
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

              {/* Tombol aksi */}
              <Box textAlign={{ base: "center", md: "left" }} mt={6}>
                <Button colorScheme="teal" size="lg" onClick={() => alert("Button Clicked")}>
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
