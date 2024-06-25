import { Avatar, HStack, IconButton, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { IoMdTrash } from "react-icons/io";
import LabeledComponent from "./LabeledComponent";
interface Props {
    value: string | null;
    setter: (value: string) => void;
    label: string;
}

const FileInput = ({ value, setter, label }: Props) => {
    const ref = useRef<HTMLInputElement>(null);
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setter(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <LabeledComponent
            label={label}
            name="picture"
            component={
                <HStack w="full">
                    {value && (
                        <>
                            <IconButton
                                icon={<IoMdTrash size={20} />}
                                aria-label="Delete Image"
                                colorScheme={"red"}
                                variant="ghost"
                                size={"xs"}
                                onClick={() => {
                                    setter("");
                                    ref.current?.value &&
                                        (ref.current.value = "");
                                }}
                            />
                            <Avatar src={value} />
                        </>
                    )}
                    <Input
                        type={"file"}
                        variant="unstyled"
                        onChange={onChange}
                        accept="image/*"
                        ref={ref}
                    />
                </HStack>
            }
        />
    );
};

export default FileInput;