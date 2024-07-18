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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminService } from "services";
import * as Yup from "yup";

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
    adminService
      .getAdmin(params.id)
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
            Edit Administrator
          </Text>
          <hr />
          <Formik
            enableReinitialize
            initialValues={{
              id: Number(params.id) || 0,
              fullname: data?.fullname || "",
              username: data?.username || "",
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Kolom ini wajib diisi"),
              fullname: Yup.string().required("Kolom ini wajib diisi"),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              try {
                setStatus({ success: true });
                setSubmitting(false);
                await adminService.updateAdmin(values);
                toast({
                  status: "success",
                  title: "Edit data berhasil",
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
                <SimpleGrid columns={2} gap="20px" mt={"20px"}>
                  <FormControl>
                    <InputText
                      label="Username (Digunakan untuk Login)"
                      name="username"
                      placeholder="Masukkan Username"
                      type="text"
                      error={touched.username ? errors.username : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Nama Lengkap"
                      name="fullname"
                      placeholder="Masukkan Nama Lengkap"
                      type="text"
                      error={touched.fullname ? errors.fullname : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullname}
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
