import ReactSelect from "react-select";
import { VStack, Text } from '@chakra-ui/react';

interface Props {
    setActive: (active: boolean | null) => void;
    active: boolean | null;
}

const options = [
    {
        value: true,
        label: "Activo",
    },
    {
        value: false,
        label: "Inactivo",
    },
];

const ActiveFilter = ({ active, setActive }: Props) => {
    
    return (
        <VStack alignItems={"flex-start"}>
            <Text fontSize={"sm"}> Activo </Text>
            <ReactSelect
                options={options}
                value={options.find((o) => o.value === active) || null}
                onChange={(option) => setActive(option?.value ?? null)}
                placeholder=""
                isClearable
                styles={{
                    control: (provided) => ({
                        ...provided,
                        width: "15rem",
                    }),
                }}
            />
        </VStack>
    );
};

export default ActiveFilter;