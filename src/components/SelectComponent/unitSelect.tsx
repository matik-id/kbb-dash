import { FormLabel, Select } from "@chakra-ui/react";

interface unitSelectProps {
  value?: any;
  onChange: (value: any) => void;
  isDisabled?: boolean;
  label?: string;
}

const UnitSelect = ({
  label,
  value,
  onChange,
}: unitSelectProps) => {
  const handleChange = (e: any) => {
    onChange(e);
  };

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Select
        placeholder={"Pilih "+label}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="Bulan">Bulan</option>
        <option value="Paket">Paket</option>
        <option value="Orang">Orang</option>
        <option value="Unit">Unit</option>
        <option value="Kali">Kali</option>
        <option value="Poktan">Poktan</option>
        <option value="Petani">Petani</option>
        <option value="Tahun">Tahun</option>
      </Select>
    </>
  );
};

export default UnitSelect;
