import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
  import { Product } from "../../../api/types";
  import EditProductForm from "./EditProductForm";
  
  export interface Props {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
  }
  
  const EditProductModal = ({ isOpen, onClose, product }: Props) => {
    return (
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent
          minW={{ md: "fit-content", lg: "65rem", xl: "80rem" }}
          bgColor={"white"}
        >
          <ModalHeader>Editar producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditProductForm onClose={onClose} initialValues={product} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditProductModal;