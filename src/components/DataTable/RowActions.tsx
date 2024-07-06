import { Button, IconButton } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Box, Stack } from "@chakra-ui/layout";
import { Fragment } from "react";

interface RowActionsProps {
  items: any[];
  value: any;
  position?: "absolute" | "relative";
  [x: string]: any;
}

const RowActions = ({
  items,
  value,
  position = "absolute",
  ...rest
}: RowActionsProps) => {
  return (
    <Box
      position={position}
      right={0}
      mt="-1.7rem"
      pr={2.5}
      py={2}
    >
      <Stack direction="row" spacing={2.5} {...rest}>
        <Box w={0} />
        {items.map(
          (
            {
              icon,
              onClick,
              label,
              size = "sm",
              variant = "solid",
              colorScheme = "gray",
              hideOnNotUser,
              // @ts-ignore
              isHidden = (value: any) => false,
            },
            i
          ) => (
            <Fragment key={i}>
                  {!isHidden(value) && (
                    <>
                      <Button
                        leftIcon={<Icon as={icon} w={4} h={4} ml={-0.5} />}
                        size={size}
                        variant={variant}
                        colorScheme={colorScheme}
                        display={{ base: "none", md: "flex" }}
                        onClick={() => onClick(value)}
                        boxShadow='base'
                      >
                        {label}
                      </Button>
                      <IconButton
                        aria-label={label}
                        icon={<Icon as={icon} w={4} h={4} />}
                        rounded="full"
                        variant={variant}
                        display={{ base: "flex", md: "none" }}
                        onClick={() => onClick(value)}
                        boxShadow='base'
                      />
                    </>
                  )}
            </Fragment>
          )
        )}
      </Stack>
    </Box>
  );
};

export default RowActions;
