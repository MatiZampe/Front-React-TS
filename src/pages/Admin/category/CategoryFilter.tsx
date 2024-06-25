import { HStack, Input, VStack, Text } from "@chakra-ui/react";
import SyncField from "../../../components/dropdowns/SyncField";

interface Props {
  name: string;
  setName: (name: string) => void;
  setMenuId: (id: string | null) => void;
}

const CategoryFilters = ({ name, setName, setMenuId }: Props) => {
  return (
    <HStack spacing={5} mt={3} mr={3}>
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"sm"}>Name</Text>
        <Input
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          bgColor="white"
        />
      </VStack>
      <VStack width={"15rem"}>
        <SyncField
          name="menuId"
          label="Menu"
          setter={setMenuId}
          resource={"menu"}
          placeholder="Filter by menu"
        />
      </VStack>
    </HStack>
  );
};

export default CategoryFilters;