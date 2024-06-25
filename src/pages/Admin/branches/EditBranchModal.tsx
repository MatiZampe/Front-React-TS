import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
  import { Branch } from "../../../api/types";
  import EditBranchForm from "./EditBranchForm";
  
  export interface Props {
    isOpen: boolean;
    onClose: () => void;
    branch: Branch;
  }
  
  const EditBranchModal = ({ isOpen, onClose, branch }: Props) => {
    return (
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent
          minW={{ md: "fit-content", lg: "65rem", xl: "80rem" }}
          bgColor={"white"}
        >
          <ModalHeader>Editar branch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditBranchForm onClose={onClose} initialValues={branch} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditBranchModal;