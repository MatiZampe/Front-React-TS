import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getResourceList } from "../../api/api";
import { Product } from '../../api/types';
import { Box, Center, Text, VStack } from "@chakra-ui/react";


const Products = () => {

    const getAuthHeader = useAuthHeader();

  const {
    data: response,
    isSuccess
  } = useQuery({
    queryKey: ["Products"],
    queryFn: () => getResourceList<Product>("product", getAuthHeader),
    select: (r) => r.data
  });

  return (
   < Box width={"100%"} alignItems={"center"} justifyContent={"center"} height={"100%"}>
        {isSuccess && response.items.map((product) => (
            <VStack key={product.id} width={"90%"} backgroundColor={"white"} justifySelf={"center"} height={"90%"}>
            <Text fontSize={"5rem"} color={"red"}>
                {product.Name}
            </Text>
            <Text fontSize={"5rem"}>
                {product.Description}
            </Text>
            </VStack>
        ) )}
   </Box>
  )
}

export default Products
