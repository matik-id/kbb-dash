/**
 * Combobox Component
 * 
 * Created by Melanu Dev Team
 *
 * This component is a custom dropdown list built with Chakra UI components. It allows you to
 * display a list of options in a dropdown where a user can select one of the options.
 *
 * Props:
 * - `label` (optional): The label for the combobox.
 * - `name` (optional): The name attribute for the combobox.
 * - `placeholder` (optional): The placeholder text to display when no option is selected.
 * - `helperText` (optional): Additional text to help the user with the combobox.
 * - `items`: The array of items to display as options in the combobox. Each item should have a `value` and a `label`.
 *
 * Example Usage:
 *
 * ```tsx
 * import Combobox from './Combobox';
 *
 * const options = [
 *   { value: 'option1', label: 'Option 1' },
 *   { value: 'option2', label: 'Option 2' },
 *   { value: 'option3', label: 'Option 3' },
 * ];
 *
 * const MyComponent = () => {
 *   return (
 *     <Combobox
 *       label="Select an Option"
 *       name="myCombobox"
 *       placeholder="Choose..."
 *       helperText="Select one of the available options."
 *       items={options}
 *     />
 *   );
 * };
 *
 * 
 */


import { FormControl, FormHelperText, FormLabel, Icon, Select } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

interface ComboboxProps {
  label?: string;
  name?: string;
  placeholder?: string;
  helperText?: string;
  items: { value: any, label: string }[];
  value: any;
  onChange: (value: any) => void;
  errorMessage?: string;
  [x: string]: any;
}

const Combobox = ({
  label,
  name,
  placeholder,
  helperText,
  items,
  value,
  onChange,
  errorMessage,
  ...rest
}: ComboboxProps) => {
  const handleChange = (e: any) => {
    if (typeof items[0].value === 'number') {
      onChange(parseInt(e.target.value));
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <FormControl>
      <FormLabel>
        {label}
      </FormLabel>
      <Select
        name={name}
        borderColor={errorMessage ? 'red.500' : 'gray.400'}
        fontSize="sm"
        fontWeight="medium"
        h={9}
        icon={<Icon as={FiChevronDown} w={4} h={4} mr={-1} />}
        _focus={{
          borderColor: errorMessage ? 'red.500' : 'gray.800',
          shadow: 'none',
        }}
        _hover={{
          borderColor: errorMessage ? 'red.500' : 'gray.800',
        }}
        value={value}
        onChange={handleChange}
        {...rest}
      >
        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}
        {items.map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <FormHelperText color={errorMessage ? 'red.500' : 'inherit'}>
        {errorMessage || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default Combobox;
