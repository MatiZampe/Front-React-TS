import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";
import { getResource } from "../../api/api";
import {Branch} from "../../api/types"
import {
  HStack,
  VStack,
  Text,
  Center,
  Divider,
  Heading,
} from "@chakra-ui/react";

const BranchDetailedView = () => {
  const { branchName } = useParams();
  const getAuthHeader = useAuthHeader();

  const {
    data: branch,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [`menu/${branchName}`],
    queryFn: () => getResource<Branch>(`menu/${branchName}`, getAuthHeader),
    select: (r) => r.data,
  });

  return (
    <>
      {isSuccess && (
        <Center>
          <VStack width="80%" borderRadius={"0.5rem"} bg={"white"} p={1} m={5}>
            <HStack justifyContent={"flex-start"} width={"90%"} mt={4}>
              <Heading>{branchName}</Heading>
              <Text
                fontSize={{
                  base: "1rem",
                  sm: "1rem",
                  md: "1.2rem",
                  lg: "1.5rem",
                  xl: "2rem",
                }}
              >
               Name:  {branch.name}
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
                Description: {branch.description}
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
                Branch Street: {branch.street}
              </Text>
            </HStack>
            <HStack justifyContent={"flex-start"} width={"90%"}>
              <Text
                fontSize={{
                  base: "1rem",
                  sm: "1rem",
                  md: "1.2rem",
                  lg: "1.5rem",
                  xl: "2rem",
                }}
                fontWeight={"bold"}
              >
                CODE
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
              <Text
                fontSize={{
                  base: "0.8rem",
                  sm: "0.8rem",
                  md: "1rem",
                  lg: "1rem",
                  xl: "1.2rem",
                }}
              >
               Branch Street Number: {branch.streetNumber}
              </Text>
            </HStack>
          </VStack>
        </Center>
      )}
      {isLoading}
    </>
  );
};

export default BranchDetailedView;