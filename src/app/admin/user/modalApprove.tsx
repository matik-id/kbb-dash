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

interface ModalApproveProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: any;
}

const ModalApprove = ({ isOpen, onClose, activeItem }: ModalApproveProps) => {
  const initialRef = React.useRef(null);
  const toast = useToast({
    position: "top",
    variant: "subtle",
    duration: 3000,
  });

  const handleApprove = async () => {
    if (!activeItem?.id) {
      toast({
        title: 'Error',
        description: 'No active item selected.',
        status: 'error',
      });
      return;
    }

    try { 
      const response = await instance.patch(`/user/${activeItem.id}/approve`);

      if (response.status === 200) {
        onClose(); // Close the modal on successful deletion
        toast({
          title: 'Approved',
          description: 'Item telah berhasil disetujui.',
          status: 'success',
        });
      } else {
        throw new Error(`Failed to approve: ${response.status}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menyetujui item.',
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
              <ModalHeader>Setujui Anggota</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <h4>Apakah anda yakin akan menyetujui anggota ini?</h4>
              </ModalBody>

              <ModalFooter>
                <Box w="100%">
                  <Button
                    w="100%"
                    colorScheme="teal"
                    type="button"
                    onClick={handleApprove}
                  >
                    Submit
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

export default ModalApprove;
