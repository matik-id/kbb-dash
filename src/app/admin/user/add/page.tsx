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
} from "@chakra-ui/react";

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
              number: "",
              fullname: "",
              email: "",
              password: "",
              repass: "",
              phone: "",
              position: "",
              pob: "",
              dob: "",
              address: "",
              education: "",
              profession: "",
              company: "",
              gender: "",
              nik: "",
              photo: "",
              file_ktp: "",
              likes: 0,
              status: "",
              role: roleParam ? roleParam : "",
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              fullname: Yup.string().required("Kolom ini wajib diisi"),
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
                      name="fullname"
                      placeholder="Nama"
                      type="text"
                      error={touched.fullname ? errors.fullname : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullname}
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
                  <FormControl>
                    <InputText
                      label="Nomor Telepon"
                      name="phone"
                      placeholder="Nomor Telepon"
                      type="phone"
                      error={touched.phone ? errors.phone : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel> Pilih Jenis Kelamin</FormLabel>
                    <Select
                      placeholder="Pilih Jenis Kelamin"
                      value={values.gender}
                      onChange={(e) => setFieldValue("gender", e.target.value)}
                    >
                      <option value="male">Laki-Laki</option>
                      <option value="female">Perempuan</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Posisi"
                      name="position"
                      placeholder="Posisi"
                      type="text"
                      error={touched.position ? errors.position : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.position}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Tempat Kelahiran"
                      name="pob"
                      placeholder="Tempat Kelahiran"
                      type="text"
                      error={touched.pob ? errors.pob : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.pob}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Tanggal Kelahiran"
                      name="dob"
                      placeholder="Tanggal Kelahiran"
                      type="date"
                      error={touched.dob ? errors.dob : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.dob}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Tempat Tinggal"
                      name="address"
                      placeholder="Tempat Tinggal"
                      type="text"
                      error={touched.address ? errors.address : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Pendidikan Terakhir"
                      name="education"
                      placeholder="Pendidikan Terakhir"
                      type="text"
                      error={touched.education ? errors.education : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.education}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Profesi"
                      name="profession"
                      placeholder="Profesi"
                      type="text"
                      error={touched.profession ? errors.profession : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.profession}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="Perusahaan"
                      name="company"
                      placeholder="Perusahaan"
                      type="text"
                      error={touched.company ? errors.company : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.company}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="NIK"
                      name="nik"
                      placeholder="Perusahaan"
                      type="text"
                      error={touched.nik ? errors.nik : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.nik}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="foto"
                      name="photo"
                      placeholder="foto"
                      type="text"
                      error={touched.photo ? errors.photo : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.photo}
                    />
                  </FormControl>
                  <FormControl>
                    <InputText
                      label="file ktp"
                      name="file_ktp"
                      placeholder="foto"
                      type="text"
                      error={touched.file_ktp ? errors.file_ktp : ""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.file_ktp}
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
