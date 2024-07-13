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
import { postService } from "services";
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
    postService.getPost(params.id)
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
            Edit Kegiatan
          </Text>
          <hr />
          <Formik
            enableReinitialize
            initialValues={{
              id: Number(params.id) || 0,
              title: data?.title || "",
              image: data?.image || "",
              content: data?.content || "",
              type: data?.type || "",
              date_start: data?.date_start || "",
              date_end: data?.date_end || "",
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
                values.type = "activity"; 
                await postService.updatePost(values);
                toast({
                  status: "success",
                  title: "Edit data berhasil",
                  duration: 2000,
                });
                router.push("/admin/activity");
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
                <FormControl >
                    <InputText
                      label="Judul"
                      name="title"
                      placeholder="Judul"
                      type="title"
                      error={touched.title ? errors.title : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
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
                    style={{ height: "250px" }}
                    name="content"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.content}
                  />
                </FormControl>                      
                  <FormControl>
                    <InputText
                      label="Tanggal Mulai"
                      name="date_start"
                      placeholder="date"
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
                      placeholder="date"
                      type="date"
                      error={touched.date_end ? errors.date_end : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.date_end}
                    />
                  </FormControl>
                  </SimpleGrid>
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
