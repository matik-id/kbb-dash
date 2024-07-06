import { ChakraProvider, Box, Heading, Text, Container, VStack, List, ListItem, ListIcon, IconButton, Flex, Spacer, HStack, Image, Divider, Badge, Button, Link, SimpleGrid } from "@chakra-ui/react";
import { CheckCircleIcon, InfoOutlineIcon, AtSignIcon, PhoneIcon, ExternalLinkIcon, StarIcon, ChatIcon, CalendarIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function App() {
  return (
    <ChakraProvider>
      {/* Header Section */}
      <Box bgGradient="linear(to-r, green.500, green.600)" color="white" py={6}>
        <Container maxW="container.xl">
          <Flex alignItems="center">
            <HStack spacing={4}>
              <Heading>KBB Dashboard</Heading>
            </HStack>
            <Spacer />
            <HStack spacing={4}>
              <Button as={Link} href="#about" variant="outline" color="white">Tentang</Button>
              <Button as={Link} href="#features" variant="outline" color="white">Fitur</Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content Section */}
      <Container maxW="container.lg" py={10}>
        <VStack spacing={8}>
          {/* About Section */}
          <Box id="about" bg="white" p={8} rounded="lg" shadow="lg" w="full">
            <Heading size="lg" mb={4}>Tentang Aplikasi Super App KBB</Heading>
            <Text fontSize="lg">
              KBB Super App adalah aplikasi untuk perkumpulan organisasi paguyuban dari berbagai daerah di Indonesia. 
              Aplikasi ini dibuat untuk memudahkan anggota KBB dalam berinteraksi, berbagi informasi, dan menjaga kekayaan budaya Indonesia.
            </Text>
            <Divider my={4} />
            <Badge colorScheme="green" fontSize="1em" p={2}>
              KBB - Kerukunan Bubuhan Banjar
            </Badge>
          </Box>

          {/* Features Section */}
          <Box id="features" bg="white" p={8} rounded="lg" shadow="lg" w="full">
            <Heading size="lg" mb={4}>Fitur-fitur Aplikasi KBB</Heading>
            <SimpleGrid columns={[1, null, 2]} spacing={5}>
              <List spacing={4}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  <strong>Biodata Anggota:</strong> Menyimpan dan menampilkan biodata lengkap anggota KBB.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  <strong>Statistik Anggota:</strong> Menampilkan statistik dan data anggota KBB.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  <strong>Destinasi Wisata:</strong> Informasi mengenai destinasi wisata di berbagai daerah di Indonesia.
                </ListItem>
                <ListItem>
                  <ListIcon as={ChatIcon} color="green.500" />
                  <strong>Forum Diskusi:</strong> Fasilitas untuk berdiskusi dan berbagi informasi antar anggota.
                </ListItem>
              </List>
              <List spacing={4}>
                <ListItem>
                  <ListIcon as={CalendarIcon} color="green.500" />
                  <strong>Berita:</strong> Berita terbaru mengenai kegiatan dan acara yang diselenggarakan oleh KBB.
                </ListItem>
                <ListItem>
                  <ListIcon as={StarIcon} color="green.500" />
                  <strong>Produk Lokal:</strong> Informasi mengenai produk lokal yang dihasilkan oleh anggota KBB.
                </ListItem>
                <ListItem>
                  <ListIcon as={SunIcon} color="green.500" />
                  <strong>Galang Dana:</strong> Fasilitas untuk melakukan penggalangan dana bagi kegiatan sosial dan budaya.
                </ListItem>
              </List>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>

      {/* Footer Section */}
      <Box bg="gray.800" color="white" py={6}>
        <Container maxW="container.xl">
          <Flex justifyContent="space-between" alignItems="center">
            <Text>&copy; 2024 KBB Super App. All rights reserved.</Text>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
