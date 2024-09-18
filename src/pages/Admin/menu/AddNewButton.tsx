import { Button, useDisclosure } from "@chakra-ui/react";
import CreateMenuModal from "./CreateMenuModal";

const AddNewButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme={"orange"}
        top={5}
        px={10}
        w={{ base: "full", md: "fit-content" }}
        onClick={onOpen}
      >
        ADD NEW
      </Button>
    
      <CreateMenuModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};
export default AddNewButton;