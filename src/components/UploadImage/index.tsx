import {
  FormControl,
  FormLabel,
  Spinner,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { instance } from "services/instances";

interface UploadImageProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}
export default function UploadImage({
  name,
  label,
  value,
  onChange,
}: UploadImageProps) {
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    try {
      setIsLoadingImage(true);
      const base64 = await toBase64(e.target.files[0] as File);
      let body = JSON.stringify({ path: "kbb", base64 });
      const result = await instance.post(
        "https://api.matik.id/upload/image",
        body
      );
      onChange(result.data.data.url);
      setIsLoadingImage(false);
    } catch (error) {}
  };

  return (
    <FormControl mb={5}>
      <FormLabel>{label}</FormLabel>
      <Input
        accept="application/pdf image/*"
        type="file"
        onChange={onFileChange}
      />
      {isLoadingImage === true && (
        <>
          <Spinner />
          <Text>Loading Upload {label}...</Text>
        </>
      )}
      {isLoadingImage === false && value && (
        <Image src={value} maxH="200px" alt="detail img" />
      )}
    </FormControl>
  );
}
