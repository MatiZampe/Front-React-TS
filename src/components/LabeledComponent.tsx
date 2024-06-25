import {
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
} from "@chakra-ui/react";

interface Props {
    error?: string;
    touched?: boolean;
    label: string;
    helperText?: string;
    component: React.ReactNode;
    name: string;
}

const LabeledComponent = ({
    error,
    touched,
    label,
    helperText,
    component,
    name,
}: Props) => {
    return (
        <FormControl isInvalid={touched && Boolean(error)}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            {component}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default LabeledComponent;