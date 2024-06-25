import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Menu } from "../../../api/types";
import EditMenuForm from "./EditMenuForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  menu: Menu;
}

const EditMenuModal = ({ isOpen, onClose, menu }: Props) => {
  return (
    <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"fit-content"}>
        <ModalHeader>Edit Menu</ModalHeader>
        <ModalCloseButton />
        <ModalBody w={"fit-content"} minW={"40vw"}>
          <EditMenuForm onClose={onClose} initialValues={menu} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditMenuModal;