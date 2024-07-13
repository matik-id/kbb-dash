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
import { postService } from "services";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MdLocationPin, MdOutlineOpenInNew } from "react-icons/md";

const fetchDetail = async (id: string | string[] | undefined) => {
    try {
        const response = await postService.getPost(id);
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
                        <Box position="relative" height="90vh" borderRadius={"md"} overflow="hidden">
                            <AspectRatio ratio={16 / 9}>
                                <Image
                                    src={data.image || "/default-image.jpg"}
                                    alt="image"
                                    objectFit="cover"
                                    width="100%"
                                    height="100%"
                                />
                            </AspectRatio>
                        </Box>

                        {data.title && (
                            <Text fontSize="2xl" fontWeight="bold" mt={-12}>
                                <Box dangerouslySetInnerHTML={{ __html: data.title }} />
                            </Text>
                        )}

                        {data.content && (
                            <Box dangerouslySetInnerHTML={{ __html: data.content }} />
                        )}

                        {data.date_start && (
                            <Text fontSize="l" fontWeight="bold">
                                <Box dangerouslySetInnerHTML={{ __html: `<strong>Tanggal Mulai: ${data.date_start}</strong>` }} />
                            </Text>
                        )}

                        {data.date_end && (
                            <Text fontSize="l" fontWeight="bold">
                                <Box dangerouslySetInnerHTML={{ __html: `<strong>Tanggal Selesai: ${data.date_end}</strong>` }} />
                            </Text>
                        )}

                    </Stack>
                </Card>
            )}
        </Box>
    );
}
