import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import CreateBranchForm from "./CreateBranchForm";

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const CreateBranchModal = ({ isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"fit-content"}>
                <ModalHeader color={"#448F85"}>Create Branch</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"fit-content"} minW={"40vw"}>
                    <CreateBranchForm onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateBranchModal;