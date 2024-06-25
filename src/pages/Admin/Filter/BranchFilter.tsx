import { Box, HStack, VStack } from "@chakra-ui/react";
import InputFilter from "./InputFilter";
import SyncField from "../../../components/dropdowns/SyncField";

interface Props {
    name: string;
    setName: (name: string) => void;
    setCityId: (cityId: string | null) => void;
}

const BranchFilter = ({ name, setName, setCityId }: Props) => {
    return (
        <HStack spacing={5}>
            <VStack alignItems={"flex-start"}>
                <InputFilter
                    label="Name"
                    value={name}
                    onChange={setName}
                />
            </VStack>
            <Box width={"15rem"}>
                <SyncField
                    name="cityId"
                    label="city"
                    setter={setCityId}
                    resource={"branch/cities"}
                    placeholder="Filter by city"
                />
            </Box>
        </HStack>
    );
};

export default BranchFilter;