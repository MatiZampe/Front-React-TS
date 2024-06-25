import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { client, getResource } from "../../api/api";
import {ApiListResponse, Product} from "../../api/types"
import {
  HStack,
  VStack,
  Text,
  Center,
  Divider,
  Img,
} from "@chakra-ui/react";
import { filtersToAPIFormat } from "../../api/utils";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";

const ProductDetailedView = () => {
  const { id } = useParams();
  const getAuthHeader = useAuthHeader();

  const {
    data: product,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [`products/${id}`],
    queryFn: () => getResource<Product>(`product/${id}`, getAuthHeader),
    select: (r) => r.data,
  });


  const queryFilters = product ? [
    {
      field: "categoryId",
      value: product.category.id,
    },
  ] : [];
  
  
  const {
    data: similarProducts,
  } = useQuery({
    queryKey: ["Products", queryFilters],
    queryFn: () => client.get<ApiListResponse<Product>>("Product", {
      headers: {
          Authorization: getAuthHeader,
      },
      params: {
          filters: filtersToAPIFormat(queryFilters),
      },
  }),
    select: (resp) => resp.data,
    enabled: !!product?.category.id
  });


  return (
    <>
      {isSuccess && similarProducts && (
        <Center>
          <VStack width="80%" borderRadius={"0.5rem"} bg={"white"} p={1} m={5}>
            <HStack justifyContent={"flex-start"} width={"90%"} mt={4}>
              <Text
                fontSize={{
                  base: "1rem",
                  sm: "1rem",
                  md: "1.2rem",
                  lg: "1.5rem",
                  xl: "2rem",
                }}
              >
               Name:  {product.name}
              </Text>
            </HStack>
            <HStack width={"90%"} justifyContent={"flex-start"} mt={2}>
              <Text
                fontSize={{
                  base: "0.8rem",
                  sm: "0.8rem",
                  md: "1rem",
                  lg: "1rem",
                  xl: "1.2rem",
                }}
              >
                Description: {product.description}
              </Text>
            </HStack>
            <HStack width={"90%"} justifyContent={"flex-start"} mt={2}>
              <Text
                fontSize={{
                  base: "0.8rem",
                  sm: "0.8rem",
                  md: "1rem",
                  lg: "1rem",
                  xl: "1.1rem",
                }}
                fontStyle={"italic"}
              >
                Card Price: ${product.cardPrice}
              </Text>
            </HStack>
            <HStack width={"90%"} justifyContent={"flex-start"} mt={2}>
              <Text
                fontSize={{
                  base: "0.8rem",
                  sm: "0.8rem",
                  md: "1rem",
                  lg: "1rem",
                  xl: "1.1rem",
                }}
                fontStyle={"italic"}
              >
                Cash Price: ${product.cashPrice}
              </Text>
            </HStack>
            <Divider
              orientation={"horizontal"}
              variant={"solid"}
              borderColor={"primary"}
              borderWidth={"0.1rem"}
              width={"90%"}
            />
            <HStack width={"90%"} justifyContent={"flex-start"} mt={1} mb={1}>
            <Img
                  justifyContent={"center"}
                  src={product.productImage}
                  alt={product.name}
                  w="16rem"
                  h="10rem"
                  borderRadius="15px"
                  style={{ display: 'block', margin: 'auto' }}
                />
            </HStack>
            <ProductCarousel
              title="Similar products"
              products={similarProducts.items} 
            />
          </VStack>
        </Center>
      )}
      {isLoading}
    </>
  );
};

export default ProductDetailedView;