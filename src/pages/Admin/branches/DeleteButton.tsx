import { Image, useDisclosure } from "@chakra-ui/react";
import DeleteIcon from "../../../assets/images/bin.png";
import DeleteProductModal from "./DeleteBranchModal";

export interface Props {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Image
        width={"2rem"}
        src={DeleteIcon}
        cursor={"pointer"}
        onClick={onOpen}
        _hover={{ transform: "scale(1.1)" }}
      />
      <DeleteProductModal id={id} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default DeleteButton;