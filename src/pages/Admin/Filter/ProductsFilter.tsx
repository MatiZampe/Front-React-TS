import { HStack, VStack } from "@chakra-ui/react";
import ActiveFilter from "./ActiveFilter";
import InputFilter from "./InputFilter";

interface Props {
    name: string;
    setName: (name: string) => void;
    active: boolean | null;
    setActive: (active: boolean | null) => void;
}

const ProductFilters = ({ name, setName, active, setActive }: Props) => {
    return (
        <HStack spacing={5}>
            <VStack alignItems={"flex-start"}>
                <InputFilter
                    label="Name"
                    value={name}
                    onChange={setName}
                />
            </VStack>
            <ActiveFilter active={active} setActive={setActive} />
        </HStack>
    );
};

export default ProductFilters;