import { HStack, Input, VStack, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  setName: (name: string) => void;
}

const MenuFilters = ({ name, setName }: Props) => {
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
    </HStack>
  );
};

export default MenuFilters;