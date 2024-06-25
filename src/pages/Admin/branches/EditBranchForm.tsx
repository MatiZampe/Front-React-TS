import { Branch } from "../../../api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  GridItem,
  HStack,
  SimpleGrid,
  chakra,
  useToast,
} from "@chakra-ui/react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { patchResource } from "../../../api/api";
import FormikInput from "../../../components/FormikInput";
import SyncField from "../../../components/dropdowns/SyncField";

export interface Props {
  onClose: () => void;
  initialValues: Branch;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  street: Yup.string().required("Street is required"),
  menuId: Yup.string().required("Insert Menu"),
  cityId: Yup.string().required("Insert City")
});

const EditBranchForm = ({ onClose, initialValues }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await editBranch();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["branch"] });
    toast({
      title: "Branch edited",
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

  const { mutateAsync: editBranch, isPending } = useMutation({
    mutationKey: ["branchEdition"],
    mutationFn: () =>
      patchResource(
        "branch",
        initialValues.id,
        getAuthHeader,
        initialValues,
        formik.values
      ),
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <FormikInput
            label="Name"
            isRequired={true}
            name={"name"}
            id={"name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            touched={formik.touched.name}
            error={formik.errors.name}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Description"
            placeholder="Enter a product description..."
            name={"description"}
            id={"description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            touched={formik.touched.description}
            error={formik.errors.description}
          />
        </GridItem>
        <GridItem colSpan={1}>
        <FormikInput
            label="Street"
            placeholder="Enter a street"
            name={"street"}
            id={"street"}
            value={formik.values.street}
            onChange={formik.handleChange}
            touched={formik.touched.street}
            error={formik.errors.street}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SyncField
            error={formik.errors.cityId}
            touched={formik.touched.cityId}
            setter={(value: string | null) =>
              formik.setFieldValue("cityId", value)
            }
            label="city"
            resource="branch/cities"
            name="cityId"
            placeholder="Choose a city"
            defaultValue={initialValues.cityId}
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
              isLoading={isPending}
              isDisabled={isPending}
            >
              Edit
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default EditBranchForm;