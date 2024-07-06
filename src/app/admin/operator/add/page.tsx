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
} from "@chakra-ui/react";

// Assets
import InputText from "components/Form/InputText";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminService } from "services";
import * as Yup from "yup";
import YupPassword from "yup-password";
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
            Tambah Admin
          </Text>
          <hr />
          <Formik
            enableReinitialize
            initialValues={{
              username: "",
              fullname: "",
              password: "",
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              fullname: Yup.string().required("Kolom ini wajib diisi"),
              password: Yup.string()
                .max(255)
                .min(8)
                .minLowercase(
                  1,
                  "password must contain at least 1 lower case letter"
                )
                .minUppercase(
                  1,
                  "password must contain at least 1 upper case letter"
                )
                .minNumbers(1, "password must contain at least 1 number")
                .required("Kolom ini wajib diisi"),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              try {
                setStatus({ success: true });
                setSubmitting(false);
                await adminService.createAdmin(values);
                toast({
                  status: "success",
                  title: "Tambah data berhasil",
                  duration: 2000,
                });
                router.push("/admin/operator");
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
            }) => (
              <form onSubmit={handleSubmit}>
                <SimpleGrid columns={3} gap="20px" mt={"20px"}>
                  <FormControl>
                    <InputText
                      label="username"
                      name="username"
                      placeholder="Isi username"
                      type="text"
                      error={touched.username ? errors.username : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="fullname"
                      name="fullname"
                      placeholder="nama lengkap"
                      type="text"
                      error={touched.fullname ? errors.fullname : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullname}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      error={touched.password ? errors.password : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
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
