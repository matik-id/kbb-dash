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
} from "@chakra-ui/react";
import Eselon1Select from "app/admin/eselon1/eselon1Select";

// Assets
import InputText from "components/Form/InputText";
import { Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { userService } from "services";
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

  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
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
            Tambah Pengguna ({roleParam})
          </Text>
          <hr />
          <Formik
            enableReinitialize
            initialValues={{
              name: "",
              email: "",
              password: "",
              repass: "",
              eselon1ID: "",
              role: roleParam ? roleParam : "",
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Kolom ini wajib diisi"),
              email: Yup.string().required("Kolom ini wajib diisi"),
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
              repass: Yup.string()
                .oneOf([Yup.ref("password"), ""], "Password tidak cocok")
                .required("Konfirmasi password wajib diisi"),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              let mode = "Tambah";
              try {
                setStatus({ success: true });
                setSubmitting(false);
                await userService.createUser(values);
                toast({
                  status: "success",
                  title: mode + " data berhasil",
                  duration: 2000,
                });
                router.push("/admin/user?role=" + roleParam);
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
              setFieldValue,
              handleSubmit,
              values,
              isSubmitting,
              touched,
              errors,
              handleBlur,
              handleChange,
            }) => (
              <form onSubmit={handleSubmit}>
                <SimpleGrid columns={2} gap="20px" mt={"20px"}>
                  <FormControl>
                    <InputText
                      label="Nama Lengkap"
                      name="name"
                      placeholder="Nama"
                      type="text"
                      error={touched.name ? errors.name : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      error={touched.email ? errors.email : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
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
                  <FormControl>
                    <InputText
                      label="Konfirmasi Password"
                      name="repass"
                      placeholder="Konfirmasi Password"
                      type="password"
                      error={touched.repass ? errors.repass : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.repass}
                    />
                  </FormControl>
                  {roleParam === "satker" && (
                    <FormControl>
                      <Eselon1Select
                        label="Eselon 1"
                        value={values.eselon1ID}
                        onChange={(e) => setFieldValue("eselon1ID", e)}
                      />
                    </FormControl>
                  )}
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
