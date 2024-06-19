import { FormControl, FormHelperText, FormLabel, Icon, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

interface InputTextProps {
  icon?: any;
  label?: string;
  type?: string;
  error?: string | any;
  helperText?: string;
  [x: string]: any;
}

const InputText = ({
  icon,
  label,
  type = 'text',
  error,
  helperText,
  ...rest
}: InputTextProps) => {
  const [isShownPassword, setIsShownPassword] = useState(false);

  const handleTogglePassword = () => {
    setIsShownPassword(isShownPassword => !isShownPassword);
  };

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {icon && (
          <InputLeftElement>
            <Icon
              as={icon}
              color="gray.500"
              w={5}
              h={5}
              mt={-1}
            />
          </InputLeftElement>
        )}
        <Input
          type={type === 'password' && isShownPassword ? 'text' : type}
          bg="white"
          borderColor={error ? 'red.500' : 'gray.400'}
          fontSize="sm"
          fontWeight="medium"
          px={3.5}
          {...rest}
          h={9}
          _hover={{
            borderColor: error ? 'red.500' : 'gray.400',
          }}
          _focus={{
            borderColor: 'gray.800',
            shadow: 'none',
          }}
        />
        {type === 'password' && (
          <InputRightElement cursor="pointer" onClick={handleTogglePassword}>
            <Icon
              as={isShownPassword ? IoEyeOutline : IoEyeOffOutline}
              color="gray.500"
              w={5}
              h={5}
              mt={-1}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {error && (
        <FormHelperText color="red.500">
          {error}
        </FormHelperText>
      )}
      {!error && helperText && (
        <FormHelperText>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputText;
