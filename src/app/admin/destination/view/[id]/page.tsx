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
  Badge,
} from "@chakra-ui/react";

// Assets
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { destinationService } from "services";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";

const fecthDetail = async (id: string | string[] | undefined) => {
  try {
    const response = await destinationService.getDestination(id);
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

  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <>
      <Box
        mx="auto"
        p={{ base: "20px", md: "30px" }}
        pe="20px"
        minH="100vh"
        pt="50px"
      >
        {data && (
          <Card
            px={{ base: "20px", md: "30px" }}
            py={{ base: "20px", md: "30px" }}
            w="full"
            mx="auto"
          >
            <Stack spacing={6}>
              {/* Title */}
              <Heading size="xl" mb="4px">
                {data.name}
              </Heading>
              <Stack isInline alignItems="flex-start" spacing={4}>
                <Box>
                  <Text color={textColorPrimary} mb="4px">
                    Kategori:
                  </Text>
                </Box>
                <Box>
                  <Text color={textColorPrimary} mb="4px">
                    {data.category}
                  </Text>
                </Box>
                <Box ml="auto">
                  <Text fontSize="sm" color={textColorPrimary} mb="4px">
                    {data.is_publish ? (
                      <Badge colorScheme="green">Publik</Badge>
                    ) : (
                      <Badge colorScheme="red">Tidak Publik</Badge>
                    )}
                  </Text>
                </Box>
              </Stack>

              {/* Thumbnail */}
              {data.thumbnail && (
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={data.thumbnail}
                    alt="detail img"
                    borderRadius="lg"
                    objectFit="cover"
                  />
                </AspectRatio>
              )}

              {/* Gallery */}
              {(data.image1 || data.image2 || data.image3) && (
                <Stack spacing={6}>
                  <Heading size="md" mb="4px">
                    Galeri
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {data.image1 && (
                      <Image
                        src={data.image1}
                        alt="detail img"
                        borderRadius="lg"
                        objectFit="cover"
                      />
                    )}
                    {data.image2 && (
                      <Image
                        src={data.image2}
                        alt="detail img"
                        borderRadius="lg"
                        objectFit="cover"
                      />
                    )}
                    {data.image3 && (
                      <Image
                        src={data.image3}
                        alt="detail img"
                        borderRadius="lg"
                        objectFit="cover"
                      />
                    )}
                  </SimpleGrid>
                </Stack>
              )}

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* Video */}
                {data.video && (
                  <Stack>
                    <Heading size="md" mb="4px">
                      Video
                    </Heading>
                    <AspectRatio ratio={16 / 9}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${
                          data.video.split("v=")[1]
                        }`}
                        title="YouTube video player"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </AspectRatio>
                  </Stack>
                )}

                {/* Kordinat */}
                {data.coordinate && (
                  <Stack>
                    <Heading size="md" mb="4px">
                      Lokasi
                    </Heading>
                    <MapContainer
                      center={[
                        data.coordinate.split(",")[0],
                        data.coordinate.split(",")[1],
                      ]}
                      style={{ height: "40vh" }}
                      zoom={8}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[
                          data.coordinate.split(",")[0],
                          data.coordinate.split(",")[1],
                        ]}
                      >
                        <Popup>
                          <strong>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${data.coordinate}`}
                              target="_blank"
                              className="text-xl"
                            >
                              Klik di sini untuk membuka peta
                              <MdOutlineOpenInNew className="mr-2" />
                            </a>
                          </strong>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </Stack>
                )}
              </SimpleGrid>

              {/* Address */}
              <Text fontSize="sm" color={textColorPrimary} mb="4px">
                <strong>Alamat Lokasi:</strong> {data.address}
              </Text>

              {data.content && (
                <Box dangerouslySetInnerHTML={{ __html: data.content }} />
              )}
            </Stack>
          </Card>
        )}
      </Box>
    </>
  );
}
