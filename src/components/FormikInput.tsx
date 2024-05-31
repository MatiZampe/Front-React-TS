import {
    InputProps,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from "@chakra-ui/react";

interface Props extends InputProps {
    label: string;
    error?: string;
    touched?: boolean;
    isRequired?: boolean;
    readonly?: boolean;
}

const FormikInput = (props: Props) => {
    const { label, error, touched, readonly, isRequired, ...rest } = props;
    return (
        <FormControl
            isRequired={isRequired}
            isInvalid={Boolean(error) && touched}
        >
            <FormLabel htmlFor={props.name}>{label}</FormLabel>
            <Input
                {...rest}
                id={props.id ? props.id : props.name}
                readOnly={readonly}
                cursor={readonly ? "not-allowed" : "auto"}
                bgColor={readonly ? "gray.100" : "white"}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default FormikInput;