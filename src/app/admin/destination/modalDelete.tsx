import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { instance } from "services/instances";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: any;
}

const ModalDelete = ({ isOpen, onClose, activeItem }: ModalDeleteProps) => {
  const initialRef = React.useRef(null);

  const toast = useToast({
    position: "top",
    variant: "subtle",
    duration: 3000,
  });

  const handleDelete = async () => {
    if (!activeItem?.id) {
      toast({
        title: 'Error',
        description: 'No active item selected.',
        status: 'error',
      });
      return;
    }

    try { 
      const response = await instance.delete(`/destination/${activeItem.id}`);

      if (response.status === 200) {
        onClose(); // Close the modal on successful deletion
        toast({
          title: 'Deleted',
          description: 'Item telah berhasil dihapus.',
          status: 'success',
        });
      } else {
        throw new Error(`Failed to delete: ${response.status}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus item.',
        status: 'error',
      });
    }
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      size="xl"
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
              <ModalHeader>Hapus Data</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <h4>Apakah anda yakin akan menghapus data ini?</h4>
              </ModalBody>

              <ModalFooter>
                <Box w="100%">
                  <Button
                    w="100%"
                    colorScheme="red"
                    type="button"
                    onClick={handleDelete}
                  >
                    Hapus
                  </Button>
                </Box>
                <br />
                <Box w="100%">
                  <Button w="100%" onClick={onClose}>
                    Batal
                  </Button>
                </Box>
              </ModalFooter>
            </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
