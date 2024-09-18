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
  import FileInput from "../../../components/FileInput";
import SyncField from "../../../components/dropdowns/SyncField";
  
  interface Props {
    onClose: () => void;
  }
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    cashPrice:Yup.number().required("Cash price is required"),
    cardPrice:Yup.number().required("Card price is required"),
    subtitle: Yup.string().required("Subtitle is required"),
    code: Yup.string().required("Code is required"),
    categoryId: Yup.string().required("Category Id is required"),
    productImage: Yup.string().required("Imágen de producto requerida"),
  });
  
  const initialValues = {
    name: "",
    description: "",
    cashPrice: 0,
    cardPrice: 0,
    subtitle: "",
    code: "",
    categoryId: "",
    productImage: null,
  };
  
  const CreateProductForm = ({ onClose }: Props) => {
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const toast = useToast();
  
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: async () => {
        await createProduct();
      },
    });
  
    const onSuccess = () => {
      queryClient.resetQueries({ queryKey: ["product"] });
      toast({
        title: "Product created",
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
  
    const { mutateAsync: createProduct, isPending: creationLoading } =
      useMutation({
        mutationKey: ["productCreation"],
        mutationFn: () => postResource("product", getAuthHeader, formik.values),
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
              label="CashPrice"
              isRequired={true}
              name={"cashPrice"}
              id={"cashPrice"}
              value={formik.values.cashPrice}
              onChange={formik.handleChange}
              touched={formik.touched.cashPrice}
              error={formik.errors.cashPrice}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormikInput
              label="CardPrice"
              isRequired={true}
              name={"cardPrice"}
              id={"cardPrice"}
              value={formik.values.cardPrice}
              onChange={formik.handleChange}
              touched={formik.touched.cardPrice}
              error={formik.errors.cardPrice}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormikInput
              label="Subtitle"
              isRequired={true}
              name={"subtitle"}
              id={"subtitle"}
              value={formik.values.subtitle}
              onChange={formik.handleChange}
              touched={formik.touched.subtitle}
              error={formik.errors.subtitle}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormikInput
              label="Code"
              isRequired={true}
              name={"code"}
              id={"code"}
              value={formik.values.code}
              onChange={formik.handleChange}
              touched={formik.touched.code}
              error={formik.errors.code}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FileInput
              value={formik.values.productImage}
              setter={(productImage: string) =>
                formik.setFieldValue("productImage", productImage, true)
              }
              label="Product Image"
            />
          </GridItem>
          <GridItem colSpan={1}>
          <SyncField
            error={formik.errors.categoryId}
            touched={formik.touched.categoryId}
            setter={(value: string | null) =>
              formik.setFieldValue("categoryId", value)
            }
            label="category"
            resource="category/subcategories"
            name="categoryId"
            placeholder="Choose a category"
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
  
  export default CreateProductForm;