"use client";

import React from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom components
import DefaultAuthLayout from "layouts/auth/Default";
// Assets
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import * as Yup from "yup";
import { authService } from "services";
import Cookies from "js-cookie";
import { useAuthStore } from "store";
import { syncToken } from "services/instances";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

export default function SignIn() {
  const toast = useToast();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const router = useRouter();
  const auth = useAuthStore();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().max(255).required("Kolom ini wajib diisi"),
      password: Yup.string().max(255).min(6).required("Kolom ini wajib diisi"),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const response = await authService.login(values);
        Cookies.set("Authorization", response.data.access_token);
        auth.setToken(response.data.access_token);
        auth.setUser({
          user_id: response.data.user_id,
          name: response.data.fullname,
          phone: response.data.phone,
        });

        setStatus({ success: true });
        setSubmitting(false);
        syncToken();
        router.push("/admin/dashboard");
      } catch (error: any) {
        toast({
          status: "error",
          title: "Data gagal diupdate",
          description: error.message,
          duration: 5000,
        });
        setSubmitting(false);
      }
    },
  });
  return (
    <DefaultAuthLayout illustrationBackground={process.env.NEXT_PUBLIC_BASE_PATH+"/img/auth/auth-illustration.png"}>
      <form onSubmit={formik.handleSubmit}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          pt="40px"
          alignItems="start"
          justifyContent="center"
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection="column"
        >
          <Box me="auto">
            <Heading color={textColor} fontSize="36px" mb="10px">
              Sign In
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              Enter your email and password to sign in!
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
          >
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                autoFocus
                name="username"
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="mail@example.com"
                mb="24px"
                onChange={formik.handleChange}
                value={formik.values.username}
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type={show ? "text" : "password"}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Button
                bgColor="green.700"
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                type="submit"
                isDisabled={formik.isSubmitting}
                w="100%"
                h="50"
                mb="24px"
              >
                Sign In
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </form>
    </DefaultAuthLayout>
  );
}
