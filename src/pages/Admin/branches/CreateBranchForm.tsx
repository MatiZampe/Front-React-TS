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
import { postResource } from "../../../api/api";
import FormikInput from "../../../components/FormikInput";
import SyncField from "../../../components/dropdowns/SyncField";

interface Props {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  street: Yup.string().required("Street is required"),
  menuId: Yup.string().required("Menu is required"),
  cityId: Yup.string().required("City is required")

});

const initialValues = {
  name: "",
  description: "",
  street: "",
  menuId: "",
  cityId: ""
};

const CreateBranchForm = ({ onClose }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await createBranch();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["branch"] });
    toast({
      title: "Branch created",
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

  const { mutateAsync: createBranch, isPending: creationLoading } =
    useMutation({
      mutationKey: ["branchCreation"],
      mutationFn: () => postResource("branch", getAuthHeader, formik.values),
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
            placeholder="Enter a branch description..."
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
            isRequired={true}
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
            error={formik.errors.menuId}
            touched={formik.touched.menuId}
            setter={(value: string | null) =>
              formik.setFieldValue("menuId", value)
            }
            label="menu"
            resource="menu"
            name="menuId"
            placeholder="Choose a menu"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="CityId"
            placeholder="Enter a Menu Id..."
            name={"cityId"}
            id={"cityId"}
            value={formik.values.cityId}
            onChange={formik.handleChange}
            touched={formik.touched.cityId}
            error={formik.errors.cityId}
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

export default CreateBranchForm;