/* eslint-disable */

// chakra imports
import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import useLogout from "hooks/useLogout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { IRoute } from "routes";

interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes } = props;
  const logout = useLogout();

  //   Chakra color mode
  const pathname = usePathname();

  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
        return pathname.toLowerCase()?.includes(routeName);
    },
    [pathname]
  );

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {

    const { isOpen, onToggle } = useDisclosure();
    return routes.map((route, index: number) => {
      if (route.layout === "/admin") {
        return (
          <Link
            key={index}
            href={!route.parent ? route.layout + route.path : "#"}
          >
            {route.icon ? (
              <Box onClick={route.parent && onToggle}>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="20px"
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="10px"
                    >
                      <Icon
                        as={route.icon}
                        width="20px"
                        height="20px"
                        color="inherit"
                      />
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius="5px"
                  />
                  {route.parent && (
                    <Icon
                      mr={"20px"}
                      as={FiChevronDown}
                      w={4}
                      h={4}
                      strokeWidth={2.3}
                    />
                  )}
                </HStack>
              </Box>
            ) : (
              <Box>
                {isOpen && route.secondary && (
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="50px"
                  >
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : inactiveColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                    <Box
                      h="36px"
                      w="4px"
                      bg={
                        activeRoute(route.path.toLowerCase())
                          ? brandColor
                          : "transparent"
                      }
                      borderRadius="5px"
                    />
                  </HStack>
                )}
              </Box>
            )}
          </Link>
        );
      }
    });
  };
  //  BRAND
  return (
    <>
      {createLinks(routes)}
        <Box onClick={logout} cursor={"pointer"} mt={"auto"}>
          <HStack spacing={"26px"} py="5px" ps="20px">
            <Flex w="100%" alignItems="center" justifyContent="center">
              <Box color={textColor} me="10px">
                <Icon
                  as={IoLogOut}
                  width="20px"
                  height="20px"
                  color="inherit"
                />
              </Box>
              <Text me="auto" color={textColor} fontWeight={"normal"}>
                Log Out
              </Text>
            </Flex>
            <Box h="36px" w="4px" bg={"transparent"} borderRadius="5px" />
          </HStack>
        </Box>
    </>
  );
}

export default SidebarLinks;
