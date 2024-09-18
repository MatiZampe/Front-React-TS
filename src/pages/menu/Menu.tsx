
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { Category, Menu as MenuInterface, Product } from '../../api/types';
import { getResource } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";


const MotionTabs = motion(Tabs);

const Menu = () => {

  const { id } = useParams();
  const getAuthHeader = useAuthHeader();

  const {
    data: menu,
  } = useQuery({
    queryKey: [`menu/${id}`],
    queryFn: () => getResource<MenuInterface>(`menu/${id}`, getAuthHeader),
    select: (r) => r.data,
  });

  const filteredCategories = menu?.categories.filter(
    (category: Category) => category.parentCategory === null
  );

  return (
    <MotionTabs
      w="full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <TabList
        p={{ base: 0, md: 8 }}
        position="sticky"
        top={0}
        bg="white"
        zIndex={1}
        boxShadow="0 8px 6px 0 hsla(0, 0%, 0%, 0.2)"
        overflowX="auto"
      >
        {filteredCategories?.map((category: Category) => (
          <Tab
            key={category.id}
            color="gray.400"
            fontWeight="semibold"
            _selected={{
              color: "black",
            }}
            _hover={{
              bg: "gray.50",
              borderRadius: "md",
              color: "black",
            }}
          >
            {category.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels bg="white">
        {filteredCategories?.map((category: Category) => (
          <TabPanel key={category.id} p={0}>
            <VStack spacing={0} w="full">
              {category.subCategories.map((subcategory: Category) => (
                <VStack key={subcategory.id} spacing={0} w="full">
                  <Box
                    w={"full"}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    p={5}
                    backgroundColor="gray.400"
                  >
                    <Heading
                      fontSize={"xl"}
                      color="#008102"
                      fontFamily="body"
                      fontWeight="bold"
                      
                    >
                      {subcategory.name}
                    </Heading>
                  </Box>
                  {subcategory.products.map((product: Product) => (
                    <MenuItem key={product.id} product={product} />
                  ))}
                </VStack>
              ))}
            </VStack>
          </TabPanel>
        ))}
      </TabPanels>
    </MotionTabs>
  );
};

export default Menu
