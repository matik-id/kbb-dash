import { Button } from '@chakra-ui/react';

interface NumberButtonProps {
  children: any;
  isActive?: boolean;
  onClick: () => void;
}

const NumberButton = ({ children, isActive, onClick }: NumberButtonProps) => {
  return (
    <Button
      minW={8}
      px={1.5}
      h={8}
      bg={isActive ? 'gray.400' : 'white'}
      color={isActive ? 'white' : 'gray.800'}
      fontSize="sm"
      fontWeight="medium"
      rounded="lg"
      _active={{
        bg: isActive ? '#3949AB' : 'white',
      }}
      _focus={{
        shadow: 'none',
      }}
      _hover={{
        bg: isActive ? '#3949AB' : 'white',
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default NumberButton;
