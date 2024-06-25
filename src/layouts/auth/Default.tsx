// Chakra imports
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import FixedPlugin from 'components/fixedPlugin/FixedPlugin';
// Assets
import { ReactNode } from 'react';

function AuthIllustration(props: {
  children: ReactNode;
  illustrationBackground: string;
}) {
  const authBg = useColorModeValue('white', 'navy.900');
  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    <Flex minW="100vh" w="100%" bg={authBg} position="relative" h="max-content">
      <Flex
        h={{
          sm: 'initial',
          md: 'unset',
          lg: '100vh',
          xl: '100vh',
        }}
        w={{ base: '100vw', md: '100%' }}
        mx={{ md: 'auto' }}
        pt={{ sm: '50px', md: '0px' }}
        px={{ lg: '30px', xl: '0px' }}
        ps={{ xl: '70px' }}
        justifyContent="start"
        direction="column"
      >
        {children}
        <Box
          display={{ base: 'none', md: 'block' }}
          h="100%"
          w="100%"
          position="absolute"
        >
          <Flex
            style={{ backgroundImage: `url(${illustrationBackground})` }}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="top left"
            position="absolute"
            borderBottomLeftRadius={{ lg: '120px', xl: '200px' }}
          />
        </Box>
      </Flex>
      <FixedPlugin />
    </Flex>
  );
}

export default AuthIllustration;
