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
  import { adminService } from "services";
  
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
      if (!activeItem?.ID) {
        toast({
          title: "Error",
          description: "No active item selected.",
          status: "error",
        });
        return;
      }
  
      try {
        await adminService.deleteAdmin(activeItem.ID);
        onClose(); // Close the modal on successful deletion
        toast({
          title: "Berhasil Hapus",
          description: "Item telah berhasil dihapus.",
          status: "success",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal menghapus item.",
          status: "error",
        });
      }
    };
  
    return (
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        size="2xl"
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
  