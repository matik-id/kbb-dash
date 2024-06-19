import Combobox from "components/Combobox";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { instance } from "services/instances";
import queryString from "query-string";
import { FormLabel, Icon, Select } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

interface userSelectProps {
  placeholder?: string;
  role?: string;
  eselon1Id?: number;
  value?: any;
  onChange: (value: any) => void;
  errorMessage?: string;
  isDisabled?: boolean;
  label?: string;
}

const UserSelect = ({
  placeholder = "Choose...",
  role,
  eselon1Id,
  label,
  value,
  onChange,
  errorMessage,
}: userSelectProps) => {
  const handleChange = (e: any) => {
    onChange(e);
  };
  const [isSuccess, setIsSuccess] = useState(false);
  const [dataSelect, setDataSelect] = useState([{ value: "", label: "" }]);

  const getUser = async () => {
    try {
      const params = queryString.stringify({
        eselon1: eselon1Id,
        role: role,
      });
      const response = await instance.get(`/users?${params}`);
      const values = response.data.data.map((cat: any) => ({
        value: cat.ID,
        label: cat.name,
      }));
      unstable_batchedUpdates(() => {
        setDataSelect(values);
        setIsSuccess(true);
      });
    } catch (error) {
      setIsSuccess(false);
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    if (!isSuccess) getUser();
  });

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Select
        borderColor={errorMessage ? "red.500" : "gray.400"}
        fontSize="sm"
        fontWeight="medium"
        h={9}
        icon={<Icon as={FiChevronDown} w={4} h={4} mr={-1} />}
        _focus={{
          borderColor: errorMessage ? "red.500" : "gray.800",
          shadow: "none",
        }}
        _hover={{
          borderColor: errorMessage ? "red.500" : "gray.800",
        }}
        value={value}
        onChange={handleChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {dataSelect.map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </>
  );
};

export default UserSelect;
