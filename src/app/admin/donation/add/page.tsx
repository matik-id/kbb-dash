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
import { donationService } from "services";
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
            Tambah Donasi
          </Text>
          <hr />
          <Formik
            enableReinitialize
            initialValues={{
              title: "",
              type: "",
              location: "",
              image: "",
              content: "",
              target_balance: 0,
              balance_collected: 0,
              date_start: "",
              date_end: "",
              is_urgent: false,
              is_publish: true,
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Kolom ini wajib diisi"),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              try {
                setStatus({ success: true });
                setSubmitting(false);
                await donationService.createDonation(values);
                toast({
                  status: "success",
                  title: "Tambah data berhasil",
                  duration: 2000,
                });
                router.push("/admin/donation");
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
                      label="Judul Donasi"
                      name="title"
                      placeholder="Masukkan Judul Donasi"
                      type="text"
                      error={touched.title ? errors.title : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel> Jenis Donasi </FormLabel>
                    <Select
                      placeholder="Pilih Jenis Donasi"
                      value={values.type}
                      onChange={(e) => setFieldValue("type", e.target.value)}
                    >
                      <option value="humanity">Kemanusiaan</option>
                      <option value="alms">Sedakah</option>
                      <option value="waqf">Wakaf</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Lokasi"
                      name="location"
                      placeholder="Lokasi"
                      type="text"
                      error={touched.location ? errors.location : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                    />
                  </FormControl>
                  <UploadImage
                    name="image"
                    label="Gambar"
                    value={values.image}
                    onChange={(e) => setFieldValue("image", e)}
                  />              
                  <FormControl>
                    <FormLabel>Konten</FormLabel>
                    <DefaultEditor
                      style={{ height: "200px" }}
                      name="content"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.content}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Target Donasi"
                      name="target_balance"
                      placeholder="Target Donasi"
                      type="number"
                      error={touched.target_balance ? errors.target_balance : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.target_balance}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Donasi Terkumpul"
                      name="balance_collected"
                      placeholder="Donasi yang sudah terkumpul"
                      type="number"
                      error={touched.balance_collected ? errors.balance_collected : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.balance_collected}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Tanggal Mulai"
                      name="date_start"
                      placeholder="Tanggal Mulai"
                      type="date"
                      error={touched.date_start ? errors.date_start : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.date_start}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Tanggal Akhir"
                      name="date_end"
                      placeholder="Tanggal Akhir"
                      type="date"
                      error={touched.date_end ? errors.date_end : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.date_end}
                    />
                  </FormControl>
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
