import { Image, useDisclosure } from "@chakra-ui/react";
import EditIcon from "../../../assets/images/edit.png";
import EditProductModal from "./EditProductModal";
import { Product } from "../../../api/types";

export interface Props {
  product: Product;
}

const EditButton = ({ product }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image
        width={"2rem"}
        src={EditIcon}
        cursor={"pointer"}
        onClick={onOpen}
        _hover={{ transform: "scale(1.1)" }}
      />
      <EditProductModal isOpen={isOpen} onClose={onClose} product={product} />
    </>
  );
};

export default EditButton;