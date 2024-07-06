"use client";
import {
  Box,
  Card,
  SimpleGrid,
  useColorModeValue,
  Text,
  FormControl,
  useToast,
  Button,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";

// Assets
import InputText from "components/Form/InputText";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import DefaultEditor from "react-simple-wysiwyg";
import { destinationService } from "services";
import UploadImage from "components/UploadImage";

export default function Page() {
  const toast = useToast({
    position: "top",
    variant: "subtle",
    duration: 3000,
  });
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const router = useRouter();

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
            Tambah Artikel
          </Text>
          <hr />
          <Formik
            enableReinitialize
            initialValues={{
              name: "",
              category: "",
              coordinate: "",
              thumbnail: "",
              image1: "",
              image2: "",
              image3: "",
              video: "",
              address: "",
              content: "",
              is_publish: true,
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Kolom ini wajib diisi"),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              try {
                setStatus({ success: true });
                setSubmitting(false);
                await destinationService.createDestination(values);
                toast({
                  status: "success",
                  title: "Tambah data berhasil",
                  duration: 2000,
                });
                router.push("/admin/destination");
              } catch (error: any) {
                toast({
                  status: "error",
                  title: "Data gagal diupdate",
                  description:
                    error.response &&
                    error.response.data &&
                    error.response.data.message,
                  duration: 5000,
                });
                setSubmitting(false);
              }
            }}
          >
            {({
              handleSubmit,
              values,
              isSubmitting,
              touched,
              errors,
              handleBlur,
              handleChange,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <SimpleGrid columns={1} mt={"20px"} gap="20px">
                  <FormControl>
                    <InputText
                      label="Nama Wisata"
                      name="name"
                      placeholder="Masukkan Nama Wisata"
                      type="text"
                      error={touched.name ? errors.name : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Konten</FormLabel>
                    <DefaultEditor
                      style={{ height: "500px" }}
                      name="content"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.content}
                    />
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={2} gap="20px" mt={"20px"}>
                  <FormControl>
                    <InputText
                      label="Video Youtube"
                      name="video"
                      placeholder="Masukkan Link Video Youtube"
                      type="text"
                      error={touched.video ? errors.video : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.video}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Koordinat"
                      name="coordinate"
                      placeholder="Masukkan Koordinat"
                      type="text"
                      error={touched.coordinate ? errors.coordinate : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.coordinate}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      placeholder="Pilih Kategori"
                      name="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.category}
                    >
                      <option value="">- Pilih Kategori -</option>
                      <option value="Kalsel">Kalsel</option>
                      <option value="Kaltim">Kaltim</option>
                      <option value="Kalteng">Kalteng</option>
                      <option value="Kalbar">Kalbar</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormControl>
                      <FormLabel>Alamat</FormLabel>
                      <Textarea
                        placeholder="Masukkan Alamat"
                        name="address"
                        onChange={handleChange}
                        value={values.address}
                      />
                    </FormControl>
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={4} gap="20px" mt={"20px"}>
                  <UploadImage
                    name="thumbnail"
                    label="Thumbnail"
                    value={values.thumbnail}
                    onChange={(e) => setFieldValue("thumbnail", e)}
                  />
                  <UploadImage
                    name="image1"
                    label="Image1"
                    value={values.image1}
                    onChange={(e) => setFieldValue("image1", e)}
                  />
                  <UploadImage
                    name="image2"
                    label="Image2"
                    value={values.image2}
                    onChange={(e) => setFieldValue("image2", e)}
                  />
                  <UploadImage
                    name="image3"
                    label="Image3"
                    value={values.image3}
                    onChange={(e) => setFieldValue("image3", e)}
                  />
                </SimpleGrid>
                <SimpleGrid columns={3} gap="20px" mt={"20px"}></SimpleGrid>
                <Box mt={"30px"}>
                  <Button
                    colorScheme="green"
                    type="submit"
                    isLoading={isSubmitting}
                    mr={2}
                  >
                    Simpan
                  </Button>
                  <Button
                    colorScheme="blackAlpha"
                    onClick={() => router.back()}
                    isLoading={isSubmitting}
                  >
                    Batal
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Card>
      </Box>
    </>
  );
}
