import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Category } from "../../../api/types";
import EditCategoryForm from "./EditCategoryForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
}

const EditCategoryModal = ({ isOpen, onClose, category }: Props) => {
  return (
    <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader>Edit Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <EditCategoryForm onClose={onClose} category={category} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCategoryModal;