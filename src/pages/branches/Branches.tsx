import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getResourceList } from "../../api/api";
import { Branch } from '../../api/types';
import { SimpleGrid } from "@chakra-ui/react";
import BranchItem from "./BranchItem";


const Branches = () => {

    const getAuthHeader = useAuthHeader();

  const {
    data: response,
    isSuccess
  } = useQuery({
    queryKey: ["Branches"],
    queryFn: () => getResourceList<Branch>("branch", getAuthHeader),
    select: (r) => r.data
  });
  
  const branches = response?.items;

  return (
    <SimpleGrid
      columns={1}
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      m={2}
    >
      {isSuccess &&
        branches?.map((branch) => (
          <BranchItem key={branch.id} branch={branch} />
        ))}
    </SimpleGrid>
  );
}

export default Branches;