// Chakra imports
import { Flex, useColorModeValue, Text, Image } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex flexDirection='column'>
			<Image src={process.env.NEXT_PUBLIC_BASE_PATH + '/img/logo-kbb.png'} ml='20px' w='200px'/>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
