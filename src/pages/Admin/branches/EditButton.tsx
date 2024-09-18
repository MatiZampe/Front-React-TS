import { Image, useDisclosure } from "@chakra-ui/react";
import EditIcon from "../../../assets/images/edit.png";
import EditBranchModal from "./EditBranchModal";
import { Branch } from "../../../api/types";

export interface Props {
  branch: Branch;
}

const EditButton = ({ branch }: Props) => {
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
      <EditBranchModal isOpen={isOpen} onClose={onClose} branch={branch} />
    </>
  );
};

export default EditButton;