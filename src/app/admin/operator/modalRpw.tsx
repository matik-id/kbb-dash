import {
  Box,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik } from "formik";
import React from "react";
import { adminService, userService } from "services";
import InputText from "components/Form/InputText";
YupPassword(Yup);

interface ModalResetProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: any;
}

const ModalReset = ({ isOpen, onClose, activeItem }: ModalResetProps) => {
  const initialRef = React.useRef(null);

  const toast = useToast({
    position: "top",
    variant: "subtle",
    duration: 3000,
  });

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
    >
      <ModalOverlay />
      <Formik
        enableReinitialize
        initialValues={{
          admin: activeItem ? activeItem.id.toString() : "",
          password: "",
          repass: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
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
          if (activeItem) {
            mode = "Update";
          }
          try {
            setStatus({ success: true });
            setSubmitting(false);
            await adminService.resetPassAdmin(values);
            toast({
              status: "success",
              title: mode + " data berhasil",
              duration: 2000,
            });
            onClose();
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
            onClose();
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
            <ModalContent>
              <ModalHeader> Reset Password</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mb={3}>
                  <InputText
                    label="Password Baru"
                    name="password"
                    placeholder="Password"
                    type="password"
                    error={touched.password ? errors.password : ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <InputText
                    label="Ulangi password"
                    name="repass"
                    placeholder="Ulangi password"
                    type="password"
                    error={touched.repass ? errors.repass : ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.repass}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Box w="100%">
                  <Button
                    w="100%"
                    colorScheme="green"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Simpan
                  </Button>
                </Box>
                <br />
                <Box w="100%">
                  <Button w="100%" onClick={onClose} isDisabled={isSubmitting}>
                    Batal
                  </Button>
                </Box>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalReset;
