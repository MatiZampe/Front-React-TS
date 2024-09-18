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
import SyncField from "../../../components/dropdowns/SyncField";
import SwitchField from "../../../components/SwitchField/SwitchField";

interface Props {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  parentCategoryId: Yup.string().nullable(),
  menuId: Yup.string().required("Menu is required"),
});

const initialValues = {
  name: "",
  description: "",
  showCategory: true,
  menuId: "",
  parentCategoryId: "",
};

const CreateCategoryForm = ({ onClose }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await createCategory();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["category"] });
    toast({
      title: "Category created",
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

  const { mutateAsync: createCategory, isPending: creationLoading } = useMutation(
    {
      mutationKey: ["categoryCreation"],
      mutationFn: () => postResource("category", getAuthHeader, formik.values),
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
            placeholder="Enter a category name..."
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
            placeholder="Enter a category description..."
            isRequired={true}
            name={"description"}
            id={"description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            touched={formik.touched.description}
            error={formik.errors.description}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SyncField
            error={formik.errors.parentCategoryId}
            touched={formik.touched.parentCategoryId}
            setter={(value: string | null) =>
              formik.setFieldValue("parentCategoryId", value)
            }
            label="Parent Category"
            resource="category/parentCategories"
            name="parentCategoryId"
            placeholder="Choose a Category"
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
          <SwitchField
            label="Show Category"
            name="showCategory"
            id="showCategory"
            isChecked={formik.values.showCategory}
            touched={formik.touched.showCategory}
            error={formik.errors.showCategory}
            onChange={formik.handleChange}
            size="lg"
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

export default CreateCategoryForm;