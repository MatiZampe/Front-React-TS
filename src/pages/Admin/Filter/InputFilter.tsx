import { VStack, Text, Input } from "@chakra-ui/react";

interface InputFilterProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const InputFilter = ({ label, value, onChange }: InputFilterProps) => {
    return (
        <VStack alignItems={"flex-start"}>
            <Text fontSize={"sm"}>{label}</Text>
            <Input
                type={"text"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                bgColor="white"
            />
        </VStack>
    );
};

export default InputFilter;