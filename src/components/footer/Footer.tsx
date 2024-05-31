import { HStack, Box, Divider, Text, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box w={"full"} h={"15vh"} bg={"#a2a1a5"}>
      <VStack
        w={"full"}
        h={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Divider
          orientation="horizontal"
          variant={"solid"}
          borderColor={"whitesmoke"}
        />
        <HStack>
          <Text
            fontSize={{ base: "0.5rem", md: "1rem", lg: "1rem" }}
            color={"whitesmoke"}
          >
            Test 1234 probando bla bla.  | La plata bs as
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Footer;