import { Icon, IconButton } from '@chakra-ui/react';

interface MyIconButtonProps {
  label: string;
  icon: any;
  [x: string]: any;
}

const MyIconButton = ({ label, icon, ...rest }: MyIconButtonProps) => {
  return (
    <IconButton
      aria-label={label}
      icon={<Icon as={icon} w={5} h={5} />}
      minW={7}
      h={8}
      rounded="none"
      _active={{
        bg: 'white',
      }}
      _focus={{
        shadow: 'none',
      }}
      _hover={{
        bg: 'white',
      }}
      {...rest}
    />
  );
};

export default MyIconButton;
