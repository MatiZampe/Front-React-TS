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

const DeleteMenuModal = ({ isOpen, onClose, id }: Props) => {
  const cancelRef = useRef<any>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const getAuthHeader = useAuthHeader();

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["menu"] });
    toast({
      title: "Menu deleted",
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

  const { mutateAsync: deleteMenu, isPending } = useMutation({
    mutationKey: ["menuDeletion"],
    mutationFn: () => deleteResource("menu", id, getAuthHeader),
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
            Delete Menu
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You will not be able to undo this action.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => deleteMenu()}
              ml={3}
              isLoading={isPending}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteMenuModal;