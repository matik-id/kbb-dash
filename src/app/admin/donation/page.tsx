"use client";
import { Box, Portal, useDisclosure } from "@chakra-ui/react";

// Assets
import Navbar from "components/navbar/NavbarAdmin";
import { getActiveNavbar, getActiveNavbarText } from "utils/navigation";
import {routes} from "routes";
import { Suspense, useState } from "react";
import Content from "./content";

export default function Default() {
  const { onOpen } = useDisclosure();
  const [fixed] = useState(false);
  
  return (
    <>
      <Portal>
        <Box>
          <Navbar
            urlAddButton={"/admin/donation/add"}
            onOpen={onOpen}
            logoText={"Matik Creative Technology"}
            brandText="Galang Dana"
            secondary={getActiveNavbar(routes)}
            message={getActiveNavbarText(routes)}
            fixed={fixed}
          />
        </Box>
      </Portal>

      <Box
        mx="auto"
        p={{ base: "20px", md: "30px" }}
        pe="20px"
        minH="100vh"
        pt="50px"
      >
        <Suspense>
          <Content />
        </Suspense>
      </Box>
    </>
  );
}
