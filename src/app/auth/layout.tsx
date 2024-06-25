'use client';
import { PropsWithChildren, useState } from 'react';

// Chakra imports
import { Box, useColorModeValue } from '@chakra-ui/react';

// Layout components
import { SidebarContext } from 'contexts/SidebarContext';
import { isWindowAvailable } from 'utils/navigation';

// Custom Chakra theme

interface AuthProps extends PropsWithChildren {}

export default function AuthLayout({ children }: AuthProps) {
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const authBg = useColorModeValue('white', 'navy.900');
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';
  return (
    <Box>
        <Box
          bg={authBg}
          minHeight="100vh"
          height="100%"
          width="100%"
        >
          <Box minH="100vh">
            {children}
          </Box>
        </Box>
    </Box>
  );
}
