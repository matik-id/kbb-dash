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
import { productService } from "services";
import UploadImage from "components/UploadImage";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const toast = useToast({
    position: "top",
    variant: "subtle",
    duration: 3000,
  });
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!loading) return;
    productService.getProduct(params.id)
      .then((res: any) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  }, [loading, params.id]);

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
            Edit Produk
          </Text>
          <hr />
          <Formik
            enableReinitialize
            initialValues={{
              id: Number(params.id) || 0,
              title: data?.title || "",
              owner: data?.owner || "",
              phone: data?.phone || "",
              thumbnail: data?.thumbnail || "",
              image1: data?.image1 || "",
              image2: data?.image2 || "",
              image3: data?.image3 || "",
              price: data?.price || "",
              content: data?.content || "",
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Kolom ini wajib diisi"),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              try {
                setStatus({ success: true });
                setSubmitting(false);
                await productService.updateProduct(values);
                toast({
                  status: "success",
                  title: "Edit data berhasil",
                  duration: 2000,
                });
                router.push("/admin/product");
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
                      label="Nama Barang"
                      name="title"
                      placeholder="Masukkan Nama Barang"
                      type="text"
                      error={touched.title ? errors.title : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Pemilik"
                      name="owner"
                      placeholder="Pemilik"
                      type="text"
                      error={touched.owner ? errors.owner : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.owner}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Nomor Telepon"
                      name="phone"
                      placeholder="Masukan Nomor Telepon"
                      type="text"
                      error={touched.phone ? errors.phone : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Harga"
                      name="price"
                      placeholder="Masukan Harga barang"
                      type="number"
                      error={touched.price ? errors.price : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Konten</FormLabel>
                    <DefaultEditor
                      style={{ height: "250px" }}
                      name="content"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.content}
                    />
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
