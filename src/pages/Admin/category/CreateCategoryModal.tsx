import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
  } from "@chakra-ui/react";
  import CreateCategoryForm from "./CreateCategoryForm";
  
  interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }
  
  const CreateCategoryModal = ({ isOpen, onClose }: Props) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={"fit-content"}>
          <ModalHeader color={"#448F85"}>Create Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody w={"fit-content"} minW={"40vw"}>
            <CreateCategoryForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default CreateCategoryModal;