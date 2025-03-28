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
  Select,
  FormLabel,
  Input,
  Spinner,
  Image,
} from "@chakra-ui/react";

// Assets
import InputText from "components/Form/InputText";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postService } from "services";
import * as Yup from "yup";
import { instance } from "services/instances";
import YupPassword from "yup-password";
import DefaultEditor from "react-simple-wysiwyg";
import UploadImage from "components/UploadImage";
YupPassword(Yup);

export default function Page() {
  const toast = useToast({
    position: "top",
    variant: "subtle",
    duration: 3000,
  });
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const router = useRouter();
  const [type, setType] = useState("position");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [image, setImage] = useState("");

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let img = e.target.files && e.target.files[0];
    if (!img) {
      return;
    }

    try {
      setIsLoadingImage(true);
      const body = new FormData();
      body.append("file", img);
      const result = await instance.post("/upload/storage", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setImage(result.data.data.filename);
      setIsLoadingImage(false);
    } catch (error) {}
  };

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
            Tambah Aktivitas
          </Text>
          <hr />
          <Formik
            enableReinitialize
            initialValues={{
              title: "",
              image: "",
              content: "",
              type: "",
              date_start: "",
              date_end: "",
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
                await postService.createPost(values);
                toast({
                  status: "success",
                  title: "Tambah data berhasil",
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
                <SimpleGrid columns={1} gap="20px" mt={"20px"}>
                  <FormControl>
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
                      label="date start"
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
                      label="date end"
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
