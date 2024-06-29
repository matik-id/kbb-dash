import { ChakraProvider, Box, Heading, Text, Container, VStack, List, ListItem, ListIcon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

function App() {
  return (
    <ChakraProvider>
      <Box bg="green" color="white" py={6} textAlign="center">
        <Heading>KBB Dashboard</Heading>
      </Box>
      <Container maxW="container.lg" py={10}>
        <VStack spacing={8}>
          <Box bg="white" p={6} rounded="md" shadow="md" w="full">
            <Heading size="lg" mb={4}>Tentang KBB Super App</Heading>
            <Text>KBB (Kerukunan Bubuhan Banjar) adalah perkumpulan atau organisasi paguyuban dari berbagai daerah di Indonesia. Aplikasi ini dibuat untuk memudahkan anggota KBB dalam berinteraksi, berbagi informasi, dan menjaga kekayaan budaya Indonesia.</Text>
          </Box>
          <Box bg="white" p={6} rounded="md" shadow="md" w="full">
            <Heading size="lg" mb={4}>Fitur-fitur Aplikasi KBB</Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Biodata Anggota:</strong> Menyimpan dan menampilkan biodata lengkap anggota KBB.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Statistik Anggota:</strong> Menampilkan statistik dan data anggota KBB.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Destinasi Wisata:</strong> Informasi mengenai destinasi wisata di berbagai daerah di Indonesia.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Forum Diskusi:</strong> Fasilitas untuk berdiskusi dan berbagi informasi antar anggota.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Berita:</strong> Berita terbaru mengenai kegiatan dan acara yang diselenggarakan oleh KBB.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Produk Lokal:</strong> Informasi mengenai produk lokal yang dihasilkan oleh anggota KBB.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="teal.500" />
                <strong>Galang Dana:</strong> Fasilitas untuk melakukan penggalangan dana bagi kegiatan sosial dan budaya.
              </ListItem>
            </List>
          </Box>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;