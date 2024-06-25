// Chakra imports
import { Flex, useColorModeValue, Text } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';
import { useAuthStore } from 'store';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	const auth = useAuthStore();
	
	return (
		<Flex alignItems='center' flexDirection='column'>
			<Text fontSize='3xl' fontWeight='bold'mb={'20px'} color={logoColor}></Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
