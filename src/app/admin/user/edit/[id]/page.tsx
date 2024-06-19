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

// Assets
import InputText from "components/Form/InputText";
import { Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { userService } from "services";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export default function Page({ params }: { params: { id: string } }) {
  const toast = useToast({
    position: "top",
    variant: "subtle",
    duration: 3000,
  });
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!loading) return;
    userService
      .getUser(params.id)
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
            Edit Pengguna ({roleParam})
          </Text>
          <hr />
          <Formik
            enableReinitialize
            initialValues={{
              id: params.id || "",
              name: data?.name || "",
              email: data?.email || "",
              role: roleParam ? roleParam : "",
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Kolom ini wajib diisi"),
              email: Yup.string().required("Kolom ini wajib diisi"),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              try {
                setStatus({ success: true });
                setSubmitting(false);
                await userService.updateUser(values);
                toast({
                  status: "success",
                  title: "Edit data berhasil",
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
