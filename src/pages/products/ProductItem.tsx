import { HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";
import { Product } from '../../api/types';
import SearchIcon from "../../assets/images/search.png";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {

  return (
    <HStack
      key={product.id}
      width="95%"
      borderRadius={"2rem"}
      bg={"white"}
      justifySelf={"center"}
    >
      <VStack width="40%" h="100%" justifyContent={"flex-start"} p={2}>
        <Text
          textAlign={"center"}
          fontSize={{
            base: "0.5rem",
            sm: "0.7rem",
            md: "1rem",
            lg: "1rem",
            xl: "1.5rem",
          }}
        >
          Name: {product.name}
        </Text>
        <Text
          textAlign={"center"}
          fontSize={{
            base: "0.5rem",
            sm: "0.7rem",
            md: "1rem",
            lg: "1rem",
            xl: "1.5rem",
          }}
        >
          Card Price: {product.cardPrice}
        </Text>
        <Text
          textAlign={"center"}
          fontSize={{
            base: "0.5rem",
            sm: "0.7rem",
            md: "1rem",
            lg: "1rem",
            xl: "1.5rem",
          }}
        >
          Cahs Price: {product.cashPrice}
        </Text>
        <HStack width={"30%"} justifyContent={"center"} spacing={8}>
              {/* <Hide below="md"> */}
              <Tooltip
                hasArrow
                label={"Ver Ficha"}
                bg={"primary"}
                color={"secondary"}
              >
                <Link to={`/product/${product.id}`}>
                  <Image
                    width={{
                      base: "0.8rem",
                      sm: "0.7rem",
                      md: "2rem",
                      lg: "2rem",
                      xl: "2.5rem",
                    }}
                    src={SearchIcon}
                    cursor={"pointer"}
                    _hover={{ transform: "scale(1.1)" }}
                  ></Image>
                </Link>
              </Tooltip>
              {/* </Hide> */}
            </HStack>


      </VStack>
    </HStack>
  )
}

export default ProductItem
