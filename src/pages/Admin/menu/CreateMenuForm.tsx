import {
  chakra,
  SimpleGrid,
  useToast,
  GridItem,
  HStack,
  Button,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormikInput from "../../../components/FormikInput";
import { postResource } from "../../../api/api";

interface Props {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const initialValues = {
  name: "",
};

const CreateMenuForm = ({ onClose }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await createMenu();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["menu"] });
    toast({
      title: "Menu created",
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

  const { mutateAsync: createMenu, isPending: creationLoading } = useMutation(
    {
      mutationKey: ["menuCreation"],
      mutationFn: () => postResource("menu", getAuthHeader, formik.values),
      onSuccess: onSuccess,
      onError: onError,
    }
  );



  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <FormikInput
            label="Name"
            placeholder="Enter a menu name..."
            isRequired={true}
            name={"name"}
            id={"name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            touched={formik.touched.name}
            error={formik.errors.name}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <HStack w="full" justifyContent={"flex-end"} spacing={5} p={5}>
            <Button type="button" onClick={onClose} variant="ghost">
              Cancel
            </Button>

            <Button
              type="submit"
              colorScheme={"orange"}
              isLoading={creationLoading}
              isDisabled={creationLoading}
            >
              Submit
            </Button>
            
          </HStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default CreateMenuForm;