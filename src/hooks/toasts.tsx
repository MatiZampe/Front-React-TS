import { useToast } from "@chakra-ui/react";

export const useSuccessToast = () => {
    const toast = useToast();
    const showSuccessToast = (
        title: string,
        message?: string,
        autoClose = true
    ) => {
        toast({
            title: title,
            description: <>{message}</>,
            status: "success",
            duration: autoClose ? 5000 : null,
            isClosable: true,
            position: "top",
        });
    };
    return showSuccessToast;
};

export const useErrorToast = () => {
    const toast = useToast();
    const showErrorToast = (
        title: string,
        message?: string,
        autoClose = true
    ) => {
        toast({
            title: title,
            description: <>{message}</>,
            status: "error",
            duration: autoClose ? 5000 : null,
            isClosable: true,
            position: "top",
        });
    };
    return showErrorToast;
};