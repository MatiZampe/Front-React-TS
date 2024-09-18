import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    useToast,
  } from "@chakra-ui/react";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { AxiosError } from "axios";
  import { useRef } from "react";
  import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
  import { deleteResource } from "../../../api/api";
  
  export interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: string;
  }
  
  const DeleteBranchModal = ({ isOpen, onClose, id }: Props) => {
    const cancelRef = useRef<any>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const getAuthHeader = useAuthHeader();
  
    const onSuccess = () => {
      queryClient.resetQueries({ queryKey: ["branch"] });
      toast({
        title: "Branch deleted",
        status: "success",
        isClosable: true,
      });
      onClose();
    };
  
    const onError = (err: AxiosError) => {
      console.log(err);
      toast({
        title: "Error",
        description: <>{err?.response?.data || "Try again later"}</>,
        status: "error",
      });
    };
  
    const { mutateAsync: deleteBranch, isPending } = useMutation({
      mutationKey: ["branchDeletion"],
      mutationFn: () => deleteResource("branch", id, getAuthHeader),
      onSuccess: onSuccess,
      onError: onError,
    });
  
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Branch
            </AlertDialogHeader>
  
            <AlertDialogBody>
              Estás seguro? No podrás deshacer esta acción.
            </AlertDialogBody>
  
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => deleteBranch()}
                ml={3}
                isLoading={isPending}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };
  
  export default DeleteBranchModal;