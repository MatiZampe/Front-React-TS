import { Text, Button, Heading, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Background from "../../assets/images/background.svg";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Branch } from "../../api/types";
import { getResourceList } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/isLoading";

const MotionVStack = motion(VStack);

const Home = () => {
    const getAuthHeader = useAuthHeader();

    const { data: response, isSuccess, isPending } = useQuery({
        queryKey: ["Branches"],
        queryFn: () => getResourceList<Branch>("branch", getAuthHeader),
        select: (r) => r.data,
    });

    const branches = response?.items;

    return (
        <MotionVStack
            pt={55}
            spacing={{ base: 0, md: 5 }}
            w={"full"}
            h={"full"}
            backgroundImage={`url(${Background})`}
            backgroundSize="100% auto"
            backgroundPosition="bottom"
            backgroundRepeat="no-repeat"
            textAlign="center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Heading fontSize={"2xl"} variant={"subheading"}>
                Welcome to
            </Heading>
            <Heading fontSize={"5xl"} variant={"heading"}>
                E-commerce
            </Heading>
            <Text
                fontSize={"lg"}
                fontWeight={"light"}
                pt={{
                    base: 4,
                    md: 10,
                }}
                pb={{
                    base: 5,
                    md: 0,
                }}
            >
                Please select the branch where <br />
                you want to place your order:
            </Text>
            <VStack>
                {isPending && <Loading/>}
                {isSuccess && branches ?
                    branches.map((branch) => (
                        <Button
                            key={branch.id}
                            as={RouterLink}
                            to={`/branch/menu/${branch.menu.id}`}
                            variant="primary"
                            mb={2}
                            bg="blue.500"         
                            color="white"         
                            _hover={{ bg: "blue.600" }}
                        >
                            {branch.name}
                        </Button>
                    )): <Text>Error, try again later</Text> } 
            </VStack>
        </MotionVStack>
    );
};

export default Home;
