import { VStack, HStack, Text, Flex, Img, Tooltip, Image, Button } from "@chakra-ui/react";
import { Product } from "../../api/types";
import { Link } from "react-router-dom";

interface MenuItemProps {
  product: Product;
}

const MenuItem = ({ product }: MenuItemProps) => {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      minH={150}
      justifyContent={"space-between"}
      alignItems={{ base: "left", md: "center" }}
      w={"full"}
      p={5}
      borderBottom={"1px solid #E2E8F0"}
      gap={5}
    >
      <VStack alignItems={"left"}>
        <Text fontSize={"xl"} fontWeight={"bold"} color={"#008102"}>
          {product.name}
        </Text>
        <Text fontSize={"sm"}>{product.description}</Text>
      </VStack>
      
      <HStack
        spacing={{
          base: 16,
          md: 32,
        }}
      >

<Tooltip
          hasArrow={true}
          label="Details"
          bg="primary"
          color="secondary"
        >
          <Link
            key={product.id}
            to={`/branch/menu/product/${product.id}`}
            state={{ categoryId: product.categoryId }}
          >
            <Button
              right={"36rem"}
              top={"4rem"}
              size="lg"
              aria-label='View Details'
              bg="#008102"
              color="white"
              _hover={{ bg: "#00b300" }}
            >
              Details
            </Button>
          </Link>
        </Tooltip>

        <Img 
          src={product.productImage} 
          alt={product.name} 
          w="16rem" 
          h="10rem"
          borderRadius="15px"
        />
        <VStack
          spacing={0}
          alignItems={{
            base: "left",
            md: "flex-end",
          }}
        >
          <Text fontSize={"1rem"} fontWeight="bold">
            ${product.cashPrice}
          </Text>
          <Text
            fontSize={"0.9rem"}
            fontWeight={"bold"}
            color={"#008102"}
          >
            Cash
          </Text>
          <Text fontSize={"1rem"} fontWeight="bold">
            ${product.cardPrice}
          </Text>
          <Text
            fontSize={"0.9rem"}
            fontWeight={"bold"}
            color={"#008102"}
          >
            Card
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default MenuItem;