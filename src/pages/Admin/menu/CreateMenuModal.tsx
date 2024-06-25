import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
  } from "@chakra-ui/react";
  import CreateMenuForm from "./CreateMenuForm";
  
  interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }
  
  const CreateMenuModal = ({ isOpen, onClose }: Props) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={"fit-content"}>
          <ModalHeader color={"#448F85"}>Create Menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody w={"fit-content"} minW={"40vw"}>
            <CreateMenuForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default CreateMenuModal;