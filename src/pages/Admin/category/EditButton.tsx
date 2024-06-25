import { Image, useDisclosure } from "@chakra-ui/react";
import { Category } from "../../../api/types";
import EditIcon from "../../../assets/images/edit.png";
import EditCategoryModal from "./EditCategoryModal";

export interface Props {
  category: Category;
}

const EditButton = ({ category }: Props) => {
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
      <EditCategoryModal isOpen={isOpen} onClose={onClose} category={category} />
    </>
  );
};

export default EditButton;