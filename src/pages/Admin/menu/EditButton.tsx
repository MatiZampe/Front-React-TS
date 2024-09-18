import { Image, useDisclosure } from "@chakra-ui/react";
import EditIcon from "../../../assets/images/edit.png";
import EditMenuModal from "./EditMenuModal";
import { Menu } from "../../../api/types";

export interface Props {
  menu: Menu;
}

const EditButton = ({ menu }: Props) => {
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
      <EditMenuModal isOpen={isOpen} onClose={onClose} menu={menu} />
    </>
  );
};

export default EditButton;