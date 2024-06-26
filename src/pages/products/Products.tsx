import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getResourceList } from "../../api/api";
import { Product } from '../../api/types';
import { SimpleGrid } from "@chakra-ui/react";
import ProductItem from './ProductItem';


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
  
  const products = response?.items;

  return (
    <SimpleGrid
      columns={1}
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      m={2}
    >
      {isSuccess &&
        products?.map((product) => (
          <ProductItem key={product.id} product={product}  />
          
        ))}
    </SimpleGrid>
  );
}

export default Products